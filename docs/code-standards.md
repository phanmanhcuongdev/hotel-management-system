# Codebase structure & coding conventions

`docs/` là cơ chế chính để ghi nhận quy ước và lệch (gaps). Khi sửa code, hãy cập nhật phần tương ứng trước khi commit.

## 1. Backend design & standards
- **Kiến trúc**: hexagonal/ports-and-adapters (`application/port/in`, `application/port/out`, `application/domain/service`, `adapter/out/persistence`, `adapter/in/web`). `BeanConfig` tiêm adapter/service tương ứng.
- **Domain/Port naming**: mọi interface kết thúc bằng vai trò (`CreateBookingUseCase`, `LoadRoomsPort`, `SaveBookingPort`). Command/DTO bằng PascalCase (`CreateBookingCommand`, `RoomResponse`). Domain model dùng `record` để giữ `id`, `RoomStatus`, `RoomType`, `BookingStatus`.
- **Controllers**: `RoomController` chỉ `GET /api/rooms`; `BookingController` chỉ `POST /api/bookings`. Các controller vô cùng mỏng: map DTO ↔ domain (qua mapper), gọi use case, và trả `BookingResponse`/`RoomResponse`.
- **Business logic**: `CreateBookingService` kiểm tra ngày/thứ tự, load room, chỉ tạo `Booking` `PENDING` và lưu. Hiện chưa thay đổi trạng thái `Room` và các endpoint khác không tồn tại.
- **Persistence mapping**: adapter chuyển đổi giữa domain ↔ JPA entity (`RoomJpaEntity`, `RoomTypeJpaEntity`, `BookingJpaEntity`). JPA entity mặc định lookup table `rooms`, `room_types`, `bookings`.
- **Configuration**: `application.yaml` chứa datasource credential hiện `jdbc:mysql://192.168.20.40:3306/hotel_management`. Config cần chuyển sang biến môi trường trước khi deploy, đặc biệt để tránh secrets trong SCM.

## 2. Frontend conventions
- **Feature folder**: mỗi phần (`auth`, `dashboard`, `rooms`, `bookings`) có `pages`, `hooks`, `components`. Shared UI ở `frontend/src/components/ui`.
- **Routing/Auth**: `App.tsx` dùng `ProtectedRoute`/`PublicOnlyRoute` và `AuthProvider`. `useAuth` trả về `status`, `user`, `session`, `login`, `logout`. Guard kiểm tra `status === 'authenticated'` trước khi render layout.
- **Auth service**: `authService` mặc định bật mock trong DEV (`VITE_ENABLE_MOCK_AUTH`), chỉ gọi backend khi `VITE_ENABLE_REAL_AUTH=true`. Mock login cho phép `admin/admin123`. Session lưu trong local/session storage, `apiClient` intercept thêm Authorization header tự động.
- **API layer**: `apiClient` (axios) định nghĩa base `/api` và dispatch `auth:unauthorized`. Tuy nhiên, hiện tại hầu hết hooks vẫn dùng `fetch` thay vì `apiClient`, nên header Authorization từ axios không dễ tái sử dụng.
- **Data hooks**: `useRooms` và `useBookings` sử dụng React Query, key `['rooms', status]`/`['bookings']`; nếu backend trả lỗi, fallback sang `mockData` khi `USE_DEV_FALLBACK` (true trong DEV). Mutation còn gọi `/api/rooms` và `/api/bookings/:id` cho create/update/delete mặc dù backend chưa có các endpoint này.
- **UI/UX leak**: `RoomListPage` vẫn dùng `mockBookings`, `activeFilter` chưa được dùng, modal thêm phòng/status chỉ `console.log` thay vì gọi API. `BookingListPage` hiển thị dữ liệu nếu `useBookings` trả data, nhưng backend không hỗ trợ `GET /api/bookings` hiện.

## 3. Database conventions
- **Schema tên `tblXxx`**: `database/hotel-management.sql` tạo `tblHotel`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill`, `tblUser`, `tblClient`, `tblService`. PK `ID`, FK theo pattern `<entity>ID`.
- **Money type**: tất cả giá/discount/payment dùng `FLOAT`, không tương ứng với `BigDecimal` trong domain. Cần review/giao diện nếu xử lý invoice.
- **Contract mismatch**: JPA entity giả định bảng `rooms`, `room_types`, `bookings`, không có `tblRoom`, `tblBooking`. Dùng `ddl-auto: none` => Spring sẽ ném lỗi nếu không chỉnh tên bảng hoặc metadata.

## 4. Gaps & callouts
1. **API mismatch**: frontend gọi thêm `GET /api/bookings`, `PUT/DELETE /api/bookings/:id`, `POST/PUT/DELETE /api/rooms`, `POST /auth/login` nhưng backend chưa cung cấp.
2. **Auth chưa thực sự hoàn chỉnh**: backend không có controller login, token chưa xác thực; `ProtectedRoute` dựa vào session client, `apiClient` chỉ có interceptor 401 để logout.
3. **Logic phòng chưa cập nhật**: `CreateBookingService` không đổi `RoomStatus`, nên trạng thái phòng luôn giữ `AVAILABLE` dù đã book.
4. **Mock data tồn tại**: `mockRooms`, `mockBookings` vẫn được dùng trong code; `USE_MOCK` mặc định `false` nhưng fallback `USE_DEV_FALLBACK` có thể khiến developer lầm tưởng backend đã sẵn sàng.
5. **Hooks chưa dùng `apiClient`**: Chưa kết nối header Authorization, error handling trung tâm; cộng đồng nên cân nhắc refactor dần.

## 5. Recommendation khi đóng góp
- Duy trì controller mỏng: mọi nghiệp vụ phải ở use case/service.
- Đặt mapper ở ranh giới adapter: web mapper không nên lẫn mapper persistence.
- Khi hop API/frontend, cập nhật `docs/` (Project overview, Architecture, Standards) trước rồi mới chỉnh code.
- Nhấn mạnh viết tests cho persistence/service khi thay đổi logic (hiện coverage mỏng).
