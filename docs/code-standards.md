# Codebase structure & coding conventions

## 1. Backend (Java + Spring Boot)
- **Hexagonal layout rõ ràng**: `application/port` chứa `CreateBookingUseCase`, `GetRoomsUseCase` (inbound) và các interface `LoadRoomPort`, `LoadRoomsPort`, `SaveBookingPort` (outbound). `application/domain/service` triển khai logic (`CreateBookingService`, `GetRoomsService`) và được wired trong `backend/config/BeanConfig.java`.
- **Naming**: `UseCase`/`Command`/`Port` dùng PascalCase và kết thúc bằng vai trò (`CreateBookingCommand`). DTO response/request đặt trong `adapter/in/web/dto`. Entities, domain models, mapper nằm trong `adapter/out/persistence`.
- **REST controller**: `@RestController` nằm dưới `adapter/in/web`. Tên route `/api/...` (ví dụ `RoomController` map đến `/api/rooms`). Các controller giữ rất ít logic và chỉ gọi `UseCase` sau khi map DTOs via mapper (`RoomWebMapper`, `BookingWebMapper`).
- **Validation/response**: `BookingController` dùng `@Valid` và trả `@ResponseStatus(HttpStatus.CREATED)` cho POST.
- **Config**: `application.yaml` hiện để `spring.datasource` với `url/username/password` hardcode; cần di chuyển sang biến môi trường trước khi release.

## 2. Frontend (Vite + React + Tailwind)
- **Cấu trúc tính năng (feature folder)**: mỗi nhóm `auth`, `dashboard`, `rooms`, `bookings` có `pages`, `components`, `hooks` riêng. Hooks (`useRooms`, `useBookings`) nằm trong `features/*/hooks` và dùng TanStack React Query để fetch/update.
- **API patterns**: Axios client ở `frontend/src/api/client.ts` tạo base `'/api'`; file `authApi.ts` dùng `./axios` (chưa sync với `client.ts`). Hiện logic gọi `fetch('/api/...')` thay vì `apiClient`, nên cần đồng nhất qua một helper.
- **Mock flow**: song song với API thực (`fetch`), các hook vẫn giữ `mockData` và hằng số `const USE_MOCK = false`. Giai đoạn chuyển tiếp chưa rõ (nên xác định rõ `true`/`false` theo env) để tránh dữ liệu không mong muốn.
- **Router/layout**: `App.tsx` khai báo `/login` và shell `AdminLayout` chứa link `NavLink` (icons inline SVG). Router chưa có route guard/auth context nên bất cứ ai cũng vào `/dashboard`.
- **UI/cấu hình**: Tailwind utilities, Material Symbols, Inter font. Các component UI đặt trong `frontend/src/components/ui` (Badge, Button, Card, Modal, ...). Styling dùng `className` thuần mà không có CSS modules.

## 3. Database conventions
- Tên bảng `tblXxx` (ví dụ `tblHotel`, `tblBooking`, `tblUsedService`). PK luôn tên `ID` (INT/auto-increment trừ `tblRoom.ID` là `VARCHAR`).
- FK theo pattern `<entity>ID` (ví dụ `hotelID`, `clientID`, `userID`).
- Money fields như `price`, `discount`, `paymentAmount` định nghĩa `FLOAT` (xem `database/hotel-management.sql`). Vì `FLOAT` có giới hạn precision, cần cân nhắc chuyển sang `DECIMAL` nếu xử lý tiền hoặc tổng invoice quan trọng.
- Quan hệ: room -> hotel, booking -> client/user, bookedRoom -> room/booking, usedService -> service/bookedRoom, bill -> booking/user.

## 4. Tooling và workflow
- Maven wrapper (`backend/mvnw`, `.mvn/wrapper/*`) đảm bảo build consistent; backend Dockerfile build + package jar, frontend Dockerfile simple (copy build).
- GitHub Actions `.github/workflows/build-backend.yaml` chỉ build/push image lên GHCR khi có push `main`; không có job lint/test hiện tại.
- Frontend dev server proxy `/api` sang backend port 8080 (`frontend/vite.config.ts`), nên `fetch`/Axios có thể gửi trực tiếp `/api/rooms`.
- Documentation focus: docs mới nằm trong `docs/` (project overview, architecture, standards, codebase summary). README sẽ link các tài liệu này.
