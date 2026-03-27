# Kiến trúc hệ thống

## 1. Bố cục tầng
- **Frontend** (`frontend/`): Vite + React 18 + TypeScript với router `frontend/src/App.tsx` (login + admin shell). `AdminLayout` render sidebar + `<Outlet />` cho `dashboard`, `rooms`, `bookings`. Hooks TanStack Query (`frontend/src/features/*/hooks`) điều phối dữ liệu, các component UI nằm trong `frontend/src/components/ui`. Axios client nằm ở `frontend/src/api/client.ts`, nhưng hooks hiện dùng `fetch` trực tiếp.
- **Backend** (`backend/`): Spring Boot 4 với entry `BackendApplication`, cấu hình beans trong `BeanConfig`. Hexagonal architecture: controller lớp `adapter/in/web`, domain service `application/domain/service`, port interfaces `application/port`, persistence adapter `adapter/out/persistence`. Chỉ có hai API: `RoomController` (`GET /api/rooms?status=...`) và `BookingController` (`POST /api/bookings`).
- **Database** (`database/hotel-management.sql`): MySQL schema `hotel_management` với bảng `tblHotel`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill`, `tblUser`, `tblClient`, `tblService`. Quan hệ `room` ➜ `hotel`, `booking` liên kết `client/user`, `bookedRoom` kết nối booking/room, `usedService` nối service/bookedRoom, `bill` nối booking/user.

## 2. Luồng dữ liệu điển hình
1. **Danh sách phòng**: `RoomListPage` (feature/rooms) gọi hook `useRooms` → `fetch('/api/rooms?...')` → `RoomController.getRooms` → `GetRoomsService` → `RoomPersistenceAdapter` → `SpringDataRoomRepository`. Trả về DTO `RoomResponse`.
2. **Tạo booking**: `CreateBookingModal` gọi `useCreateBooking` → POST body tới `/api/bookings` → `BookingController.create` gọi `CreateBookingUseCase` và `LoadRoomPort` → lưu booking (`SaveBookingPort`).
3. **Router**: mặc định `/` redirect sang `/dashboard`. Khi `<Navigate>` đẩy tới `/rooms`/`/bookings`, chưa có route guard nên route không kiểm tra auth.

## 3. Kết nối runtime & Dev setup
- **Dev proxy**: Vite dev server proxy `/api` tới `http://localhost:8080` (`frontend/vite.config.ts`), cho phép `fetch('/api/...')` hoạt động giống production.
- **CI/CD**: `.github/workflows/build-backend.yaml` checkout repo, build backend và frontend Docker image rồi push lên `ghcr.io/${{ github.repository_owner }}/hotel-backend|hotel-frontend`. Chưa có job lint/test.
- **Deployment stack**: backend build jar qua Maven wrapper (`mvnw`), frontend build Vite; Dockerfiles copy artifact sau khi build.

## 4. Những khoảng lệch/front-back/db cần theo dõi
- **Endpoint mismatch**: frontend hook `useBookings` gọi `GET /api/bookings`, còn `useUpdateBooking`, `useCancelBooking` dùng `PUT /api/bookings/:id`; `useRooms` và mutation gọi `POST/PUT/DELETE /api/rooms/:id`. Backend chưa có controller nào tương ứng ngoài `GET /api/rooms` và `POST /api/bookings`.
- **Auth chưa hoàn chỉnh**: `frontend/src/features/auth/LoginPage.tsx` chỉ render form; backend không có controller `/auth/login`, không có middleware JWT hoặc session. `AdminLayout` và route `/dashboard` không kiểm tra phép.
- **Configs bị hardcode**: `backend/src/main/resources/application.yaml` chứa `url`, `username`, `password` ra bên ngoài, cần thay bằng env/secret; doc nhắc nhu cầu `TODO`.
- **Dữ liệu tiền tệ**: `database/hotel-management.sql` dùng `FLOAT` cho `price`, `discount`, `paymentAmount` (ví dụ `tblRoom.price`, `tblService.price`). Cần review để tránh sai số khi tổng tiền/phiếu thu lớn.
- **Mock data chưa gỡ**: `USE_MOCK = false` nhưng vẫn giữ `mockData`, điều này có thể khiến dev tưởng là backend có đủ API trong khi thực tế chỉ 1 endpoint.

## 5. Đề xuất tiếp theo
1. Bổ sung controller/backing service cho các endpoint booking và room mà frontend đang gọi hoặc cập nhật frontend để dùng đúng API backend (hiện API backend rất hạn chế).
2. Thêm authentication layer (login route, token storage, route guard) phù hợp với `authApi.ts`/`LoginPage`.
3. Chuẩn hoá cách gọi API: sử dụng `apiClient`/Axios thay vì `fetch` thủ công, để dễ thêm header Authorization.
4. Tách config DB khỏi source code, dùng `@ConfigurationProperties` hoặc `spring.config.import`, đồng thời ghi doc cách cung cấp env để build container.
