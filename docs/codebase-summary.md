# Tóm tắt codebase

`docs/` là hệ thống tài liệu sống. Cứ khi kiến trúc/API thay đổi thì cập nhật trực tiếp ở đây để mọi người có **nguồn sự thật duy nhất**.

## 1. Cấu trúc tổng thể
- Repo chia làm 3 khối chính:
  1. `backend/`: Spring Boot 4 + Java 21, kiến trúc hexagonal (ports/services/adapters).
  2. `frontend/`: Vite 5 + React 18 + TypeScript, Tailwind, React Router, TanStack Query, Axios.
  3. `database/`: script MySQL `hotel-management.sql` (schema tên `tblXxx`).
- `README.md` chỉ đường đến `docs/` và cảnh báo doc là source of truth.
- CI hiện chỉ có workflow `build-backend.yaml` để build & push Docker image khi push `main`; chưa có lint/test gate.

## 2. Backend hiện trạng
- Entrypoint: `BackendApplication`, bean wiring trong `BeanConfig` tạo `GetRoomsService` và `CreateBookingService`.
- API có mặt:
  - `GET /api/rooms` (`RoomController`) nhận optional `status` query, trả list `RoomResponse` từ `RoomPersistenceAdapter` → `SpringDataRoomRepository`.
  - `POST /api/bookings` (`BookingController`) tạo `Booking` `PENDING`, không chạm vào trạng thái phòng và chỉ trả DTO `BookingWebMapper` kết hợp với `Room` hiện tại.
- Domain model: `Room` có `roomNumber`, `RoomStatus` (`AVAILABLE`, `BOOKED`, `MAINTENANCE`), `RoomType` với `price`/`capacity`; `Booking` giữ `userId`, `roomId`, `checkIn`, `checkOut`, `BookingStatus` (`PENDING`, `CONFIRMED`, `CANCELLED`).
- Persistence mapping kỳ vọng bảng `rooms`, `room_types`, `bookings` (cột `room_number`, `room_type_id`, `check_in`, `status`...); hiện schema `.sql` khác tên và không có `room_types`.
- `application.yaml` chứa credential kết nối (`jdbc:mysql://192.168.20.40:3306/hotel_management`, user/password) và `spring.jpa.hibernate.ddl-auto: none`.

## 3. Frontend thực tế
- Entrypoint: `frontend/src/main.tsx` dùng `AuthProvider`, `App.tsx` định tuyến `/login` và toàn bộ `/dashboard`, `/rooms`, `/bookings` bên trong `ProtectedRoute`/`PublicOnlyRoute`.
- `AuthProvider` đọc session từ local/session storage, `apiClient` (axios) inject header Authorization nếu có token và emit sự kiện `auth:unauthorized` khi server trả 401.
- `authService` mặc định bật mock ở DEV (`VITE_ENABLE_MOCK_AUTH`), chỉ gọi API thật khi `VITE_ENABLE_REAL_AUTH=true`; login mock kiểm tra `admin/admin123` và tạo session demo.
- Data flow:
  - `useRooms`: fetch `/api/rooms`, fallback sang `mockRooms` khi backend không trả JSON (cờ `USE_DEV_FALLBACK`).
  - `useBookings`: fetch `/api/bookings` tương tự; mutation gọi `/api/bookings`, `/api/rooms` cho create/update/delete dù backend không có tất cả endpoint.
  - `RoomListPage` dùng `mockBookings`, `activeFilter` không được dùng, modal thêm phòng và modal thay đổi trạng thái chỉ log dữ liệu vào console thay vì gọi API.
- Shared UI: `AdminLayout` (sidebar, header, user menu), `frontend/src/components/ui/` (Button, Modal, Badge...).
- API helpers: `frontend/src/api/client.ts` (axios + interceptor), nhưng hook vẫn dùng `fetch` thô.

## 4. Database & integration gaps
- Schema `database/hotel-management.sql` tạo bảng `tblHotel`, `tblUser`, `tblClient`, `tblService`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill` với các cột `INT`, `VARCHAR`, `FLOAT` cho tiền.
- JPA Entities dùng BigDecimal, nhưng script dùng `FLOAT` -> sai số khi tổng tiền lớn. Cần đánh giá lại kiểu dữ liệu.
- Tên bảng không trùng (`tblRoom` vs `rooms`), không có `room_types`, làm Spring Data JPA fail khi `ddl-auto: none` và dùng mapping hiện tại.
- Frontend dev server proxy `/api` → `http://localhost:8080` nên mọi fetch có thể điều phối sang backend địa phương.

## 5. Tooling & workflow nhanh
- Backend build: `./mvnw spring-boot:run`, Maven 3.9 wrapper, GitHub Action build/push Docker image trên nhánh `main`.
- Frontend dev: `npm install && npm run dev`, Vite 5, tailwind config, dev proxy `/api`.
- Docs: `docs/project-overview-pdr.md`, `docs/system-architecture.md`, `docs/code-standards.md` là nơi ghi facts; mọi thay đổi dứt khoát phải cập nhật ở đó.

## 6. Gaps cần biết ngay
1. Backend chỉ cung cấp 2 endpoint mà frontend gọi nhiều hơn (rooms CRUD, booking list/update, auth). Khi `USE_DEV_FALLBACK=false` lỗi sẽ hiện.
2. Auth mới chỉ có mock + client-side guard; backend chưa có `/auth/login` hay bất kỳ mechanism nào để verify token.
3. Schema hiện tại (`tbl*`, `FLOAT`) không khớp với JPA entity `rooms`, `room_types`, `bookings` (BigDecimal). Cần chốt contract.
4. `CreateBookingService` không cập nhật trạng thái phòng: backend vẫn giữ room là `AVAILABLE` dù booking đã tạo.
5. Frontend còn console-log modal (`RoomFormModal`, `ChangeStatusModal`) và vẫn giữ dữ liệu giả (`mockBookings`, `mockRooms`).

Khi đọc repo, ưu tiên theo trình tự: Đọc `docs/project-overview-pdr.md` → `docs/system-architecture.md` → `docs/code-standards.md` để hiểu sự lệch giữa FE/BE/DB trước khi thay đổi code.
