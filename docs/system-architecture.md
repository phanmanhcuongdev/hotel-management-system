# Kiến trúc hệ thống

`docs/` là nơi mô tả kiến trúc thực tế. Khi thay đổi tầng nào (frontend/backend/db), hãy cập nhật file tương ứng.

## 1. Khối thành phần
- **Backend** (`backend/`): Spring Boot 4 + Java 21, entry `BackendApplication`. `BeanConfig` biến các adapter (persistence/controller) thành bean. Hexagonal layout rõ qua các thư mục `adapter/in/web`, `application/domain/service`, `application/port`, `adapter/out/persistence`. Hiện chỉ có `RoomController` (`GET /api/rooms`) và `BookingController` (`POST /api/bookings`) nên controller vẫn rất gọn.
- **Frontend** (`frontend/`): Vite 5 + React 18 + TypeScript. `AuthProvider` + `useAuth` đưa thông tin session vào context, `App.tsx` bảo vệ toàn bộ `/dashboard`, `/rooms`, `/bookings` bằng `ProtectedRoute`, và `PublicOnlyRoute` đưa người dùng authenticated thẳng về `/dashboard`. Layout chính `AdminLayout` chứa menu, header, avatar, nút logout.
- **Database** (`database/hotel-management.sql`): schema `hotel_management` với bảng `tblHotel`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill`, `tblUser`, `tblClient`, `tblService`. Tất cả giá `price`/`discount`/`paymentAmount` dùng `FLOAT`.
- **Docs & workflow**: `docs/` bao gồm overview, architecture, standards; `.github/workflows/build-backend.yaml` build/push docker image trên `main` (không chạy lint/test).

## 2. Luồng dữ liệu & domain
1. **Danh sách phòng**: `RoomListPage` gọi `useRooms` (TanStack Query). Hook thực hiện `fetch('/api/rooms?status=...')`, `RoomController` trả list `RoomResponse`. Nếu backend lỗi, `useRooms` fallback dùng `mockRooms` vì `USE_DEV_FALLBACK` (true trong DEV). `RoomListPage` vẫn thêm `mockBookings` và `search` logic; `RoomFormModal` chỉ `console.log` submit.
2. **Tạo booking**: `CreateBookingModal` => `useCreateBooking` (mutation) => `fetch('/api/bookings', POST)` với payload `{userId, roomId, checkIn, checkOut}`. Backend `BookingController` gọi `CreateBookingUseCase` và `LoadRoomPort` để trả phòng hiện tại. `CreateBookingService` chỉ tạo booking `PENDING`, không cập nhật trạng thái phòng.
3. **Auth & guard**: `authService` mock (DEV) hoặc gọi `authApi` nếu `VITE_ENABLE_REAL_AUTH=true`. Session lưu local/session storage; `apiClient` intercepter thêm Authorization header và emit sự kiện `auth:unauthorized` khi backend trả 401 → `AuthProvider` logout người dùng. `ProtectedRoute` render spinner khi status là `loading` và `Navigate` tới `/login` nếu không authenticated.

## 3. Runtime & môi trường phát triển
- **Backend**: chạy `./mvnw spring-boot:run`. Maven wrapper đảm bảo Java 21 + dependency offline (pom). `application.yaml` hiện chứa URL/username/password; chưa có hướng dẫn đẩy vào env/secret.
- **Frontend**: chạy `npm install && npm run dev`, Vite dev server proxy `/api` → `http://localhost:8080` (vite.config). `apiClient` base `/api` nhưng hầu hết hook vẫn dùng `fetch`.
- **CI/Deployment**: `.github/workflows/build-backend.yaml` build Docker image backend/front và push tới GHCR; không chạy lint/test, không kiểm tra DB migration.

## 4. Gaps tích hợp & cần theo dõi
- **API mismatch**: Hooks tạo/cập nhật/xóa phòng (`/api/rooms`, `/api/rooms/:id`) và booking (`GET /api/bookings`, `PUT /api/bookings/:id`) nhưng backend chỉ có `GET /api/rooms` + `POST /api/bookings`. Khi `USE_DEV_FALLBACK=false`, các phần này sẽ lỗi.
- **Auth chưa có backend thực**: `authApi` giả định `/auth/login`, nhưng backend không có controller đó, chỉ có mock client-side guard. Bất kỳ tính năng liên quan đến token thực cần bổ sung backend.
- **Config và secrets**: `application.yaml` chứa credential rõ ràng; doc cần mô tả cách cung cấp `SPRING_DATASOURCE_URL/USERNAME/PASSWORD` từ env, đặc biệt nếu container hoá.
- **DB contract**: JPA entity tìm `rooms`, `room_types`, `bookings` (BigDecimal). Schema `.sql` dùng `tblRoom`, `tblBooking`, `tblHotel`, `FLOAT`. Cần chọn 1 source-of-truth, hoặc viết migration để đồng bộ.
- **Mock data & UX**: Frontend vẫn giữ `mockData`, modal chỉ log, `activeFilter` không dùng → cần audit khi backend hoàn thiện API để tránh bẫy.

## 5. Next steps tài liệu hóa
- Lưu ý mọi thay đổi API/Biz logic cần cập nhật `docs/project-overview-pdr.md` (Project/PD), `docs/code-standards.md` (quy tắc/code structure), `docs/codebase-summary.md` (tóm tắt), `docs/system-architecture.md` (luồng). Đây là các nguồn để đồng bộ team.
