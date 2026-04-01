# Tổng quan và PDR hiện trạng

> `docs/` là nguồn sự thật. Khi có thay đổi API, mô hình hoặc quy trình, cập nhật trực tiếp trong các file ở đây.

## 1. Tóm tắt hệ thống
- **Backend**: Spring Boot 4 + Java 21, entry `BackendApplication`, `BeanConfig` tiêm `RoomPersistenceAdapter`/`BookingPersistenceAdapter` vào `GetRoomsService` và `CreateBookingService`. Domain model xác định `RoomStatus` (`AVAILABLE`, `BOOKED`, `MAINTENANCE`) và `BookingStatus` (`PENDING`, `CONFIRMED`, `CANCELLED`).
- **Frontend**: Vite + React 18 + TypeScript; `App.tsx` định tuyến `/login` và toàn bộ `/dashboard`, `/rooms`, `/bookings` bên trong `ProtectedRoute`. Layout `AdminLayout` render sidebar, header và `<Outlet />` cho các page (Dashboard, RoomList, BookingList). Truy vấn dữ liệu thực hiện bằng TanStack Query (`useRooms`, `useBookings`).
- **Database**: script `database/hotel-management.sql` tạo schema `hotel_management` với các bảng `tblHotel`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill`, `tblUser`, `tblClient`, `tblService`. Script dùng `FLOAT` cho các trường tiền.
- **Dev/CI**: Frontend dev server proxy `/api` sang `http://localhost:8080` (vite.config.ts). GH Actions `build-backend.yaml` chỉ build & push Docker image cho backend/frontend trên nhánh `main` mà không chạy lint/test.

## 2. Thực trạng triển khai

- **Backend hiện có**
  - `GET /api/rooms` (`RoomController.getRooms`): nhận query `status`, gọi `GetRoomsService` → `RoomPersistenceAdapter` → `SpringDataRoomRepository`. Không có các endpoint GET/PUT/DELETE `rooms/{id}` hay `GET /api/bookings/{id}`.
  - `POST /api/bookings` (`BookingController.create`): tạo booking `PENDING`, không cập nhật lại trạng thái phòng; sau khi lưu trả DTO kết hợp `Booking` và `Room` qua `BookingWebMapper`.
  - `CreateBookingService` chỉ kiểm tra `RoomStatus.AVAILABLE`, tạo booking mới, không sửa `Room` hay `RoomType` liên quan.
  - `application.yaml` hardcode URL + credentials (`jdbc:mysql://192.168.20.40:3306/hotel_management`, user/password). Khối `spring.jpa` đặt `ddl-auto: none` và `open-in-view: false`.

- **Frontend thực tế**
  - Router sử dụng `ProtectedRoute`/`PublicOnlyRoute` và `AuthProvider` (session lưu trong local/session storage). `authService` mặc định bật mock (`USE_MOCK_AUTH` true trong DEV) và chỉ gọi `authApi` khi `VITE_ENABLE_REAL_AUTH=true`. Khi backend trả 401, `apiClient` emit sự kiện `auth:unauthorized` để logout.
  - `useRooms`/`useBookings` vẫn gọi `fetch('/api/rooms')`, `fetch('/api/bookings')` thay vì `apiClient`, có cờ `USE_DEV_FALLBACK` (mặc định true trong DEV) để dùng `mockData` nếu API lỗi. Các mutation `useCreateRoom`/`useUpdateRoom`/`useDeleteRoom`/`useUpdateBooking`/`useCancelBooking` gửi POST/PUT/DELETE đến `/api/rooms` hoặc `/api/bookings/:id` dù backend chưa cung cấp.
  - `RoomListPage` vẫn dựa vào `mockBookings`, `activeFilter` không dùng và modal thêm phòng chỉ `console.log`. `BookingListPage` (với `useBookings`) chưa được backend trả data.

- **Database & mapping**
  - JPA entity `RoomJpaEntity`/`RoomTypeJpaEntity`/`BookingJpaEntity` mong đợi bảng `rooms`, `room_types`, `bookings` với các cột `room_number`, `room_type_id`, `check_in`, `status`... Schema `.sql` lại dùng tên `tbl*` khác và không có bảng `room_types`. Đồng bộ giữa entity và schema hiện bị lệch.
  - Tất cả số tiền trong schema đều kiểu `FLOAT`, không tương thích với `BigDecimal` trong domain và dễ gây sai lệch khi tính toán invoice.

## 3. PDR – rủi ro & điểm chưa hoàn thiện
1. **Contract frontend/backend không đồng bộ**: Hooks booking/room gọi nhiều REST endpoint mà backend chưa hoặc không bao giờ cung cấp. Khi `USE_DEV_FALLBACK=false`, frontend sẽ ném lỗi vì thiếu API.
2. **Authentication chưa thực sự có mặt ở backend**: `LoginPage` chạy mock, `authApi` không có endpoint `/auth/login`, backend không validate token/session nào. `ProtectedRoute` chỉ dựa vào session client-side. Cần định vị rõ scope auth (mock vs real) trong doc.
3. **Cấu hình nhúng secrets**: `application.yaml` vẫn nằm trong repo với `username/password` rõ ràng. Byte script CI/production chưa hướng dẫn cách override bằng env.
4. **Model DB lệch**: JPA dùng `rooms`, `room_types`, `bookings` trong khi `.sql` tạo `tblRoom`, `tblBooking`, `tblHotel`,... Phải chọn một contract (hoặc viết migration đồng bộ) để tránh lỗi khi khởi động (Spring boot modern JPA sẽ fail nếu không có bảng đúng tên).
5. **Logic nghiệp vụ còn lỏng**: `CreateBookingService` không cập nhật `RoomStatus`, `RoomListPage` vẫn dựa vào dữ liệu giả, modal thêm phòng chỉ log ra console. Các mutation gọi API không tồn tại nên dao động.
6. **Precision tài chính thấp**: ORM dùng `BigDecimal`, schema dùng `FLOAT`. Khi tính toán `price`/`discount` trên booking hoặc services, cần kiểm tra lại loại cột.

## 4. Tài liệu tham chiếu nhanh
| Nội dung | File tham chiếu |
| --- | --- |
| Backend entrypoint & beans | `backend/src/main/java/com/hotel/backend/BackendApplication.java`, `backend/config/BeanConfig.java` |
| Chỉ có hai API hoạt động | `backend/adapter/in/web/RoomController.java`, `backend/adapter/in/web/BookingController.java` |
| Domain/service | `backend/application/domain/service/CreateBookingService.java`, `RoomStatus`, `BookingStatus` |
| Frontend routes/auth | `frontend/src/App.tsx`, `AdminLayout.tsx`, `features/auth/*` |
| Hooks & mock data | `frontend/src/features/rooms/hooks/useRooms.ts`, `frontend/src/features/bookings/hooks/useBookings.ts`, `frontend/src/data/mockData.ts` |
| API client và interceptor | `frontend/src/api/client.ts` |
| Dev proxy & workflow | `frontend/vite.config.ts`, `.github/workflows/build-backend.yaml` |
| Database script | `database/hotel-management.sql` |
