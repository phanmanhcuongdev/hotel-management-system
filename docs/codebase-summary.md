This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/workflows/build-backend.yaml
backend/.gitattributes
backend/.gitignore
backend/.mvn/wrapper/maven-wrapper.properties
backend/Dockerfile
backend/mvnw
backend/mvnw.cmd
backend/pom.xml
backend/src/main/java/com/hotel/backend/adapter/in/web/BookingController.java
backend/src/main/java/com/hotel/backend/adapter/in/web/BookingWebMapper.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/ApiErrorResponse.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/BookingResponse.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/CreateBookingRequest.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomResponse.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomShortResponse.java
backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomTypeResponse.java
backend/src/main/java/com/hotel/backend/adapter/in/web/GlobalExceptionHandler.java
backend/src/main/java/com/hotel/backend/adapter/in/web/RoomController.java
backend/src/main/java/com/hotel/backend/adapter/in/web/RoomWebMapper.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingJpaEntity.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingMapper.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingPersistenceAdapter.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomJpaEntity.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomMapper.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomPersistenceAdapter.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomTypeJpaEntity.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/SpringDataBookingRepository.java
backend/src/main/java/com/hotel/backend/adapter/out/persistence/SpringDataRoomRepository.java
backend/src/main/java/com/hotel/backend/application/domain/model/Booking.java
backend/src/main/java/com/hotel/backend/application/domain/model/BookingStatus.java
backend/src/main/java/com/hotel/backend/application/domain/model/Room.java
backend/src/main/java/com/hotel/backend/application/domain/model/RoomStatus.java
backend/src/main/java/com/hotel/backend/application/domain/model/RoomType.java
backend/src/main/java/com/hotel/backend/application/domain/service/CreateBookingService.java
backend/src/main/java/com/hotel/backend/application/domain/service/GetRoomsService.java
backend/src/main/java/com/hotel/backend/application/port/in/CreateBookingCommand.java
backend/src/main/java/com/hotel/backend/application/port/in/CreateBookingUseCase.java
backend/src/main/java/com/hotel/backend/application/port/in/GetRoomsUseCase.java
backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomPort.java
backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomsPort.java
backend/src/main/java/com/hotel/backend/application/port/out/SaveBookingPort.java
backend/src/main/java/com/hotel/backend/BackendApplication.java
backend/src/main/java/com/hotel/backend/config/BeanConfig.java
backend/src/main/resources/application.yaml
backend/src/test/java/com/hotel/backend/BackendApplicationTests.java
database/hotel-management.sql
docs/code-standards.md
docs/codebase-summary.md
docs/project-overview-pdr.md
docs/system-architecture.md
frontend/.dockerignore
frontend/.gitignore
frontend/Dockerfile
frontend/eslint.config.js
frontend/index.html
frontend/package.json
frontend/postcss.config.js
frontend/public/vite.svg
frontend/src/api/authApi.ts
frontend/src/api/bookings.ts
frontend/src/api/client.ts
frontend/src/api/index.ts
frontend/src/api/rooms.ts
frontend/src/App.tsx
frontend/src/components/AppErrorBoundary.tsx
frontend/src/components/ui/Badge.tsx
frontend/src/components/ui/Button.tsx
frontend/src/components/ui/Card.tsx
frontend/src/components/ui/index.ts
frontend/src/components/ui/Input.tsx
frontend/src/components/ui/Modal.tsx
frontend/src/components/ui/Select.tsx
frontend/src/components/ui/Table.tsx
frontend/src/data/mockData.ts
frontend/src/features/auth/AuthContext.ts
frontend/src/features/auth/AuthProvider.tsx
frontend/src/features/auth/authService.test.ts
frontend/src/features/auth/authService.ts
frontend/src/features/auth/authStorage.ts
frontend/src/features/auth/LoginPage.tsx
frontend/src/features/auth/ProtectedRoute.tsx
frontend/src/features/auth/PublicOnlyRoute.tsx
frontend/src/features/auth/types.ts
frontend/src/features/auth/useAuth.ts
frontend/src/features/bookings/components/BookingDetailModal.tsx
frontend/src/features/bookings/components/BookingStatusBadge.tsx
frontend/src/features/bookings/components/BookingTable.tsx
frontend/src/features/bookings/components/CreateBookingModal.tsx
frontend/src/features/bookings/components/index.ts
frontend/src/features/bookings/components/UpdateStatusModal.tsx
frontend/src/features/bookings/hooks/useBookings.ts
frontend/src/features/bookings/pages/BookingListPage.tsx
frontend/src/features/dashboard/components/index.ts
frontend/src/features/dashboard/components/StatsCard.tsx
frontend/src/features/dashboard/pages/DashboardPage.tsx
frontend/src/features/rooms/components/ChangeStatusModal.tsx
frontend/src/features/rooms/components/index.ts
frontend/src/features/rooms/components/RoomCard.tsx
frontend/src/features/rooms/components/RoomFilterBar.tsx
frontend/src/features/rooms/components/RoomFilters.tsx
frontend/src/features/rooms/components/RoomFormModal.tsx
frontend/src/features/rooms/components/RoomGridView.tsx
frontend/src/features/rooms/components/RoomStatusBadge.tsx
frontend/src/features/rooms/components/RoomStatusTabs.tsx
frontend/src/features/rooms/components/RoomTable.tsx
frontend/src/features/rooms/hooks/useRooms.ts
frontend/src/features/rooms/pages/RoomListPage.tsx
frontend/src/index.css
frontend/src/layouts/AdminLayout.tsx
frontend/src/main.tsx
frontend/src/test/setup.ts
frontend/src/types/booking.ts
frontend/src/types/index.ts
frontend/src/types/room.ts
frontend/src/vite-env.d.ts
frontend/tailwind.config.js
frontend/tsconfig.json
frontend/vite.config.ts
LICENSE
plans/reports/brainstorm-2026-03-26-backend-refactor.md
README.md
```

# Files

## File: docs/code-standards.md
```markdown
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
```

## File: docs/codebase-summary.md
```markdown
# Tóm tắt codebase

## 1. Bức tranh tổng thể
- Repo tách thành 3 khối chính: `backend/` (Spring Boot), `frontend/` (React/Vite), `database/` (MySQL schema) và 1 workflow CI tại `.github/workflows/build-backend.yaml`.
- Trạng thái hiện tại là một hệ thống đang trong giai đoạn nối ghép: frontend đã dựng khá nhiều màn hình và hook, nhưng backend mới mở một phần nhỏ API, còn database schema lại phản ánh domain quản lý khách sạn rộng hơn phần code đang dùng.

## 2. Thành phần chính

### Backend
- Stack: Java 21, Spring Boot 4.0.2, Spring MVC, Validation, Spring Data JPA, MySQL, Springdoc OpenAPI (`backend/pom.xml`).
- Entry point: `backend/src/main/java/com/hotel/backend/BackendApplication.java`.
- Kiến trúc: hexagonal/ports-and-adapters.
- Thư mục quan trọng:
  - `backend/src/main/java/com/hotel/backend/application/port/in/`
  - `backend/src/main/java/com/hotel/backend/application/port/out/`
  - `backend/src/main/java/com/hotel/backend/application/domain/service/`
  - `backend/src/main/java/com/hotel/backend/adapter/in/web/`
  - `backend/src/main/java/com/hotel/backend/adapter/out/persistence/`
  - `backend/src/main/java/com/hotel/backend/config/BeanConfig.java`
- API đã xác nhận từ code:
  - `GET /api/rooms`
  - `POST /api/bookings`

### Frontend
- Stack: React 18, TypeScript, Vite 5, Tailwind CSS, React Router, TanStack React Query, Axios, React Hook Form, Zod, Zustand (`frontend/package.json`).
- Entry points: `frontend/src/main.tsx`, `frontend/src/App.tsx`.
- Routes hiện có:
  - `/login`
  - `/dashboard`
  - `/rooms`
  - `/bookings`
- Tổ chức theo feature:
  - `frontend/src/features/auth/`
  - `frontend/src/features/dashboard/`
  - `frontend/src/features/rooms/`
  - `frontend/src/features/bookings/`
- Shared UI: `frontend/src/components/ui/`.
- API layer: `frontend/src/api/`.

### Database
- Nguồn schema duy nhất: `database/hotel-management.sql`.
- Database name: `hotel_management`.
- Bảng chính:
  - `tblHotel`
  - `tblUser`
  - `tblClient`
  - `tblService`
  - `tblRoom`
  - `tblBooking`
  - `tblBookedRoom`
  - `tblUsedService`
  - `tblBill`

## 3. Luồng hiện tại theo code
- Frontend gọi `/api/...` qua dev proxy của Vite sang backend cổng `8080`.
- `useRooms` gọi `GET /api/rooms` và có vẻ bám sát backend hơn.
- `useCreateBooking` gọi `POST /api/bookings`, đây là luồng tạo booking đang có backend hỗ trợ.
- Các hook frontend khác vẫn gọi nhiều endpoint chưa tồn tại ở backend, nên hệ thống chưa đồng bộ hoàn chỉnh.

## 4. Danh sách file quan trọng nên đọc trước
- `README.md`
- `.github/workflows/build-backend.yaml`
- `backend/pom.xml`
- `backend/src/main/resources/application.yaml`
- `backend/src/main/java/com/hotel/backend/BackendApplication.java`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/RoomController.java`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/BookingController.java`
- `backend/src/main/java/com/hotel/backend/config/BeanConfig.java`
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/layouts/AdminLayout.tsx`
- `frontend/src/features/rooms/hooks/useRooms.ts`
- `frontend/src/features/bookings/hooks/useBookings.ts`
- `frontend/src/api/client.ts`
- `frontend/src/api/authApi.ts`
- `database/hotel-management.sql`

## 5. Mismatch và gap lớn nhất
- Frontend đang gọi thêm các endpoint như `GET /api/bookings`, `PUT /api/bookings/:id`, `POST|PUT|DELETE /api/rooms/:id`, nhưng backend hiện chưa có controller tương ứng.
- `frontend/src/api/authApi.ts` giả định có auth flow, nhưng backend chưa có `/auth/login`.
- `LoginPage` mới ở mức UI, chưa có auth context, token lifecycle, hay protected routes.
- `backend/src/main/resources/application.yaml` đang chứa datasource hardcode; tài liệu này chỉ ghi nhận rủi ro, không lặp lại secret.
- Database đang dùng `FLOAT` cho nhiều trường tiền tệ, có rủi ro sai số.

## 6. Kết luận ngắn
- Đây là codebase có nền móng rõ: frontend có cấu trúc feature tốt, backend có cấu trúc hexagonal rõ ràng, database có domain tương đối đầy đủ.
- Tuy nhiên ba tầng chưa đồng bộ hoàn toàn về contract API, auth, và mapping với schema thực tế. Khi đọc hoặc mở rộng dự án, cần xem `docs/project-overview-pdr.md` và `docs/system-architecture.md` trước.
```

## File: docs/project-overview-pdr.md
```markdown
# Tổng quan và PDR ban đầu

## 1. Tổng quan hệ thống
- **Scope**: `hotel-management-system` là bộ công cụ quản lý khách sạn gồm backend Spring Boot, frontend React/Vite và schema MySQL. Các domain căn bản là phòng (`rooms`), đặt phòng (`bookings`) và dữ liệu tài chính/dịch vụ.
- **Cấu trúc**: backend theo phong cách hexagonal (ports/adapters) ở `backend/src/main/java/com/hotel/backend`, frontend feature-oriented (`frontend/src/features/*`), database định nghĩa `tbl*` trong `database/hotel-management.sql`.
- **CI/CD hiện tại**: `.github/workflows/build-backend.yaml` xây dựng và push Docker image cho backend/frontend mỗi khi push lên `main`.

## 2. Phạm vi triển khai thực tế
- **Backend**: chỉ có hai controller: `GET /api/rooms` (có query `status`) và `POST /api/bookings` (`backend/src/main/java/com/hotel/backend/adapter/in/web/*`). Không có endpoint cho cập nhật/xóa phòng, không có `GET /api/bookings` dù frontend gọi.
- **Frontend**: route `/login`, `/dashboard`, `/rooms`, `/bookings` (`frontend/src/App.tsx`) với layout `AdminLayout`. Hook `useRooms`/`useBookings` gọi `fetch('/api/...')` ngay cả khi `USE_MOCK = false`, nhưng mock data vẫn tồn tại trong `frontend/src/data/mockData.ts`.
- **API/Networking**: dev server proxy `/api` tới `http://localhost:8080` (`frontend/vite.config.ts`). Axios client nằm ở `frontend/src/api/client.ts`; `authApi.ts` gọi `/auth/login` nhưng backend chưa cung cấp endpoint tương ứng.
- **Database**: `database/hotel-management.sql` tạo các bảng `tblHotel`, `tblRoom`, `tblBooking`, `tblBookedRoom`, `tblUsedService`, `tblBill`, `tblUser`, `tblClient`, `tblService`. Các trường money là `FLOAT` nên có rủi ro mất độ chính xác.

## 3. PDR - đánh giá sơ bộ

### 3.1 Mục tiêu và thực trạng
- Kết nối frontend/back đang lệ thuộc vào dịch vụ `GET /api/rooms` và `POST /api/bookings` được backend cung cấp. Tất cả thao tác còn lại (xem danh sách booking, cập nhật trạng thái, CRUD phòng) là nhu cầu frontend nhưng chưa có API.
- Cấu hình MySQL (`application.yaml`) hiện hardcode `url/username/password`; cần tách sang env/secrets để tránh lộ thông tin.
- Chưa có authentication/authorization trung tâm: login page mới chỉ là UI, không có route guard hay context global.

### 3.2 Nhận diện rủi ro & điểm chưa hoàn thiện
1. **Mất đồng bộ contract**: frontend gọi nhiều endpoint REST không tồn tại (`GET /api/bookings`, `GET|PUT|DELETE /api/rooms/:id`, `PUT /api/bookings/:id`). Backend vẫn cần bổ sung các outbound adapter tương ứng.
2. **Authentication**: backend không có `@Controller` cho `/auth` nên giao diện login chưa kiểm tra hoặc lưu token. Hiện tại chưa có state chia sẻ hoặc bảo vệ route `AdminLayout`.
3. **Dữ liệu nhạy cảm**: `application.yaml` chứa mật khẩu rõ ràng, cần chuyển sang biến môi trường trước khi deploy.
4. **Precision tài chính**: Model DB dùng `FLOAT` cho `price`, `discount`, `paymentAmount` (tất cả bảng `tbl*` liên quan). Cần kiểm tra ảnh hưởng khi xử lý tiền tệ (nên dùng DECIMAL nếu cần chính xác).
5. **Mock data không gỡ**: `USE_MOCK` vẫn ở mức `false` nhưng các hook giữ mã mock; cần xác định trạng thái chuyển tiếp để tránh gọi dữ liệu giả nếu backend chưa sẵn sàng.

### 3.3 Gợi ý bước tiếp theo
- Ưu tiên mở rộng API backend để bao phủ các endpoint frontend đã gọi, hoặc cập nhật frontend để chỉ dùng API hiện có.
- Thêm layer auth/guard (JWT/session) và đồng bộ với `authApi.ts` (tách khỏi API client chung).
- Di chuyển cấu hình DB ra `application.yaml` qua secrets/`@ConfigurationProperties` và bổ sung doc so sánh `dev` vs `prod`.
- Làm rõ trạng thái mock data: xác định `USE_MOCK` nên bị xoá hoặc có flag env, để developer không bị nhầm.

## 4. Tài liệu tham khảo nhanh
| Nội dung | File tham chiếu |
| --- | --- |
| Backend entrypoint | `backend/src/main/java/com/hotel/backend/BackendApplication.java` |
| View controllers | `backend/src/main/java/com/hotel/backend/adapter/in/web/*.java` |
| Frontend routes/layout | `frontend/src/App.tsx`, `frontend/src/layouts/AdminLayout.tsx` |
| Hooks gọi API | `frontend/src/features/rooms/hooks/useRooms.ts`, `frontend/src/features/bookings/hooks/useBookings.ts` |
| Database schema | `database/hotel-management.sql` |
| Dev proxy | `frontend/vite.config.ts` |
| CI build Docker | `.github/workflows/build-backend.yaml` |
```

## File: docs/system-architecture.md
```markdown
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
```

## File: plans/reports/brainstorm-2026-03-26-backend-refactor.md
```markdown
# Backend completion + refactor brainstorm

## Problem
- Frontend đã đi xa hơn backend: cần auth, rooms CRUD tối thiểu, bookings list/update, nhưng backend mới có `GET /api/rooms` và `POST /api/bookings`.
- Kiến trúc backend đang đi theo hexagonal/ports-adapters, nhưng mới là skeleton. Vấn đề lớn nhất không phải controller thiếu, mà là contract + persistence model đang lệch DB thật.
- Nếu làm thiếu thứ tự, team sẽ refactor 2 lần: lần 1 để chạy được, lần 2 để sửa mismatch contract/schema.

## Hard truths
- Backend hiện tại chưa phải "gần xong". Nó mới đúng hướng kiến trúc, chưa đủ scope nghiệp vụ để nuôi frontend hiện tại.
- DB schema thật và JPA/domain model đang lệch. Nếu không chốt source of truth trước, mọi phase sau đều có rủi ro rework.
- Auth chưa tồn tại, nhưng frontend đã có guard/session shell. Nghĩa là integration đang bị mock che bớt.
- Hardcoded DB credentials là blocker thật, không phải cleanup phụ.

## Approaches considered

### Option A - Finish backend on current DB schema (Recommended)
- Ý tưởng: giữ `database/hotel-management.sql` làm source of truth, refactor entity/repository/service/API để bám schema này.
- Pros:
  - scope nhỏ nhất
  - ít đổi infra/data nhất
  - unblock frontend nhanh nhất
  - đúng YAGNI/KISS
- Cons:
  - domain model có thể không đẹp hoàn hảo
  - phải chấp nhận vài naming awkward từ schema cũ

### Option B - Redesign DB to match current backend code
- Ý tưởng: giữ model code hiện tại, viết migration/schema mới cho rooms/bookings/room_types/auth.
- Pros:
  - kiến trúc sạch hơn
  - model đẹp hơn về lâu dài
- Cons:
  - scope nở mạnh
  - đụng migration/data/env nhiều hơn
  - rất dễ trễ, không hợp nếu mục tiêu là hoàn tất backend cho frontend đang có

### Option C - Patch controllers only, postpone refactor
- Ý tưởng: thêm nhanh endpoint thiếu, ít đụng layer dưới.
- Pros:
  - nhanh nhất trong 1-2 ngày đầu
- Cons:
  - technical debt tăng mạnh
  - phá kiến trúc đang có
  - gần như chắc phải làm lại khi auth/booking rules phức tạp hơn

## Recommended decision
- Chọn **Option A**.
- Lý do: practical nhất, ít rework nhất, vẫn giữ được hexagonal architecture nhưng không over-engineer.
- Nguyên tắc: chốt contract trước, sửa persistence second, mở rộng API third, auth fourth, frontend integration fifth.

## Proposed phases

### Phase 0 - Contract freeze
- Chốt DTO/API cho `Room`, `Booking`, `Auth`.
- Chốt enum status giữa FE/BE.
- Chốt booking create payload: dùng `guestName/phoneNumber/email` hay `userId`.
- Chốt source of truth persistence: schema thật hiện tại.

### Phase 1 - Persistence alignment
- Refactor JPA entities/repositories/mappers để khớp schema thật.
- Rà lại mapping room/booking/user/client.
- Bỏ hardcoded datasource credentials sang env.
- Thêm test tối thiểu cho repository/service quan trọng.

### Phase 2 - Rooms API completion
- `GET /api/rooms`
- `GET /api/rooms/{id}`
- `POST /api/rooms`
- `PUT /api/rooms/{id}`
- Tạm chưa cần `DELETE` thật nếu nghiệp vụ chưa rõ; archive/disable thường an toàn hơn.

### Phase 3 - Bookings API completion
- `GET /api/bookings`
- `GET /api/bookings/{id}`
- `POST /api/bookings`
- `PUT/PATCH /api/bookings/{id}` hoặc `/api/bookings/{id}/status`
- Validate ngày nhận/trả, trạng thái phòng, rule tránh overbooking tối thiểu.

### Phase 4 - Auth minimal
- `POST /api/auth/login`
- current-user endpoint nếu cần
- password hash + JWT/session tối thiểu
- bảo vệ `/api/**`
- chưa làm RBAC phức tạp nếu chưa có matrix role rõ ràng

### Phase 5 - Frontend integration cleanup
- bỏ mock fallback mặc định
- dùng API thật qua `apiClient`
- đồng bộ error contract
- dọn các adapter tạm thời `type` vs `roomType`, `userId` vs guest fields

### Phase 6 - Hardening
- integration tests cho login -> rooms -> create booking -> update booking
- CI verify test/lint/build trước docker push
- cập nhật docs theo trạng thái thật

## Suggested refactor rules
- Giữ controller mỏng. Không nhét thêm business logic vào web layer.
- Mọi branching nghiệp vụ booking nằm ở use case/service.
- Mapper web tách riêng khỏi mapper persistence.
- Nếu có mismatch field name, normalize tại adapter boundary, đừng rải khắp app.
- Không nuôi song song 2 contract nếu không bắt buộc.

## Risks
- **Highest**: FE/BE contract chưa chốt, đặc biệt create booking và room/booking status.
- **High**: DB schema thật có thể không support model frontend mong muốn, nhất là guest/client mapping.
- **Medium**: auth scope nở quá nhanh nếu cố làm refresh token/RBAC sớm.
- **Medium**: frontend dev fallback che mất integration bugs.

## Success criteria
- Frontend chạy không cần mock mặc định.
- Backend expose đủ endpoint frontend thật sự dùng.
- Login thật hoạt động.
- Rooms + bookings flow end-to-end chạy trên DB thật.
- Không còn secret hardcode.
- Build/test backend có thể chạy ổn trong CI.

## Concrete next steps
1. Chốt contract cho create booking và enum status.
2. Audit schema DB vs entity hiện tại, lập bảng mismatch.
3. Tách backlog thành 3 nhánh: persistence, rooms API, bookings API.
4. Sau đó mới làm auth minimal.

## Recommendation summary
- Đừng cố "làm hết backend" một lúc.
- Làm theo vertical slices nhỏ nhưng theo đúng thứ tự: contract -> persistence -> rooms -> bookings -> auth -> integration.
- Nếu muốn nhanh và ít đau nhất, đừng redesign DB trong vòng này.
```

## File: .github/workflows/build-backend.yaml
```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ "main" ]

jobs:
  build-images:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    env:
      REGISTRY: ghcr.io
      BACKEND_IMAGE: ghcr.io/${{ github.repository_owner }}/hotel-backend
      FRONTEND_IMAGE: ghcr.io/${{ github.repository_owner }}/hotel-frontend

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u "${{ github.actor }}" --password-stdin

      # -----------------------
      # Build backend image
      # -----------------------
      - name: Build backend image
        run: |
          docker build \
            -t $BACKEND_IMAGE:latest \
            -t $BACKEND_IMAGE:${{ github.sha }} \
            ./backend

      - name: Push backend image
        run: |
          docker push $BACKEND_IMAGE:latest
          docker push $BACKEND_IMAGE:${{ github.sha }}

      # -----------------------
      # Build frontend image
      # -----------------------
      - name: Build frontend image
        run: |
          docker build \
            -t $FRONTEND_IMAGE:latest \
            -t $FRONTEND_IMAGE:${{ github.sha }} \
            ./frontend

      - name: Push frontend image
        run: |
          docker push $FRONTEND_IMAGE:latest
          docker push $FRONTEND_IMAGE:${{ github.sha }}
```

## File: backend/.gitattributes
```
/mvnw text eol=lf
*.cmd text eol=crlf
```

## File: backend/.gitignore
```
HELP.md
target/
.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/
```

## File: backend/.mvn/wrapper/maven-wrapper.properties
```
wrapperVersion=3.3.4
distributionType=only-script
distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.12/apache-maven-3.9.12-bin.zip
```

## File: backend/Dockerfile
```
# syntax=docker/dockerfile:1
FROM maven:3.9.12-eclipse-temurin-21-noble AS base
WORKDIR /backend
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q clean package -DskipTests

FROM eclipse-temurin:21-jre-noble AS runtime
WORKDIR /backend
COPY --from=base /backend/target/*.jar /tmp/
RUN mv "$(ls /tmp/*.jar | grep -v '^/tmp/original-' | head -n 1)" /backend/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## File: backend/mvnw
```
#!/bin/sh
# ----------------------------------------------------------------------------
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
# ----------------------------------------------------------------------------

# ----------------------------------------------------------------------------
# Apache Maven Wrapper startup batch script, version 3.3.4
#
# Optional ENV vars
# -----------------
#   JAVA_HOME - location of a JDK home dir, required when download maven via java source
#   MVNW_REPOURL - repo url base for downloading maven distribution
#   MVNW_USERNAME/MVNW_PASSWORD - user and password for downloading maven
#   MVNW_VERBOSE - true: enable verbose log; debug: trace the mvnw script; others: silence the output
# ----------------------------------------------------------------------------

set -euf
[ "${MVNW_VERBOSE-}" != debug ] || set -x

# OS specific support.
native_path() { printf %s\\n "$1"; }
case "$(uname)" in
CYGWIN* | MINGW*)
  [ -z "${JAVA_HOME-}" ] || JAVA_HOME="$(cygpath --unix "$JAVA_HOME")"
  native_path() { cygpath --path --windows "$1"; }
  ;;
esac

# set JAVACMD and JAVACCMD
set_java_home() {
  # For Cygwin and MinGW, ensure paths are in Unix format before anything is touched
  if [ -n "${JAVA_HOME-}" ]; then
    if [ -x "$JAVA_HOME/jre/sh/java" ]; then
      # IBM's JDK on AIX uses strange locations for the executables
      JAVACMD="$JAVA_HOME/jre/sh/java"
      JAVACCMD="$JAVA_HOME/jre/sh/javac"
    else
      JAVACMD="$JAVA_HOME/bin/java"
      JAVACCMD="$JAVA_HOME/bin/javac"

      if [ ! -x "$JAVACMD" ] || [ ! -x "$JAVACCMD" ]; then
        echo "The JAVA_HOME environment variable is not defined correctly, so mvnw cannot run." >&2
        echo "JAVA_HOME is set to \"$JAVA_HOME\", but \"\$JAVA_HOME/bin/java\" or \"\$JAVA_HOME/bin/javac\" does not exist." >&2
        return 1
      fi
    fi
  else
    JAVACMD="$(
      'set' +e
      'unset' -f command 2>/dev/null
      'command' -v java
    )" || :
    JAVACCMD="$(
      'set' +e
      'unset' -f command 2>/dev/null
      'command' -v javac
    )" || :

    if [ ! -x "${JAVACMD-}" ] || [ ! -x "${JAVACCMD-}" ]; then
      echo "The java/javac command does not exist in PATH nor is JAVA_HOME set, so mvnw cannot run." >&2
      return 1
    fi
  fi
}

# hash string like Java String::hashCode
hash_string() {
  str="${1:-}" h=0
  while [ -n "$str" ]; do
    char="${str%"${str#?}"}"
    h=$(((h * 31 + $(LC_CTYPE=C printf %d "'$char")) % 4294967296))
    str="${str#?}"
  done
  printf %x\\n $h
}

verbose() { :; }
[ "${MVNW_VERBOSE-}" != true ] || verbose() { printf %s\\n "${1-}"; }

die() {
  printf %s\\n "$1" >&2
  exit 1
}

trim() {
  # MWRAPPER-139:
  #   Trims trailing and leading whitespace, carriage returns, tabs, and linefeeds.
  #   Needed for removing poorly interpreted newline sequences when running in more
  #   exotic environments such as mingw bash on Windows.
  printf "%s" "${1}" | tr -d '[:space:]'
}

scriptDir="$(dirname "$0")"
scriptName="$(basename "$0")"

# parse distributionUrl and optional distributionSha256Sum, requires .mvn/wrapper/maven-wrapper.properties
while IFS="=" read -r key value; do
  case "${key-}" in
  distributionUrl) distributionUrl=$(trim "${value-}") ;;
  distributionSha256Sum) distributionSha256Sum=$(trim "${value-}") ;;
  esac
done <"$scriptDir/.mvn/wrapper/maven-wrapper.properties"
[ -n "${distributionUrl-}" ] || die "cannot read distributionUrl property in $scriptDir/.mvn/wrapper/maven-wrapper.properties"

case "${distributionUrl##*/}" in
maven-mvnd-*bin.*)
  MVN_CMD=mvnd.sh _MVNW_REPO_PATTERN=/maven/mvnd/
  case "${PROCESSOR_ARCHITECTURE-}${PROCESSOR_ARCHITEW6432-}:$(uname -a)" in
  *AMD64:CYGWIN* | *AMD64:MINGW*) distributionPlatform=windows-amd64 ;;
  :Darwin*x86_64) distributionPlatform=darwin-amd64 ;;
  :Darwin*arm64) distributionPlatform=darwin-aarch64 ;;
  :Linux*x86_64*) distributionPlatform=linux-amd64 ;;
  *)
    echo "Cannot detect native platform for mvnd on $(uname)-$(uname -m), use pure java version" >&2
    distributionPlatform=linux-amd64
    ;;
  esac
  distributionUrl="${distributionUrl%-bin.*}-$distributionPlatform.zip"
  ;;
maven-mvnd-*) MVN_CMD=mvnd.sh _MVNW_REPO_PATTERN=/maven/mvnd/ ;;
*) MVN_CMD="mvn${scriptName#mvnw}" _MVNW_REPO_PATTERN=/org/apache/maven/ ;;
esac

# apply MVNW_REPOURL and calculate MAVEN_HOME
# maven home pattern: ~/.m2/wrapper/dists/{apache-maven-<version>,maven-mvnd-<version>-<platform>}/<hash>
[ -z "${MVNW_REPOURL-}" ] || distributionUrl="$MVNW_REPOURL$_MVNW_REPO_PATTERN${distributionUrl#*"$_MVNW_REPO_PATTERN"}"
distributionUrlName="${distributionUrl##*/}"
distributionUrlNameMain="${distributionUrlName%.*}"
distributionUrlNameMain="${distributionUrlNameMain%-bin}"
MAVEN_USER_HOME="${MAVEN_USER_HOME:-${HOME}/.m2}"
MAVEN_HOME="${MAVEN_USER_HOME}/wrapper/dists/${distributionUrlNameMain-}/$(hash_string "$distributionUrl")"

exec_maven() {
  unset MVNW_VERBOSE MVNW_USERNAME MVNW_PASSWORD MVNW_REPOURL || :
  exec "$MAVEN_HOME/bin/$MVN_CMD" "$@" || die "cannot exec $MAVEN_HOME/bin/$MVN_CMD"
}

if [ -d "$MAVEN_HOME" ]; then
  verbose "found existing MAVEN_HOME at $MAVEN_HOME"
  exec_maven "$@"
fi

case "${distributionUrl-}" in
*?-bin.zip | *?maven-mvnd-?*-?*.zip) ;;
*) die "distributionUrl is not valid, must match *-bin.zip or maven-mvnd-*.zip, but found '${distributionUrl-}'" ;;
esac

# prepare tmp dir
if TMP_DOWNLOAD_DIR="$(mktemp -d)" && [ -d "$TMP_DOWNLOAD_DIR" ]; then
  clean() { rm -rf -- "$TMP_DOWNLOAD_DIR"; }
  trap clean HUP INT TERM EXIT
else
  die "cannot create temp dir"
fi

mkdir -p -- "${MAVEN_HOME%/*}"

# Download and Install Apache Maven
verbose "Couldn't find MAVEN_HOME, downloading and installing it ..."
verbose "Downloading from: $distributionUrl"
verbose "Downloading to: $TMP_DOWNLOAD_DIR/$distributionUrlName"

# select .zip or .tar.gz
if ! command -v unzip >/dev/null; then
  distributionUrl="${distributionUrl%.zip}.tar.gz"
  distributionUrlName="${distributionUrl##*/}"
fi

# verbose opt
__MVNW_QUIET_WGET=--quiet __MVNW_QUIET_CURL=--silent __MVNW_QUIET_UNZIP=-q __MVNW_QUIET_TAR=''
[ "${MVNW_VERBOSE-}" != true ] || __MVNW_QUIET_WGET='' __MVNW_QUIET_CURL='' __MVNW_QUIET_UNZIP='' __MVNW_QUIET_TAR=v

# normalize http auth
case "${MVNW_PASSWORD:+has-password}" in
'') MVNW_USERNAME='' MVNW_PASSWORD='' ;;
has-password) [ -n "${MVNW_USERNAME-}" ] || MVNW_USERNAME='' MVNW_PASSWORD='' ;;
esac

if [ -z "${MVNW_USERNAME-}" ] && command -v wget >/dev/null; then
  verbose "Found wget ... using wget"
  wget ${__MVNW_QUIET_WGET:+"$__MVNW_QUIET_WGET"} "$distributionUrl" -O "$TMP_DOWNLOAD_DIR/$distributionUrlName" || die "wget: Failed to fetch $distributionUrl"
elif [ -z "${MVNW_USERNAME-}" ] && command -v curl >/dev/null; then
  verbose "Found curl ... using curl"
  curl ${__MVNW_QUIET_CURL:+"$__MVNW_QUIET_CURL"} -f -L -o "$TMP_DOWNLOAD_DIR/$distributionUrlName" "$distributionUrl" || die "curl: Failed to fetch $distributionUrl"
elif set_java_home; then
  verbose "Falling back to use Java to download"
  javaSource="$TMP_DOWNLOAD_DIR/Downloader.java"
  targetZip="$TMP_DOWNLOAD_DIR/$distributionUrlName"
  cat >"$javaSource" <<-END
	public class Downloader extends java.net.Authenticator
	{
	  protected java.net.PasswordAuthentication getPasswordAuthentication()
	  {
	    return new java.net.PasswordAuthentication( System.getenv( "MVNW_USERNAME" ), System.getenv( "MVNW_PASSWORD" ).toCharArray() );
	  }
	  public static void main( String[] args ) throws Exception
	  {
	    setDefault( new Downloader() );
	    java.nio.file.Files.copy( java.net.URI.create( args[0] ).toURL().openStream(), java.nio.file.Paths.get( args[1] ).toAbsolutePath().normalize() );
	  }
	}
	END
  # For Cygwin/MinGW, switch paths to Windows format before running javac and java
  verbose " - Compiling Downloader.java ..."
  "$(native_path "$JAVACCMD")" "$(native_path "$javaSource")" || die "Failed to compile Downloader.java"
  verbose " - Running Downloader.java ..."
  "$(native_path "$JAVACMD")" -cp "$(native_path "$TMP_DOWNLOAD_DIR")" Downloader "$distributionUrl" "$(native_path "$targetZip")"
fi

# If specified, validate the SHA-256 sum of the Maven distribution zip file
if [ -n "${distributionSha256Sum-}" ]; then
  distributionSha256Result=false
  if [ "$MVN_CMD" = mvnd.sh ]; then
    echo "Checksum validation is not supported for maven-mvnd." >&2
    echo "Please disable validation by removing 'distributionSha256Sum' from your maven-wrapper.properties." >&2
    exit 1
  elif command -v sha256sum >/dev/null; then
    if echo "$distributionSha256Sum  $TMP_DOWNLOAD_DIR/$distributionUrlName" | sha256sum -c - >/dev/null 2>&1; then
      distributionSha256Result=true
    fi
  elif command -v shasum >/dev/null; then
    if echo "$distributionSha256Sum  $TMP_DOWNLOAD_DIR/$distributionUrlName" | shasum -a 256 -c >/dev/null 2>&1; then
      distributionSha256Result=true
    fi
  else
    echo "Checksum validation was requested but neither 'sha256sum' or 'shasum' are available." >&2
    echo "Please install either command, or disable validation by removing 'distributionSha256Sum' from your maven-wrapper.properties." >&2
    exit 1
  fi
  if [ $distributionSha256Result = false ]; then
    echo "Error: Failed to validate Maven distribution SHA-256, your Maven distribution might be compromised." >&2
    echo "If you updated your Maven version, you need to update the specified distributionSha256Sum property." >&2
    exit 1
  fi
fi

# unzip and move
if command -v unzip >/dev/null; then
  unzip ${__MVNW_QUIET_UNZIP:+"$__MVNW_QUIET_UNZIP"} "$TMP_DOWNLOAD_DIR/$distributionUrlName" -d "$TMP_DOWNLOAD_DIR" || die "failed to unzip"
else
  tar xzf${__MVNW_QUIET_TAR:+"$__MVNW_QUIET_TAR"} "$TMP_DOWNLOAD_DIR/$distributionUrlName" -C "$TMP_DOWNLOAD_DIR" || die "failed to untar"
fi

# Find the actual extracted directory name (handles snapshots where filename != directory name)
actualDistributionDir=""

# First try the expected directory name (for regular distributions)
if [ -d "$TMP_DOWNLOAD_DIR/$distributionUrlNameMain" ]; then
  if [ -f "$TMP_DOWNLOAD_DIR/$distributionUrlNameMain/bin/$MVN_CMD" ]; then
    actualDistributionDir="$distributionUrlNameMain"
  fi
fi

# If not found, search for any directory with the Maven executable (for snapshots)
if [ -z "$actualDistributionDir" ]; then
  # enable globbing to iterate over items
  set +f
  for dir in "$TMP_DOWNLOAD_DIR"/*; do
    if [ -d "$dir" ]; then
      if [ -f "$dir/bin/$MVN_CMD" ]; then
        actualDistributionDir="$(basename "$dir")"
        break
      fi
    fi
  done
  set -f
fi

if [ -z "$actualDistributionDir" ]; then
  verbose "Contents of $TMP_DOWNLOAD_DIR:"
  verbose "$(ls -la "$TMP_DOWNLOAD_DIR")"
  die "Could not find Maven distribution directory in extracted archive"
fi

verbose "Found extracted Maven distribution directory: $actualDistributionDir"
printf %s\\n "$distributionUrl" >"$TMP_DOWNLOAD_DIR/$actualDistributionDir/mvnw.url"
mv -- "$TMP_DOWNLOAD_DIR/$actualDistributionDir" "$MAVEN_HOME" || [ -d "$MAVEN_HOME" ] || die "fail to move MAVEN_HOME"

clean || :
exec_maven "$@"
```

## File: backend/mvnw.cmd
```batch
<# : batch portion
@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.3.4
@REM
@REM Optional ENV vars
@REM   MVNW_REPOURL - repo url base for downloading maven distribution
@REM   MVNW_USERNAME/MVNW_PASSWORD - user and password for downloading maven
@REM   MVNW_VERBOSE - true: enable verbose log; others: silence the output
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET __MVNW_CMD__=
@SET __MVNW_ERROR__=
@SET __MVNW_PSMODULEP_SAVE=%PSModulePath%
@SET PSModulePath=
@FOR /F "usebackq tokens=1* delims==" %%A IN (`powershell -noprofile "& {$scriptDir='%~dp0'; $script='%__MVNW_ARG0_NAME__%'; icm -ScriptBlock ([Scriptblock]::Create((Get-Content -Raw '%~f0'))) -NoNewScope}"`) DO @(
  IF "%%A"=="MVN_CMD" (set __MVNW_CMD__=%%B) ELSE IF "%%B"=="" (echo %%A) ELSE (echo %%A=%%B)
)
@SET PSModulePath=%__MVNW_PSMODULEP_SAVE%
@SET __MVNW_PSMODULEP_SAVE=
@SET __MVNW_ARG0_NAME__=
@SET MVNW_USERNAME=
@SET MVNW_PASSWORD=
@IF NOT "%__MVNW_CMD__%"=="" ("%__MVNW_CMD__%" %*)
@echo Cannot start maven from wrapper >&2 && exit /b 1
@GOTO :EOF
: end batch / begin powershell #>

$ErrorActionPreference = "Stop"
if ($env:MVNW_VERBOSE -eq "true") {
  $VerbosePreference = "Continue"
}

# calculate distributionUrl, requires .mvn/wrapper/maven-wrapper.properties
$distributionUrl = (Get-Content -Raw "$scriptDir/.mvn/wrapper/maven-wrapper.properties" | ConvertFrom-StringData).distributionUrl
if (!$distributionUrl) {
  Write-Error "cannot read distributionUrl property in $scriptDir/.mvn/wrapper/maven-wrapper.properties"
}

switch -wildcard -casesensitive ( $($distributionUrl -replace '^.*/','') ) {
  "maven-mvnd-*" {
    $USE_MVND = $true
    $distributionUrl = $distributionUrl -replace '-bin\.[^.]*$',"-windows-amd64.zip"
    $MVN_CMD = "mvnd.cmd"
    break
  }
  default {
    $USE_MVND = $false
    $MVN_CMD = $script -replace '^mvnw','mvn'
    break
  }
}

# apply MVNW_REPOURL and calculate MAVEN_HOME
# maven home pattern: ~/.m2/wrapper/dists/{apache-maven-<version>,maven-mvnd-<version>-<platform>}/<hash>
if ($env:MVNW_REPOURL) {
  $MVNW_REPO_PATTERN = if ($USE_MVND -eq $False) { "/org/apache/maven/" } else { "/maven/mvnd/" }
  $distributionUrl = "$env:MVNW_REPOURL$MVNW_REPO_PATTERN$($distributionUrl -replace "^.*$MVNW_REPO_PATTERN",'')"
}
$distributionUrlName = $distributionUrl -replace '^.*/',''
$distributionUrlNameMain = $distributionUrlName -replace '\.[^.]*$','' -replace '-bin$',''

$MAVEN_M2_PATH = "$HOME/.m2"
if ($env:MAVEN_USER_HOME) {
  $MAVEN_M2_PATH = "$env:MAVEN_USER_HOME"
}

if (-not (Test-Path -Path $MAVEN_M2_PATH)) {
    New-Item -Path $MAVEN_M2_PATH -ItemType Directory | Out-Null
}

$MAVEN_WRAPPER_DISTS = $null
if ((Get-Item $MAVEN_M2_PATH).Target[0] -eq $null) {
  $MAVEN_WRAPPER_DISTS = "$MAVEN_M2_PATH/wrapper/dists"
} else {
  $MAVEN_WRAPPER_DISTS = (Get-Item $MAVEN_M2_PATH).Target[0] + "/wrapper/dists"
}

$MAVEN_HOME_PARENT = "$MAVEN_WRAPPER_DISTS/$distributionUrlNameMain"
$MAVEN_HOME_NAME = ([System.Security.Cryptography.SHA256]::Create().ComputeHash([byte[]][char[]]$distributionUrl) | ForEach-Object {$_.ToString("x2")}) -join ''
$MAVEN_HOME = "$MAVEN_HOME_PARENT/$MAVEN_HOME_NAME"

if (Test-Path -Path "$MAVEN_HOME" -PathType Container) {
  Write-Verbose "found existing MAVEN_HOME at $MAVEN_HOME"
  Write-Output "MVN_CMD=$MAVEN_HOME/bin/$MVN_CMD"
  exit $?
}

if (! $distributionUrlNameMain -or ($distributionUrlName -eq $distributionUrlNameMain)) {
  Write-Error "distributionUrl is not valid, must end with *-bin.zip, but found $distributionUrl"
}

# prepare tmp dir
$TMP_DOWNLOAD_DIR_HOLDER = New-TemporaryFile
$TMP_DOWNLOAD_DIR = New-Item -Itemtype Directory -Path "$TMP_DOWNLOAD_DIR_HOLDER.dir"
$TMP_DOWNLOAD_DIR_HOLDER.Delete() | Out-Null
trap {
  if ($TMP_DOWNLOAD_DIR.Exists) {
    try { Remove-Item $TMP_DOWNLOAD_DIR -Recurse -Force | Out-Null }
    catch { Write-Warning "Cannot remove $TMP_DOWNLOAD_DIR" }
  }
}

New-Item -Itemtype Directory -Path "$MAVEN_HOME_PARENT" -Force | Out-Null

# Download and Install Apache Maven
Write-Verbose "Couldn't find MAVEN_HOME, downloading and installing it ..."
Write-Verbose "Downloading from: $distributionUrl"
Write-Verbose "Downloading to: $TMP_DOWNLOAD_DIR/$distributionUrlName"

$webclient = New-Object System.Net.WebClient
if ($env:MVNW_USERNAME -and $env:MVNW_PASSWORD) {
  $webclient.Credentials = New-Object System.Net.NetworkCredential($env:MVNW_USERNAME, $env:MVNW_PASSWORD)
}
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$webclient.DownloadFile($distributionUrl, "$TMP_DOWNLOAD_DIR/$distributionUrlName") | Out-Null

# If specified, validate the SHA-256 sum of the Maven distribution zip file
$distributionSha256Sum = (Get-Content -Raw "$scriptDir/.mvn/wrapper/maven-wrapper.properties" | ConvertFrom-StringData).distributionSha256Sum
if ($distributionSha256Sum) {
  if ($USE_MVND) {
    Write-Error "Checksum validation is not supported for maven-mvnd. `nPlease disable validation by removing 'distributionSha256Sum' from your maven-wrapper.properties."
  }
  Import-Module $PSHOME\Modules\Microsoft.PowerShell.Utility -Function Get-FileHash
  if ((Get-FileHash "$TMP_DOWNLOAD_DIR/$distributionUrlName" -Algorithm SHA256).Hash.ToLower() -ne $distributionSha256Sum) {
    Write-Error "Error: Failed to validate Maven distribution SHA-256, your Maven distribution might be compromised. If you updated your Maven version, you need to update the specified distributionSha256Sum property."
  }
}

# unzip and move
Expand-Archive "$TMP_DOWNLOAD_DIR/$distributionUrlName" -DestinationPath "$TMP_DOWNLOAD_DIR" | Out-Null

# Find the actual extracted directory name (handles snapshots where filename != directory name)
$actualDistributionDir = ""

# First try the expected directory name (for regular distributions)
$expectedPath = Join-Path "$TMP_DOWNLOAD_DIR" "$distributionUrlNameMain"
$expectedMvnPath = Join-Path "$expectedPath" "bin/$MVN_CMD"
if ((Test-Path -Path $expectedPath -PathType Container) -and (Test-Path -Path $expectedMvnPath -PathType Leaf)) {
  $actualDistributionDir = $distributionUrlNameMain
}

# If not found, search for any directory with the Maven executable (for snapshots)
if (!$actualDistributionDir) {
  Get-ChildItem -Path "$TMP_DOWNLOAD_DIR" -Directory | ForEach-Object {
    $testPath = Join-Path $_.FullName "bin/$MVN_CMD"
    if (Test-Path -Path $testPath -PathType Leaf) {
      $actualDistributionDir = $_.Name
    }
  }
}

if (!$actualDistributionDir) {
  Write-Error "Could not find Maven distribution directory in extracted archive"
}

Write-Verbose "Found extracted Maven distribution directory: $actualDistributionDir"
Rename-Item -Path "$TMP_DOWNLOAD_DIR/$actualDistributionDir" -NewName $MAVEN_HOME_NAME | Out-Null
try {
  Move-Item -Path "$TMP_DOWNLOAD_DIR/$MAVEN_HOME_NAME" -Destination $MAVEN_HOME_PARENT | Out-Null
} catch {
  if (! (Test-Path -Path "$MAVEN_HOME" -PathType Container)) {
    Write-Error "fail to move MAVEN_HOME"
  }
} finally {
  try { Remove-Item $TMP_DOWNLOAD_DIR -Recurse -Force | Out-Null }
  catch { Write-Warning "Cannot remove $TMP_DOWNLOAD_DIR" }
}

Write-Output "MVN_CMD=$MAVEN_HOME/bin/$MVN_CMD"
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/BookingController.java
```java
package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final LoadRoomPort loadRoomPort;

    public BookingController(CreateBookingUseCase createBookingUseCase, LoadRoomPort loadRoomPort) {
        this.createBookingUseCase = createBookingUseCase;
        this.loadRoomPort = loadRoomPort;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req) {
        Booking created = createBookingUseCase.create(new CreateBookingCommand(
                req.userId(), req.roomId(), req.checkIn(), req.checkOut()
        ));

        Room room = loadRoomPort.loadRoomById(req.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return BookingWebMapper.toResponse(created, room);
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/BookingWebMapper.java
```java
package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.RoomShortResponse;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;

public final class BookingWebMapper {
    private BookingWebMapper() {}

    public static BookingResponse toResponse(Booking booking, Room room) {
        return new BookingResponse(
                booking.id(),
                booking.userId(),
                new RoomShortResponse(room.id(), room.roomNumber()),
                booking.checkIn(),
                booking.checkOut(),
                booking.status().name()
        );
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/ApiErrorResponse.java
```java
package com.hotel.backend.adapter.in.web.dto;

public record ApiErrorResponse(
        String error,
        String message
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/BookingResponse.java
```java
package com.hotel.backend.adapter.in.web.dto;

import java.time.LocalDate;

public record BookingResponse(
        Long id,
        Long userId,
        RoomShortResponse room,
        LocalDate checkIn,
        LocalDate checkOut,
        String status
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/CreateBookingRequest.java
```java
package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateBookingRequest(
        @NotNull Long userId,
        @NotNull Long roomId,
        @NotNull LocalDate checkIn,
        @NotNull LocalDate checkOut
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomResponse.java
```java
package com.hotel.backend.adapter.in.web.dto;

public record RoomResponse(
        Long id,
        String roomNumber,
        String status,
        RoomTypeResponse type
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomShortResponse.java
```java
package com.hotel.backend.adapter.in.web.dto;

public record RoomShortResponse(
        Long id,
        String roomNumber
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomTypeResponse.java
```java
package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record RoomTypeResponse(
        Long id,
        String name,
        BigDecimal price,
        Integer capacity
) {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/GlobalExceptionHandler.java
```java
package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse badRequest(IllegalArgumentException ex) {
        return new ApiErrorResponse("BAD_REQUEST", ex.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse conflict(IllegalStateException ex) {
        // dùng cho: Room not found / Room not available (demo đơn giản)
        return new ApiErrorResponse("CONFLICT", ex.getMessage());
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/RoomController.java
```java
package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final GetRoomsUseCase getRoomsUseCase;

    public RoomController(GetRoomsUseCase getRoomsUseCase) {
        this.getRoomsUseCase = getRoomsUseCase;
    }

    @GetMapping
    public List<RoomResponse> getRooms(@RequestParam Optional<RoomStatus> status) {
        return getRoomsUseCase.getRooms(status).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/in/web/RoomWebMapper.java
```java
package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.adapter.in.web.dto.RoomTypeResponse;
import com.hotel.backend.application.domain.model.Room;

public final class RoomWebMapper {
    private RoomWebMapper() {}

    public static RoomResponse toResponse(Room r) {
        return new RoomResponse(
                r.id(),
                r.roomNumber(),
                r.status().name(),
                new RoomTypeResponse(
                        r.type().id(),
                        r.type().name(),
                        r.type().price(),
                        r.type().capacity()
                )
        );
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingJpaEntity.java
```java
package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class BookingJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "user_id")
    public Long userId;

    @Column(name = "room_id")
    public Long roomId;

    @Column(name = "check_in")
    public LocalDate checkIn;

    @Column(name = "check_out")
    public LocalDate checkOut;

    @Column(name = "status")
    public String status;
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingMapper.java
```java
package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

public final class BookingMapper {
    private BookingMapper() {}

    public static Booking toDomain(BookingJpaEntity e) {
        return new Booking(
                e.id,
                e.userId,
                e.roomId,
                e.checkIn,
                e.checkOut,
                BookingStatus.valueOf(e.status)
        );
    }

    public static BookingJpaEntity toEntity(Booking b) {
        BookingJpaEntity e = new BookingJpaEntity();
        e.id = b.id();
        e.userId = b.userId();
        e.roomId = b.roomId();
        e.checkIn = b.checkIn();
        e.checkOut = b.checkOut();
        e.status = b.status().name();
        return e;
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingPersistenceAdapter.java
```java
package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.port.out.SaveBookingPort;

public class BookingPersistenceAdapter implements SaveBookingPort {

    private final SpringDataBookingRepository bookingRepo;

    public BookingPersistenceAdapter(SpringDataBookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @Override
    public Booking save(Booking booking) {
        BookingJpaEntity saved = bookingRepo.save(BookingMapper.toEntity(booking));
        return BookingMapper.toDomain(saved);
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomJpaEntity.java
```java
package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class RoomJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "room_number")
    public String roomNumber;

    @Column(name = "status")
    public String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id")
    public RoomTypeJpaEntity roomType;
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomMapper.java
```java
package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;

public final class RoomMapper {
    private RoomMapper() {}

    public static Room toDomain(RoomJpaEntity e) {
        return new Room(
                e.id,
                e.roomNumber,
                RoomStatus.valueOf(e.status),
                new RoomType(
                        e.roomType.id,
                        e.roomType.name,
                        e.roomType.price,
                        e.roomType.capacity
                )
        );
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomPersistenceAdapter.java
```java
package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;

import java.util.List;
import java.util.Optional;

public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort {

    private final SpringDataRoomRepository roomRepo;

    public RoomPersistenceAdapter(SpringDataRoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public List<Room> loadRooms(Optional<RoomStatus> status) {
        List<RoomJpaEntity> entities = status
                .map(s -> roomRepo.findByStatus(s.name()))
                .orElseGet(roomRepo::findAll);

        return entities.stream().map(RoomMapper::toDomain).toList();
    }

    @Override
    public Optional<Room> loadRoomById(Long roomId) {
        return roomRepo.findById(roomId).map(RoomMapper::toDomain);
    }
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomTypeJpaEntity.java
```java
package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "room_types")
public class RoomTypeJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public BigDecimal price;

    public Integer capacity;
}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/SpringDataBookingRepository.java
```java
package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataBookingRepository extends JpaRepository<BookingJpaEntity, Long> {}
```

## File: backend/src/main/java/com/hotel/backend/adapter/out/persistence/SpringDataRoomRepository.java
```java
package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataRoomRepository extends JpaRepository<RoomJpaEntity, Long> {
    List<RoomJpaEntity> findByStatus(String status);
}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/model/Booking.java
```java
package com.hotel.backend.application.domain.model;

import java.time.LocalDate;

public record Booking(
        Long id,
        Long userId,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status
) {}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/model/BookingStatus.java
```java
package com.hotel.backend.application.domain.model;

public enum BookingStatus {
    PENDING, CONFIRMED, CANCELLED
}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/model/Room.java
```java
package com.hotel.backend.application.domain.model;

public record Room(
        Long id,
        String roomNumber,
        RoomStatus status,
        RoomType type
) {}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/model/RoomStatus.java
```java
package com.hotel.backend.application.domain.model;

public enum RoomStatus {
    AVAILABLE, BOOKED, MAINTENANCE
}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/model/RoomType.java
```java
package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record RoomType(
        Long id,
        String name,
        BigDecimal price,
        Integer capacity
) {}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/service/CreateBookingService.java
```java
package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;

public class CreateBookingService implements CreateBookingUseCase {

    private final LoadRoomPort loadRoomPort;
    private final SaveBookingPort saveBookingPort;

    public CreateBookingService(LoadRoomPort loadRoomPort, SaveBookingPort saveBookingPort) {
        this.loadRoomPort = loadRoomPort;
        this.saveBookingPort = saveBookingPort;
    }

    @Override
    public Booking create(CreateBookingCommand cmd) {
        if (cmd.checkIn() == null || cmd.checkOut() == null || !cmd.checkIn().isBefore(cmd.checkOut())) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        Room room = loadRoomPort.loadRoomById(cmd.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        if (room.status() != RoomStatus.AVAILABLE) {
            throw new IllegalStateException("Room is not available");
        }

        Booking booking = new Booking(
                null,
                cmd.userId(),
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                BookingStatus.PENDING
        );

        return saveBookingPort.save(booking);
    }
}
```

## File: backend/src/main/java/com/hotel/backend/application/domain/service/GetRoomsService.java
```java
package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomsPort;

import java.util.List;
import java.util.Optional;

public class GetRoomsService implements GetRoomsUseCase {

    private final LoadRoomsPort loadRoomsPort;

    public GetRoomsService(LoadRoomsPort loadRoomsPort) {
        this.loadRoomsPort = loadRoomsPort;
    }

    @Override
    public List<Room> getRooms(Optional<RoomStatus> status) {
        return loadRoomsPort.loadRooms(status);
    }
}
```

## File: backend/src/main/java/com/hotel/backend/application/port/in/CreateBookingCommand.java
```java
package com.hotel.backend.application.port.in;

import java.time.LocalDate;

public record CreateBookingCommand(
        Long userId,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut
) {}
```

## File: backend/src/main/java/com/hotel/backend/application/port/in/CreateBookingUseCase.java
```java
package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;

public interface CreateBookingUseCase {
    Booking create(CreateBookingCommand command);
}
```

## File: backend/src/main/java/com/hotel/backend/application/port/in/GetRoomsUseCase.java
```java
package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

import java.util.List;
import java.util.Optional;

public interface GetRoomsUseCase {
    List<Room> getRooms(Optional<RoomStatus> status);
}
```

## File: backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomPort.java
```java
package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;

import java.util.Optional;

public interface LoadRoomPort {
    Optional<Room> loadRoomById(Long roomId);
}
```

## File: backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomsPort.java
```java
package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

import java.util.List;
import java.util.Optional;

public interface LoadRoomsPort {
    List<Room> loadRooms(Optional<RoomStatus> status);
}
```

## File: backend/src/main/java/com/hotel/backend/application/port/out/SaveBookingPort.java
```java
package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;

public interface SaveBookingPort {
    Booking save(Booking booking);
}
```

## File: backend/src/main/java/com/hotel/backend/BackendApplication.java
```java
package com.hotel.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
```

## File: backend/src/main/java/com/hotel/backend/config/BeanConfig.java
```java
package com.hotel.backend.config;

import com.hotel.backend.adapter.out.persistence.BookingPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.RoomPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.application.domain.service.CreateBookingService;
import com.hotel.backend.application.domain.service.GetRoomsService;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public LoadRoomsPort loadRoomsPort(SpringDataRoomRepository repo) {
        return new RoomPersistenceAdapter(repo);
    }

    @Bean
    public LoadRoomPort loadRoomPort(SpringDataRoomRepository repo) {
        return new RoomPersistenceAdapter(repo);
    }

    @Bean
    public SaveBookingPort saveBookingPort(SpringDataBookingRepository repo) {
        return new BookingPersistenceAdapter(repo);
    }

    @Bean
    public GetRoomsUseCase getRoomsUseCase(LoadRoomsPort loadRoomsPort) {
        return new GetRoomsService(loadRoomsPort);
    }

    @Bean
    public CreateBookingUseCase createBookingUseCase(LoadRoomPort loadRoomPort, SaveBookingPort saveBookingPort) {
        return new CreateBookingService(loadRoomPort, saveBookingPort);
    }
}
```

## File: backend/src/test/java/com/hotel/backend/BackendApplicationTests.java
```java
package com.hotel.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

}
```

## File: database/hotel-management.sql
```sql
CREATE DATABASE hotel_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hotel_management;

CREATE TABLE tblHotel (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    starLevel INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE tblUser (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    mail VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE tblClient (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    idCardNumber INT NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    description VARCHAR(255)
);

CREATE TABLE tblService (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE tblRoom (
    ID VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(500),
    hotelID INT NOT NULL,
    FOREIGN KEY (hotelID) REFERENCES tblHotel(ID)
);

CREATE TABLE tblBooking (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    bookingDate DATE NOT NULL,
    discount FLOAT NOT NULL,
    note VARCHAR(500),
    clientID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (clientID) REFERENCES tblClient(ID),
    FOREIGN KEY (userID) REFERENCES tblUser(ID)
);

CREATE TABLE tblBookedRoom (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    discount FLOAT NOT NULL,
    isCheckedIn INT NOT NULL,
    note VARCHAR(500),
    bookingID INT NOT NULL,
    roomID VARCHAR(255) NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES tblBooking(ID),
    FOREIGN KEY (roomID) REFERENCES tblRoom(ID)
);

CREATE TABLE tblUsedService (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    discount FLOAT NOT NULL,
    serviceID INT NOT NULL,
    bookedRoomID INT NOT NULL,
    FOREIGN KEY (serviceID) REFERENCES tblService(ID),
    FOREIGN KEY (bookedRoomID) REFERENCES tblBookedRoom(ID)
);

CREATE TABLE tblBill (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    paymentDate DATE NOT NULL,
    paymentAmount FLOAT NOT NULL,
    paymentType INT NOT NULL,
    note VARCHAR(500),
    bookingID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES tblBooking(ID),
    FOREIGN KEY (userID) REFERENCES tblUser(ID)
);
```

## File: frontend/.dockerignore
```
node_modules
dist
.git
.idea
Dockerfile
```

## File: frontend/.gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: frontend/Dockerfile
```
# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# copy dependency trước để tận dụng cache
COPY package*.json ./

RUN npm ci

# copy source
COPY . .

# build production
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM nginx:alpine

# copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## File: frontend/eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
```

## File: frontend/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hotel Management System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: frontend/postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## File: frontend/public/vite.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFBD4F"></stop><stop offset="100%" stop-color="#FF980E"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
```

## File: frontend/src/api/bookings.ts
```typescript
import { apiClient } from './client'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../types'

export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings')
    return response.data
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`)
    return response.data
  },

  create: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data)
    return response.data
  },

  update: async (id: number, data: UpdateBookingRequest): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}`, data)
    return response.data
  },

  cancel: async (id: number): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}`, { status: 'CANCELLED' })
    return response.data
  },
}
```

## File: frontend/src/api/index.ts
```typescript
export { apiClient } from './client'
export { roomsApi } from './rooms'
export { bookingsApi } from './bookings'
```

## File: frontend/src/api/rooms.ts
```typescript
import { apiClient } from './client'
import type { Room, RoomStatus, CreateRoomRequest, UpdateRoomRequest } from '../types'

export const roomsApi = {
  getAll: async (status?: RoomStatus): Promise<Room[]> => {
    const params = status ? { status } : {}
    const response = await apiClient.get<Room[]>('/rooms', { params })
    return response.data
  },

  getById: async (id: number): Promise<Room> => {
    const response = await apiClient.get<Room>(`/rooms/${id}`)
    return response.data
  },

  create: async (data: CreateRoomRequest): Promise<Room> => {
    const response = await apiClient.post<Room>('/rooms', data)
    return response.data
  },

  update: async (id: number, data: UpdateRoomRequest): Promise<Room> => {
    const response = await apiClient.put<Room>(`/rooms/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/rooms/${id}`)
  },
}
```

## File: frontend/src/components/AppErrorBoundary.tsx
```typescript
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface AppErrorBoundaryProps {
  children: ReactNode
}

interface AppErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled frontend error', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-rose-500">Frontend Error</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Trang vừa gặp lỗi ngoài dự kiến</h1>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Bạn có thể tải lại để tiếp tục. Nếu lỗi lặp lại, cần kiểm tra data response hoặc component vừa mở.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

## File: frontend/src/components/ui/Badge.tsx
```typescript
import { ReactNode } from 'react'

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'default'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
}

const variantStyles: Record<Variant, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}
```

## File: frontend/src/components/ui/Button.tsx
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

## File: frontend/src/components/ui/index.ts
```typescript
export { Button } from './Button'
export { Input } from './Input'
export { Select } from './Select'
export { Modal } from './Modal'
export { Table } from './Table'
export { Card, CardHeader, CardContent } from './Card'
export { Badge } from './Badge'
```

## File: frontend/src/components/ui/Input.tsx
```typescript
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300'
              : 'border-gray-300 text-gray-900 placeholder-gray-400'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

## File: frontend/src/components/ui/Select.tsx
```typescript
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, id, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            error
              ? 'border-red-300 text-red-900'
              : 'border-gray-300 text-gray-900'
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
```

## File: frontend/src/components/ui/Table.tsx
```typescript
import { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
  loading?: boolean
  emptyMessage?: string
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render
                      ? column.render(item)
                      : (item as Record<string, unknown>)[column.key] as ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
```

## File: frontend/src/data/mockData.ts
```typescript
import type { Room, Booking } from '../types'

export const mockRooms: Room[] = [
  // Floor 1
  { id: 1, roomNumber: '101', status: 'OCCUPIED', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 2, roomNumber: '102', status: 'AVAILABLE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 3, roomNumber: '103', status: 'OCCUPIED', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 4, roomNumber: '104', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 5, roomNumber: '105', status: 'MAINTENANCE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 6, roomNumber: '106', status: 'AVAILABLE', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },

  // Floor 2
  { id: 7, roomNumber: '201', status: 'OCCUPIED', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 8, roomNumber: '202', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 9, roomNumber: '203', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 10, roomNumber: '204', status: 'AVAILABLE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 11, roomNumber: '205', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 12, roomNumber: '206', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },

  // Floor 3
  { id: 13, roomNumber: '301', status: 'AVAILABLE', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 14, roomNumber: '302', status: 'OCCUPIED', type: { id: 3, name: 'Suite', price: 250, capacity: 4 } },
  { id: 15, roomNumber: '303', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 16, roomNumber: '304', status: 'MAINTENANCE', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
  { id: 17, roomNumber: '305', status: 'AVAILABLE', type: { id: 2, name: 'Deluxe', price: 150, capacity: 2 } },
  { id: 18, roomNumber: '306', status: 'OCCUPIED', type: { id: 1, name: 'Standard', price: 100, capacity: 2 } },
]

export const mockBookings: Record<number, { guestName: string; checkIn: string; checkOut: string; company?: string; price: number }> = {
  1: { guestName: 'John Smith', checkIn: '2024-02-20T14:00', checkOut: '2024-02-24T12:00', price: 400 },
  3: { guestName: 'Emily Johnson', checkIn: '2024-02-22T15:30', checkOut: '2024-02-25T11:00', company: 'Tech Corp Inc.', price: 450 },
  7: { guestName: 'Michael Brown', checkIn: '2024-02-21T16:00', checkOut: '2024-02-23T12:00', price: 300 },
  9: { guestName: 'Sarah Williams', checkIn: '2024-02-19T12:00', checkOut: '2024-02-26T12:00', company: 'Global Solutions', price: 1750 },
  12: { guestName: 'David Lee', checkIn: '2024-02-23T14:00', checkOut: '2024-02-27T11:00', price: 1000 },
  14: { guestName: 'Jennifer Davis', checkIn: '2024-02-20T13:00', checkOut: '2024-02-22T12:00', company: 'StartUp Labs', price: 500 },
  18: { guestName: 'Robert Wilson', checkIn: '2024-02-24T15:00', checkOut: '2024-02-25T11:00', price: 100 },
}

export const mockBookingsList: Booking[] = [
  { id: 1, userId: 101, room: { id: 1, roomNumber: '101' }, checkIn: '2024-02-20', checkOut: '2024-02-24', status: 'CONFIRMED' },
  { id: 2, userId: 102, room: { id: 3, roomNumber: '103' }, checkIn: '2024-02-22', checkOut: '2024-02-25', status: 'CONFIRMED' },
  { id: 3, userId: 103, room: { id: 7, roomNumber: '201' }, checkIn: '2024-02-21', checkOut: '2024-02-23', status: 'CONFIRMED' },
  { id: 4, userId: 104, room: { id: 9, roomNumber: '203' }, checkIn: '2024-02-19', checkOut: '2024-02-26', status: 'CONFIRMED' },
  { id: 5, userId: 105, room: { id: 12, roomNumber: '206' }, checkIn: '2024-02-23', checkOut: '2024-02-27', status: 'PENDING' },
  { id: 6, userId: 106, room: { id: 14, roomNumber: '302' }, checkIn: '2024-02-20', checkOut: '2024-02-22', status: 'COMPLETED' },
  { id: 7, userId: 107, room: { id: 18, roomNumber: '306' }, checkIn: '2024-02-24', checkOut: '2024-02-25', status: 'PENDING' },
  { id: 8, userId: 108, room: { id: 2, roomNumber: '102' }, checkIn: '2024-02-28', checkOut: '2024-03-02', status: 'PENDING' },
  { id: 9, userId: 109, room: { id: 4, roomNumber: '104' }, checkIn: '2024-02-25', checkOut: '2024-02-27', status: 'CANCELLED' },
]
```

## File: frontend/src/features/auth/AuthContext.ts
```typescript
import { createContext } from 'react'
import type { AuthSession, AuthUser, LoginCredentials } from './types'

export interface AuthContextValue {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: AuthUser | null
  session: AuthSession | null
  login: (credentials: LoginCredentials) => Promise<AuthSession>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
```

## File: frontend/src/features/auth/AuthProvider.tsx
```typescript
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { bootstrapSession, loginUser, logoutUser } from './authService'
import { AuthContext, type AuthContextValue } from './AuthContext'
import type { AuthSession } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    const storedSession = bootstrapSession()

    if (storedSession) {
      setSession(storedSession)
      setStatus('authenticated')
      return
    }

    setStatus('unauthenticated')
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => {
      logoutUser()
      setSession(null)
      setStatus('unauthenticated')
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: session?.user ?? null,
      session,
      async login(credentials) {
        const nextSession = await loginUser(credentials)
        setSession(nextSession)
        setStatus('authenticated')
        return nextSession
      },
      logout() {
        logoutUser()
        setSession(null)
        setStatus('unauthenticated')
      },
    }),
    [session, status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
```

## File: frontend/src/features/auth/authService.test.ts
```typescript
import { beforeEach, describe, expect, it } from 'vitest'
import { bootstrapSession, loginUser, logoutUser } from './authService'

describe('authService', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('creates a mock session for valid demo credentials', async () => {
    const session = await loginUser({
      username: 'admin',
      password: 'admin123',
      remember: true,
    })

    expect(session.mode).toBe('mock')
    expect(session.user.role).toBe('Administrator')
    expect(bootstrapSession()?.token).toBe('mock-hotel-admin-token')
  })

  it('stores non-remembered sessions in sessionStorage only', async () => {
    await loginUser({
      username: 'admin@hotel.com',
      password: 'admin123',
      remember: false,
    })

    expect(window.sessionStorage.getItem('hotel.auth.session')).toContain('mock-hotel-admin-token')
    expect(window.localStorage.getItem('hotel.auth.session')).toBeNull()
  })

  it('rejects invalid demo credentials', async () => {
    await expect(
      loginUser({
        username: 'wrong-user',
        password: 'bad-pass',
        remember: true,
      }),
    ).rejects.toThrow('Sai tai khoan demo')
  })

  it('clears session on logout', async () => {
    await loginUser({
      username: 'admin',
      password: 'admin123',
      remember: true,
    })

    logoutUser()

    expect(bootstrapSession()).toBeNull()
    expect(window.localStorage.getItem('hotel.auth.session')).toBeNull()
    expect(window.sessionStorage.getItem('hotel.auth.session')).toBeNull()
  })
})
```

## File: frontend/src/features/auth/authService.ts
```typescript
import { login as loginWithApi } from '../../api/authApi'
import { clearStoredSession, loadStoredSession, persistSession } from './authStorage'
import type { AuthSession, LoginCredentials } from './types'

const MOCK_AUTH_DELAY_MS = 700
export const MOCK_AUTH_ENABLED =
  import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true' ||
  (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false' && import.meta.env.VITE_ENABLE_REAL_AUTH !== 'true')

function sleep(delay: number) {
  return new Promise((resolve) => window.setTimeout(resolve, delay))
}

function createInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function buildMockSession(username: string): AuthSession {
  return {
    token: 'mock-hotel-admin-token',
    mode: 'mock',
    user: {
      id: 'demo-admin',
      name: 'Alex Nguyen',
      email: username.includes('@') ? username : 'admin@hotel.com',
      role: 'Administrator',
      initials: createInitials('Alex Nguyen'),
    },
  }
}

function normalizeApiSession(data: Awaited<ReturnType<typeof loginWithApi>>, username: string): AuthSession {
  const token = data.token ?? data.accessToken

  if (!token) {
    throw new Error('Auth API khong tra ve token hop le.')
  }

  const name = data.user?.fullName ?? data.user?.name ?? username
  const email = data.user?.email ?? (username.includes('@') ? username : `${username}@hotel.local`)
  const role = data.user?.role ?? 'Authenticated User'

  return {
    token,
    mode: 'api',
    user: {
      id: String(data.user?.id ?? username),
      name,
      email,
      role,
      initials: createInitials(name),
    },
  }
}

async function loginWithMock(credentials: LoginCredentials) {
  await sleep(MOCK_AUTH_DELAY_MS)

  const normalizedUsername = credentials.username.trim().toLowerCase()

  if (
    !['admin', 'admin@hotel.com'].includes(normalizedUsername) ||
    credentials.password !== 'admin123'
  ) {
    throw new Error('Sai tai khoan demo. Thu lai voi admin / admin123.')
  }

  return buildMockSession(normalizedUsername)
}

export async function loginUser(credentials: LoginCredentials) {
  const session = MOCK_AUTH_ENABLED
    ? await loginWithMock(credentials)
    : normalizeApiSession(await loginWithApi(credentials.username, credentials.password), credentials.username)

  persistSession(session, credentials.remember)
  return session
}

export function bootstrapSession() {
  return loadStoredSession()
}

export function logoutUser() {
  clearStoredSession()
}
```

## File: frontend/src/features/auth/authStorage.ts
```typescript
import type { AuthSession } from './types'

const SESSION_KEY = 'hotel.auth.session'

function safeParseSession(value: string | null) {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as AuthSession
  } catch {
    return null
  }
}

export function loadStoredSession() {
  return safeParseSession(window.sessionStorage.getItem(SESSION_KEY)) ?? safeParseSession(window.localStorage.getItem(SESSION_KEY))
}

export function persistSession(session: AuthSession, remember: boolean) {
  const targetStorage = remember ? window.localStorage : window.sessionStorage
  const staleStorage = remember ? window.sessionStorage : window.localStorage

  staleStorage.removeItem(SESSION_KEY)
  targetStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}
```

## File: frontend/src/features/auth/ProtectedRoute.tsx
```typescript
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
          <p className="text-sm font-medium text-gray-600">Dang khoi tao phien dang nhap...</p>
        </div>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
```

## File: frontend/src/features/auth/PublicOnlyRoute.tsx
```typescript
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
```

## File: frontend/src/features/auth/types.ts
```typescript
export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  initials: string
}

export interface AuthSession {
  token: string
  user: AuthUser
  mode: 'mock' | 'api'
}

export interface LoginCredentials {
  username: string
  password: string
  remember: boolean
}
```

## File: frontend/src/features/auth/useAuth.ts
```typescript
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth phai duoc dung ben trong AuthProvider')
  }

  return context
}
```

## File: frontend/src/features/bookings/components/index.ts
```typescript
export { BookingStatusBadge } from './BookingStatusBadge'
export { BookingTable } from './BookingTable'
export { CreateBookingModal } from './CreateBookingModal'
export { BookingDetailModal } from './BookingDetailModal'
export { UpdateStatusModal } from './UpdateStatusModal'
```

## File: frontend/src/features/bookings/components/UpdateStatusModal.tsx
```typescript
import { useState } from 'react'
import { Modal, Select, Button } from '../../../components/ui'
import type { Booking, BookingStatus } from '../../../types'

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: BookingStatus) => void
  booking: Booking | null
  loading?: boolean
}

const statusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

export function UpdateStatusModal({ isOpen, onClose, onSubmit, booking, loading }: UpdateStatusModalProps) {
  const [status, setStatus] = useState<BookingStatus>(booking?.status || 'PENDING')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(status)
  }

  if (!booking) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Booking #${booking.id}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="status"
          label="New Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as BookingStatus)}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Update Status
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

## File: frontend/src/features/dashboard/components/index.ts
```typescript
export { StatsCard } from './StatsCard'
```

## File: frontend/src/features/rooms/components/RoomFilterBar.tsx
```typescript
import { Button } from '../../../components/ui'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'

interface RoomFilterBarProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export function RoomFilterBar({
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange,
}: RoomFilterBarProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'booking', label: 'Booking' },
    { key: 'type', label: 'Type' },
    { key: 'floor', label: 'Floor' },
    { key: 'room', label: 'Room' },
  ]

  return (
    <div className="flex items-center justify-between py-3 border-b">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              activeFilter === filter.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Right side - Search and view toggle */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </Button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search room..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
```

## File: frontend/src/features/rooms/components/RoomFilters.tsx
```typescript
import { Button } from '../../../components/ui'
import type { RoomStatus } from '../../../types'

interface RoomFiltersProps {
  currentStatus: RoomStatus | undefined
  onStatusChange: (status: RoomStatus | undefined) => void
}

const statuses: { value: RoomStatus | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
]

export function RoomFilters({ currentStatus, onStatusChange }: RoomFiltersProps) {
  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <Button
          key={status.label}
          variant={currentStatus === status.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onStatusChange(status.value)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  )
}
```

## File: frontend/src/test/setup.ts
```typescript
import '@testing-library/jest-dom'
```

## File: frontend/src/types/index.ts
```typescript
export * from './room'
export * from './booking'
```

## File: frontend/src/types/room.ts
```typescript
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'

export interface RoomType {
  id: number
  name: string
  price: number
  capacity: number
}

export interface Room {
  id: number
  roomNumber: string
  status: RoomStatus
  type: RoomType
}

export interface CreateRoomRequest {
  roomNumber: string
  roomTypeId: number
  status: RoomStatus
}

export interface UpdateRoomRequest {
  roomNumber?: string
  roomTypeId?: number
  status?: RoomStatus
}
```

## File: frontend/src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## File: frontend/tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

## File: frontend/tsconfig.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## File: LICENSE
```
MIT License

Copyright (c) 2026 Phan Manh Cuong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## File: README.md
```markdown
# hotel-management-system

Landing page tài liệu dev cho repo này. `docs/` là nguồn sự thật, càng cập nhật code càng phải bổ sung tài liệu.

## Chỉ đường tài liệu
- [Project overview & PDR](docs/project-overview-pdr.md)
- [Codebase summary](docs/codebase-summary.md)
- [Code structure & standards](docs/code-standards.md)
- [System architecture & data flow](docs/system-architecture.md)

## Quick start
1. Cài MySQL (schema `hotel_management` mô tả trong `database/hotel-management.sql`).
2. Backend: `cd backend && ./mvnw spring-boot:run` (Java 21, Spring Boot 4). Mang config `SPRING_DATASOURCE_*` ra môi trường thay vì file `application.yaml` hardcode.
3. Frontend: `cd frontend && npm install && npm run dev` (Vite 5, React 18). Vite dev proxy `/api` -> `http://localhost:8080`.
4. Tài liệu còn nhiều gap (API chưa đồng bộ, auth chưa hoàn thiện); xem từng file trong `docs/` để biết chi tiết.

## Giữ docs sống
- Mọi thay đổi kiến trúc, API, database đều phải ghi lại trong `docs/` trước khi merge.
- Nếu cần tạo snapshot phục vụ AI/review, hãy xuất ra file tạm riêng; không ghi đè các tài liệu chuẩn trong `docs/`.
```

## File: backend/pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.0.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.hotel</groupId>
    <artifactId>backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>backend</name>
    <description>backend</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc</artifactId>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>3.0.2</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>21</source>
                    <target>21</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

## File: backend/src/main/resources/application.yaml
```yaml
spring:
  application:
    name:
      backend

  datasource:
    url: jdbc:mysql://192.168.20.40:3306/hotel_management
    username: cuongdso
    password: Pcuong@2411

  jpa:
    hibernate:
      ddl-auto: none
    open-in-view: false
```

## File: frontend/src/api/authApi.ts
```typescript
import { apiClient } from './client'

export interface LoginApiResponse {
  token?: string
  accessToken?: string
  user?: {
    id?: string | number
    fullName?: string
    name?: string
    email?: string
    role?: string
  }
}

export async function login(username: string, password: string) {
  const response = await apiClient.post<LoginApiResponse>('/auth/login', {
    username,
    password,
  })

  return response.data
}
```

## File: frontend/src/api/client.ts
```typescript
import axios from 'axios'

const SESSION_KEY = 'hotel.auth.session'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const storedSession = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY)

  if (!storedSession) {
    return config
  }

  try {
    const parsedSession = JSON.parse(storedSession) as { token?: string }

    if (parsedSession.token) {
      config.headers.Authorization = `Bearer ${parsedSession.token}`
    }
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    window.sessionStorage.removeItem(SESSION_KEY)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
```

## File: frontend/src/components/ui/Card.tsx
```typescript
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  icon?: string
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-7 border-b border-slate-50">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-primary-600">
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm font-medium text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {action}
      </div>
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export function CardContent({ children, className = '', noPadding = false }: CardContentProps) {
  return <div className={`${noPadding ? '' : 'px-8 py-7'} ${className}`}>{children}</div>
}
```

## File: frontend/src/components/ui/Modal.tsx
```typescript
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-5xl',
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Use createPortal to render the modal at the end of document.body
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto font-sans">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop (Mask) - Now definitely covering EVERYTHING because it's at the body level */}
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Container */}
        <div
          className={`relative w-full ${sizeStyles[size]} bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/40 transform transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 overflow-hidden`}
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-600 to-primary-400" />

          {/* Header */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50">
            <div>
              <h3 className="text-2xl font-black italic tracking-tight text-slate-900 uppercase">{title}</h3>
              <div className="mt-1 h-1 w-12 bg-primary-600 rounded-full" />
            </div>
            <button
              onClick={onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 hover:rotate-90"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="px-10 py-8 max-h-[80vh] overflow-y-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
```

## File: frontend/src/features/auth/LoginPage.tsx
```typescript
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../../components/ui'
import { MOCK_AUTH_ENABLED } from './authService'
import { useAuth } from './useAuth'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập email hoặc username'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  remember: z.boolean().default(true),
})

type LoginFormValues = z.infer<typeof loginSchema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">{message}</p>
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null
    return state?.from?.pathname ?? '/dashboard'
  }, [location.state])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin',
      password: 'admin123',
      remember: true,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)
    try {
      await login(values)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại.'
      setSubmitError(message)
    }
  })

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      {/* Left side: Image & Branding (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col overflow-hidden bg-slate-900 lg:flex">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury Hotel"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[10000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 flex flex-1 flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30">
              <span className="material-symbols-outlined text-[24px]">apartment</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Grand Hotel <span className="text-primary-400">Hub</span></span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
              Vận hành <span className="text-primary-400">thông minh</span>, dịch vụ <span className="text-primary-400">đẳng cấp</span>.
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Hệ thống quản lý khách sạn hiện đại giúp tối ưu quy trình đặt phòng, quản lý buồng phòng và nâng tầm trải nghiệm khách hàng.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-slate-900 object-cover shadow-sm"
                  src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  alt="Staff member"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-300">
              Hơn <span className="font-bold text-white">500+</span> nhân viên đã tin dùng hệ thống.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 lg:p-12 xl:p-24">
        <div className="w-full max-w-sm">
          {/* Mobile Branding */}
          <div className="mb-12 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30">
              <span className="material-symbols-outlined text-[24px]">apartment</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Grand Hotel <span className="text-primary-600">Hub</span></span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Chào mừng trở lại</h2>
            <p className="mt-3 text-slate-500">
              Vui lòng nhập thông tin để truy cập vào hệ thống quản trị.
            </p>
          </div>

          {submitError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              <span className="material-symbols-outlined mt-0.5 text-[18px]">error</span>
              <span>{submitError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                Email hoặc Tên đăng nhập
              </label>
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary-600">
                  person
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-100"
                  placeholder="admin hoặc admin@hotel.com"
                  {...register('username')}
                />
              </div>
              <FieldError message={errors.username?.message} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <button type="button" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                  Quên mật khẩu?
                </button>
              </div>
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary-600">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-12 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-100"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 transition-colors cursor-pointer"
                {...register('remember')}
              />
              <label htmlFor="remember" className="ml-3 cursor-pointer text-sm font-medium text-slate-600 select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-primary-600 py-6 text-base font-bold text-white shadow-xl shadow-primary-200 transition-all hover:bg-primary-700 hover:shadow-primary-300 active:scale-[0.98]"
              loading={isSubmitting}
            >
              Đăng nhập ngay
            </Button>

            {MOCK_AUTH_ENABLED && (
              <div className="mt-8 rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  Demo Account
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="flex justify-between text-slate-600">
                    <span>Tài khoản:</span>
                    <span className="font-mono font-semibold text-slate-900">admin</span>
                  </p>
                  <p className="flex justify-between text-slate-600">
                    <span>Mật khẩu:</span>
                    <span className="font-mono font-semibold text-slate-900">admin123</span>
                  </p>
                </div>
              </div>
            )}
          </form>

          <p className="mt-12 text-center text-sm text-slate-500">
            © 2024 Grand Hotel Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
```

## File: frontend/src/features/bookings/components/BookingDetailModal.tsx
```typescript
import { Modal, Button } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '../../../types'

interface BookingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

export function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  if (!booking) return null

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Booking #${booking.id}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="mt-1 font-medium">{booking.room?.roomNumber ?? '---'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkIn)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="mt-1 font-medium">{formatDate(booking.checkOut)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="mt-1 font-medium">{calculateNights()} night(s)</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="mt-1 font-medium">#{booking.userId}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
```

## File: frontend/src/features/bookings/components/BookingStatusBadge.tsx
```typescript
import { Badge } from '../../../components/ui'
import type { BookingStatus } from '../../../types'

interface BookingStatusBadgeProps {
  status: BookingStatus | string
}

const statusConfig: Record<BookingStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  PENDING: { label: 'Pending', variant: 'warning' },
  CONFIRMED: { label: 'Confirmed', variant: 'info' },
  CANCELLED: { label: 'Cancelled', variant: 'danger' },
  COMPLETED: { label: 'Completed', variant: 'success' },
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status as BookingStatus] ?? { label: status || 'Unknown', variant: 'default' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
```

## File: frontend/src/features/bookings/components/BookingTable.tsx
```typescript
import { Button } from '../../../components/ui'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '../../../types'

interface BookingTableProps {
  bookings: Booking[]
  loading?: boolean
  onViewDetails: (booking: Booking) => void
  onUpdateStatus: (booking: Booking) => void
  onCancel: (booking: Booking) => void
}

export function BookingTable({ bookings, loading, onViewDetails, onUpdateStatus, onCancel }: BookingTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getRoomNumber = (booking: Booking) => booking.room?.roomNumber ?? '---'
  const getRoomTypeName = (booking: Booking) => booking.room?.roomType?.name ?? booking.room?.type?.name ?? 'Chua co loai phong'

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-12 w-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-sm animate-pulse uppercase tracking-widest">Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-300">
        <span className="material-symbols-outlined text-[64px] opacity-20 mb-4">analytics</span>
        <p className="font-black italic uppercase tracking-tighter text-xl">Không tìm thấy dữ liệu</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            <th className="px-8 py-5">Mã Đơn</th>
            <th className="px-8 py-5">Thông Tin Phòng</th>
            <th className="px-8 py-5">Thời Gian Lưu Trú</th>
            <th className="px-8 py-5">Trạng Thái</th>
            <th className="px-8 py-5 text-right">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {bookings.map((booking) => (
            <tr key={booking.id} className="group hover:bg-slate-50/50 transition-all duration-200">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-mono font-black text-slate-900 text-base italic">#{booking.id}</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-primary-400 font-black italic shadow-lg shadow-slate-200">
                    {getRoomNumber(booking)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">Phòng {getRoomNumber(booking)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{getRoomTypeName(booking)}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-[14px] text-emerald-500">login</span>
                    {formatDate(booking.checkIn)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-[14px] text-rose-500">logout</span>
                    {formatDate(booking.checkOut)}
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(booking)}
                    className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-100"
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-600">visibility</span>
                  </Button>
                  {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onUpdateStatus(booking)}
                        className="h-10 w-10 p-0 rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <span className="material-symbols-outlined text-[20px] text-blue-600">edit_square</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onCancel(booking)}
                        className="h-10 w-10 p-0 rounded-xl hover:bg-rose-50 shadow-sm border border-transparent hover:border-rose-100"
                      >
                        <span className="material-symbols-outlined text-[20px] text-rose-600">cancel</span>
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

## File: frontend/src/features/bookings/components/CreateBookingModal.tsx
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Button } from '../../../components/ui'
import type { Room } from '../../../types'
import { useEffect, useState } from 'react'

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Vui lòng nhập tên khách hàng'),
  phoneNumber: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  roomId: z.string().min(1, 'Vui lòng chọn phòng'),
  checkIn: z.string().min(1, 'Vui lòng chọn ngày nhận phòng'),
  checkOut: z.string().min(1, 'Vui lòng chọn ngày trả phòng'),
}).refine((data) => {
  const checkIn = new Date(data.checkIn)
  const checkOut = new Date(data.checkOut)
  return checkOut > checkIn
}, {
  message: 'Ngày trả phòng phải sau ngày nhận phòng',
  path: ['checkOut'],
})

type BookingFormData = z.infer<typeof bookingSchema>

interface CreateBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { guestName: string; phoneNumber: string; email?: string; roomId: number; checkIn: string; checkOut: string }) => void
  availableRooms: Room[]
  loading?: boolean
}

export function CreateBookingModal({ isOpen, onClose, onSubmit, availableRooms, loading }: CreateBookingModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const getRoomTypeName = (room?: Room) => room?.type?.name ?? 'Unknown type'
  const getRoomTypeShortName = (room?: Room) => getRoomTypeName(room).slice(0, 3).toUpperCase()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      phoneNumber: '',
      email: '',
      roomId: '',
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  })

  const handleClose = () => {
    reset()
    setSelectedRoomId(null)
    onClose()
  }

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit({
      guestName: data.guestName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      roomId: parseInt(data.roomId),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    })
  }

  const handleRoomSelect = (id: string) => {
    setSelectedRoomId(id)
    setValue('roomId', id, { shouldValidate: true })
  }

  useEffect(() => {
    if (!selectedRoomId) {
      return
    }

    const selectedRoomStillExists = availableRooms.some((room) => room.id.toString() === selectedRoomId)

    if (!selectedRoomStillExists) {
      setSelectedRoomId(null)
      setValue('roomId', '', { shouldValidate: true })
    }
  }, [availableRooms, selectedRoomId, setValue])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Tạo Đơn Đặt Phòng Mới" size="xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col lg:flex-row gap-10">
        {/* Left: Customer & Date Info */}
        <div className="flex-1 space-y-6">
          <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">person</span>
              Thông tin khách hàng
            </h3>
            <div className="space-y-4">
              <Input
                id="guestName"
                label="Họ và Tên Khách Hàng"
                placeholder="Ví dụ: Nguyễn Văn A"
                error={errors.guestName?.message}
                {...register('guestName')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="phoneNumber"
                  label="Số Điện Thoại"
                  placeholder="09xx xxx xxx"
                  error={errors.phoneNumber?.message}
                  {...register('phoneNumber')}
                  className="bg-white border-none shadow-sm rounded-xl"
                />
                <Input
                  id="email"
                  label="Email (Không bắt buộc)"
                  placeholder="khachhang@gmail.com"
                  error={errors.email?.message}
                  {...register('email')}
                  className="bg-white border-none shadow-sm rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              Thời gian lưu trú
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="checkIn"
                label="Ngày Nhận Phòng"
                type="date"
                error={errors.checkIn?.message}
                {...register('checkIn')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
              <Input
                id="checkOut"
                label="Ngày Trả Phòng"
                type="date"
                error={errors.checkOut?.message}
                {...register('checkOut')}
                className="bg-white border-none shadow-sm rounded-xl"
              />
            </div>
          </div>

          {selectedRoomId && (
             <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200 animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
                 <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-12" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 mb-2 relative z-10">Phòng đã chọn</p>
                 <div className="flex items-center justify-between relative z-10">
                   <div>
                     <h4 className="text-4xl font-black italic tracking-tighter">PHÒNG {availableRooms.find(r => r.id.toString() === selectedRoomId)?.roomNumber ?? '---'}</h4>
                     <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                       {getRoomTypeName(availableRooms.find(r => r.id.toString() === selectedRoomId))} Class
                     </p>
                   </div>
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">
                    <span className="material-symbols-outlined text-primary-400 text-[32px]">key</span>
                  </div>
                </div>
             </div>
          )}
        </div>

        {/* Right: Visual Room Picker */}
        <div className="w-full lg:w-[480px] flex flex-col">
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">bed</span>
              Chọn Phòng ({availableRooms.length})
            </h3>
            {errors.roomId && <span className="text-xs font-bold text-rose-500 animate-pulse">{errors.roomId.message}</span>}
          </div>

          <div className="flex-1 bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 overflow-y-auto max-h-[450px] no-scrollbar shadow-inner">
            <div className="grid grid-cols-4 gap-4">
              {availableRooms.map((room) => {
                const isSelected = selectedRoomId === room.id.toString()
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => handleRoomSelect(room.id.toString())}
                    className={`group relative flex flex-col items-center justify-center aspect-square rounded-[1.5rem] border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-200 scale-110 z-10' 
                        : 'bg-white border-transparent text-slate-600 hover:border-primary-200 hover:text-primary-600 hover:scale-105'
                    }`}
                  >
                    <span className="text-base font-black italic tabular-nums">{room.roomNumber}</span>
                    <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 ${isSelected ? 'opacity-60' : 'text-slate-400'}`}>
                      {getRoomTypeShortName(room)}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-primary-600 text-[12px] font-black">check</span>
                      </div>
                    )}
                  </button>
                )
              })}
              {availableRooms.length === 0 && (
                <div className="col-span-4 py-24 text-center text-slate-300">
                  <span className="material-symbols-outlined text-[64px] opacity-10">hotel_class</span>
                  <p className="text-xs font-black uppercase tracking-widest mt-4">Hiện không có phòng trống</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 rounded-2xl py-7 font-black uppercase tracking-widest text-xs hover:bg-slate-50">
              Hủy Bỏ
            </Button>
            <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-7 font-black uppercase tracking-widest text-xs text-white shadow-2xl shadow-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Xác Nhận Đặt Phòng
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
```

## File: frontend/src/features/bookings/pages/BookingListPage.tsx
```typescript
import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import {
  BookingTable,
  CreateBookingModal,
  BookingDetailModal,
  UpdateStatusModal,
} from '../components'
import { useBookings, useCreateBooking, useUpdateBooking, useCancelBooking } from '../hooks/useBookings'
import { useRooms } from '../../rooms/hooks/useRooms'
import type { Booking, BookingStatus } from '../../../types'

export default function BookingListPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const { data: bookings = [], isLoading } = useBookings()
  const { data: availableRooms = [] } = useRooms('AVAILABLE')
  const createBooking = useCreateBooking()
  const updateBooking = useUpdateBooking()
  const cancelBooking = useCancelBooking()

  const filteredBookings = useMemo(() => {
    if (!searchValue) return bookings
    return bookings.filter(b => 
      b.id.toString().includes(searchValue) || 
      (b.room?.roomNumber ?? '').includes(searchValue)
    )
  }, [bookings, searchValue])

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setDetailModalOpen(true)
  }

  const handleUpdateStatus = (booking: Booking) => {
    setSelectedBooking(booking)
    setUpdateModalOpen(true)
  }

  const handleCancel = (booking: Booking) => {
    if (confirm(`Bạn có chắc chắn muốn hủy đơn đặt phòng #${booking.id}?`)) {
      cancelBooking.mutate(booking.id)
    }
  }

  const handleCreateSubmit = (data: { guestName: string; phoneNumber: string; email?: string; roomId: number; checkIn: string; checkOut: string }) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        setCreateModalOpen(false)
      },
    })
  }

  const handleStatusSubmit = (status: BookingStatus) => {
    if (selectedBooking) {
      updateBooking.mutate(
        { id: selectedBooking.id, data: { status } },
        {
          onSuccess: () => {
            setUpdateModalOpen(false)
            setSelectedBooking(null)
          },
        }
      )
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic text-slate-900 tracking-tight uppercase">Quản lý Đặt phòng</h1>
          <p className="mt-1 text-slate-500 font-medium">Theo dõi, kiểm tra và xử lý các yêu cầu đặt phòng của khách hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hệ thống ổn định</span>
          </div>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="rounded-2xl bg-primary-600 hover:bg-primary-500 py-6 px-8 shadow-xl shadow-primary-200"
          >
            <span className="material-symbols-outlined mr-2">add_circle</span>
            Tạo Đơn Mới
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="border-none shadow-2xl shadow-slate-200/50 overflow-visible">
        <CardHeader 
          title="Danh sách Đơn đặt phòng" 
          subtitle={`Tổng số ${filteredBookings.length} đơn trong hệ thống`}
          icon="book_online"
          action={
            <div className="flex items-center gap-3">
              <div className="w-64 bg-slate-50 p-1 rounded-xl border border-slate-100 flex items-center px-3 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                <input 
                  type="text" 
                  placeholder="Tìm mã đơn, số phòng..."
                  className="w-full bg-transparent border-none outline-none px-2 py-1.5 text-xs font-bold text-slate-900 placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl p-0 hover:bg-slate-50">
                <span className="material-symbols-outlined">filter_list</span>
              </Button>
            </div>
          }
        />
        <CardContent noPadding>
          <div className="min-h-[400px]">
            <BookingTable
              bookings={filteredBookings}
              loading={isLoading}
              onViewDetails={handleViewDetails}
              onUpdateStatus={handleUpdateStatus}
              onCancel={handleCancel}
            />
          </div>
        </CardContent>
      </Card>

      <CreateBookingModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        availableRooms={availableRooms}
        loading={createBooking.isPending}
      />

      <BookingDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedBooking(null)
        }}
        booking={selectedBooking}
      />

      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false)
          setSelectedBooking(null)
        }}
        onSubmit={handleStatusSubmit}
        booking={selectedBooking}
        loading={updateBooking.isPending}
      />
    </div>
  )
}
```

## File: frontend/src/features/dashboard/components/StatsCard.tsx
```typescript
interface StatsCardProps {
  title: string
  value: string | number
  icon: string // Changed to icon name for Material Symbols
  color: 'blue' | 'green' | 'yellow' | 'red'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const colorConfigs = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-600 shadow-blue-200',
    text: 'text-blue-600',
    gradient: 'from-blue-600 to-blue-400'
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-600 shadow-emerald-200',
    text: 'text-emerald-600',
    gradient: 'from-emerald-600 to-emerald-400'
  },
  yellow: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-600 shadow-amber-200',
    text: 'text-amber-600',
    gradient: 'from-amber-600 to-amber-400'
  },
  red: {
    bg: 'bg-rose-50',
    icon: 'bg-rose-600 shadow-rose-200',
    text: 'text-rose-600',
    gradient: 'from-rose-600 to-rose-400'
  },
}

export function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const config = colorConfigs[color]
  
  return (
    <div className="group relative overflow-hidden bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Decorative Gradient Background */}
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-150 ${config.bg}`} />
      
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${config.gradient} ${config.icon}`}>
            <span className="material-symbols-outlined text-[28px]">{icon}</span>
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              <span className="material-symbols-outlined text-[14px]">
                {trend.isPositive ? 'trending_up' : 'trending_down'}
              </span>
              {trend.value}%
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-500 tracking-tight">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900">{value}</h3>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">đơn vị</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## File: frontend/src/features/dashboard/pages/DashboardPage.tsx
```typescript
import { Card, CardHeader, CardContent, Button } from '../../../components/ui'
import { StatsCard } from '../components'
import { useRooms } from '../../rooms/hooks/useRooms'
import { useBookings } from '../../bookings/hooks/useBookings'
import { BookingStatusBadge } from '../../bookings/components'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data: roomsData = [] } = useRooms()
  const { data: bookingsData = [] } = useBookings()

  const rooms = Array.isArray(roomsData) ? roomsData : []
  const bookings = Array.isArray(bookingsData) ? bookingsData : []
  const getBookingRoomNumber = (booking: (typeof bookings)[number]) => booking.room?.roomNumber ?? '---'
  const getRoomTypeName = (booking: (typeof bookings)[number]) => booking.room?.roomType?.name ?? booking.room?.type?.name ?? 'Chua co loai phong'

  const totalRooms = rooms.length
  const availableRooms = rooms.filter((r) => r.status === 'AVAILABLE').length
  const occupiedRooms = rooms.filter((r) => r.status === 'OCCUPIED').length
  const maintenanceRooms = rooms.filter((r) => r.status === 'MAINTENANCE').length

  const today = new Date().toISOString().split('T')[0]
  const todayCheckIns = bookings.filter((b) => b.checkIn === today && b.status !== 'CANCELLED')
  const todayCheckOuts = bookings.filter((b) => b.checkOut === today && b.status !== 'CANCELLED')
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING')

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-2">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-12" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight italic">XIN CHÀO VẬN HÀNH!</h1>
          <p className="mt-2 text-slate-400 font-medium text-lg max-w-md">
            Hôm nay khách sạn có <span className="text-primary-400 font-bold">{todayCheckIns.length} lượt check-in</span> mới. Chúc bạn một ngày làm việc hiệu quả.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/bookings')}
              className="bg-primary-600 hover:bg-primary-500 rounded-2xl px-8 py-6 shadow-lg shadow-primary-900/20"
            >
              <span className="material-symbols-outlined mr-2">add_circle</span>
              Tạo Booking Mới
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/rooms')}
              className="bg-white/10 hover:bg-white/20 text-white border-none rounded-2xl px-8 py-6 backdrop-blur-sm"
            >
              Xem Sơ Đồ Phòng
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-2 relative z-10">
          <div className="text-5xl font-black text-primary-400 tracking-tighter tabular-nums">
            {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng số phòng"
          value={totalRooms}
          icon="hotel"
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Phòng trống"
          value={availableRooms}
          icon="check_circle"
          color="green"
        />
        <StatsCard
          title="Đang ở"
          value={occupiedRooms}
          icon="person_pin"
          color="yellow"
        />
        <StatsCard
          title="Bảo trì"
          value={maintenanceRooms}
          icon="build"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Check-ins List */}
        <Card className="lg:col-span-2">
          <CardHeader 
            title="Check-ins Hôm Nay" 
            subtitle="Danh sách khách hàng dự kiến nhận phòng trong ngày"
            icon="login"
            action={
              <Button variant="ghost" size="sm" className="rounded-xl font-bold text-primary-600 hover:bg-primary-50">
                Tất cả lượt đến
              </Button>
            }
          />
          <CardContent noPadding>
            {todayCheckIns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-[48px] opacity-20 mb-4">event_busy</span>
                <p className="font-medium">Không có lượt check-in nào trong hôm nay</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <th className="px-8 py-4">Mã Đơn</th>
                      <th className="px-8 py-4">Thông Tin Phòng</th>
                      <th className="px-8 py-4">Trạng Thái</th>
                      <th className="px-8 py-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {todayCheckIns.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <span className="font-mono font-bold text-slate-900">#{booking.id}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                              {getBookingRoomNumber(booking)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Phòng {getBookingRoomNumber(booking)}</p>
                              <p className="text-xs font-medium text-slate-500">{getRoomTypeName(booking)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <BookingStatusBadge status={booking.status} />
                        </td>
                        <td className="px-8 py-5 text-right">
                          <Button variant="ghost" size="sm" className="rounded-xl group-hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Pending Bookings & Check-outs */}
        <div className="space-y-8">
          <Card>
            <CardHeader 
              title="Đơn Chờ Xử Lý" 
              subtitle="Cần duyệt sớm"
              icon="pending_actions"
            />
            <CardContent>
              {pendingBookings.length === 0 ? (
                <p className="text-slate-400 text-sm font-medium py-4 text-center">Mọi thứ đã được xử lý xong!</p>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 transition-transform hover:scale-[1.02]">
                      <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">Booking #{booking.id}</p>
                         <p className="text-xs font-medium text-slate-500 mt-0.5">Phòng {getBookingRoomNumber(booking)} • {booking.checkIn}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg p-0 text-amber-600 hover:bg-amber-100">
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader 
              title="Check-outs" 
              subtitle="Trong ngày hôm nay"
              icon="logout"
            />
            <CardContent>
              <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl shadow-slate-200 overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500" />
                <div className="relative z-10">
                  <p className="text-3xl font-black italic">{todayCheckOuts.length}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Lượt trả phòng</p>
                </div>
                <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur relative z-10">
                  <span className="material-symbols-outlined text-[32px] text-emerald-400">key_off</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

## File: frontend/src/features/rooms/components/ChangeStatusModal.tsx
```typescript
import { Modal, Button } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'
import { useState, useEffect } from 'react'

interface ChangeStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: RoomStatus) => void
  room: Room | null
  loading?: boolean
}

const STATUS_OPTIONS: { value: RoomStatus; label: string; icon: string; color: string; bg: string; border: string; desc: string }[] = [
  { 
    value: 'AVAILABLE', 
    label: 'Sẵn sàng', 
    icon: 'check_circle', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    desc: 'Phòng đã dọn dẹp, sẵn sàng đón khách.'
  },
  { 
    value: 'OCCUPIED', 
    label: 'Đang ở', 
    icon: 'person_pin', 
    color: 'text-rose-500', 
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    desc: 'Khách đang lưu trú tại phòng.'
  },
  { 
    value: 'MAINTENANCE', 
    label: 'Bảo trì', 
    icon: 'build', 
    color: 'text-slate-400', 
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    desc: 'Đang sửa chữa hoặc cần vệ sinh.'
  },
]

export function ChangeStatusModal({ isOpen, onClose, onSubmit, room, loading }: ChangeStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('AVAILABLE')

  useEffect(() => {
    if (room) {
      setSelectedStatus(room.status)
    }
  }, [room, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedStatus)
  }

  if (!room) return null

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Cập Nhật Trạng Thái: Phòng ${room.roomNumber}`} 
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-bold text-slate-500">Chọn trạng thái vận hành mới:</p>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
             Hiện tại: {room.status}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {STATUS_OPTIONS.map((opt) => {
            const isActive = selectedStatus === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedStatus(opt.value)}
                className={`group relative flex items-center gap-5 p-5 rounded-[1.5rem] border-2 transition-all duration-300 ${
                  isActive 
                    ? `bg-white ${opt.border} shadow-xl shadow-slate-200 ring-4 ring-primary-50` 
                    : 'bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100'
                }`}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                  isActive ? `${opt.bg} ${opt.color} scale-110 shadow-sm` : 'bg-white text-slate-300'
                }`}>
                  <span className="material-symbols-outlined text-[32px]">{opt.icon}</span>
                </div>
                
                <div className="text-left flex-1 min-w-0">
                  <p className={`text-base font-black italic uppercase tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                    {opt.label}
                  </p>
                  <p className={`mt-0.5 text-xs font-medium truncate ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                    {opt.desc}
                  </p>
                </div>

                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-primary-600 border-primary-600 shadow-lg' : 'border-slate-200'
                }`}>
                  {isActive && <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose} 
            className="flex-1 rounded-2xl py-6 font-bold hover:bg-slate-50"
          >
            Bỏ Qua
          </Button>
          <Button 
            type="submit" 
            loading={loading} 
            className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Xác Nhận Thay Đổi
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

## File: frontend/src/features/rooms/components/index.ts
```typescript
export { RoomStatusBadge } from './RoomStatusBadge'
export { RoomFilters } from './RoomFilters'
export { RoomTable } from './RoomTable'
export { RoomFormModal } from './RoomFormModal'
export { ChangeStatusModal } from './ChangeStatusModal'
export { RoomCard } from './RoomCard'
export { RoomStatusTabs } from './RoomStatusTabs'
export { RoomFilterBar } from './RoomFilterBar'
export { RoomGridView } from './RoomGridView'
```

## File: frontend/src/features/rooms/components/RoomCard.tsx
```typescript
import type { Room } from '../../../types'

interface RoomCardProps {
  room: Room
  booking?: {
    guestName: string
    checkIn: string
    checkOut: string
    company?: string
    price: number
  }
  onClick?: () => void
}

const statusConfigs: Record<string, { 
  bg: string; 
  iconBg: string; 
  text: string; 
  label: string; 
  icon: string;
  gradient: string;
}> = {
  AVAILABLE: { 
    bg: 'bg-emerald-50/50', 
    iconBg: 'bg-emerald-500', 
    text: 'text-emerald-700', 
    label: 'Sẵn sàng', 
    icon: 'check_circle',
    gradient: 'from-emerald-500 to-teal-400'
  },
  OCCUPIED: { 
    bg: 'bg-rose-50/50', 
    iconBg: 'bg-rose-500', 
    text: 'text-rose-700', 
    label: 'Đang ở', 
    icon: 'person_pin',
    gradient: 'from-rose-500 to-orange-400'
  },
  MAINTENANCE: { 
    bg: 'bg-slate-50/50', 
    iconBg: 'bg-slate-500', 
    text: 'text-slate-700', 
    label: 'Bảo trì', 
    icon: 'build',
    gradient: 'from-slate-600 to-slate-400'
  },
}

export function RoomCard({ room, booking, onClick }: RoomCardProps) {
  const config = statusConfigs[room.status] || statusConfigs.AVAILABLE
  const isOccupied = room.status === 'OCCUPIED'
  const roomTypeName = room.type?.name ?? 'Room'

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${config.bg}`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${config.text} bg-white shadow-sm`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.iconBg} animate-pulse`} />
          {config.label}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {roomTypeName}
        </span>
      </div>

      {/* Room Number & Main Info */}
      <div className="flex items-end gap-3 mb-6">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-slate-200 transition-transform duration-300 group-hover:scale-110 ${config.gradient}`}>
          <span className="text-2xl font-black italic">{room.roomNumber}</span>
        </div>
        <div className="mb-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tầng {Math.floor(parseInt(room.roomNumber)/100)}</p>
          <p className="text-sm font-black text-slate-900 leading-none">{roomTypeName}</p>
        </div>
      </div>

      {/* Guest/Booking Info */}
      <div className="mt-auto">
        {isOccupied && booking ? (
          <div className="rounded-2xl bg-white/60 backdrop-blur-sm p-3 border border-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
              <span className="text-xs font-bold text-slate-900 truncate">{booking.guestName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_today</span>
              <span className="text-[10px] font-medium text-slate-500">Out: {booking.checkOut}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 rounded-2xl border border-dashed border-slate-200">
             <span className="material-symbols-outlined text-[20px] text-slate-300">add_circle</span>
          </div>
        )}
      </div>

      {/* Hover Action Overlay */}
      <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/5 flex items-center justify-center pointer-events-none">
        <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg text-slate-900">
            Xem chi tiết
          </div>
        </div>
      </div>
    </div>
  )
}
```

## File: frontend/src/features/rooms/components/RoomFormModal.tsx
```typescript
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Input, Button } from '../../../components/ui'
import type { Room } from '../../../types'

const roomSchema = z.object({
  roomNumber: z.string().min(1, 'Số phòng không được để trống'),
  roomTypeId: z.string().min(1, 'Vui lòng chọn loại phòng'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']),
})

type RoomFormData = z.infer<typeof roomSchema>

interface RoomFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoomFormData) => void
  room?: Room
  loading?: boolean
}

const ROOM_TYPES = [
  { id: '1', name: 'Standard', icon: 'bed', desc: 'Phòng tiêu chuẩn, đầy đủ tiện nghi cơ bản.', price: '500k' },
  { id: '2', name: 'Deluxe', icon: 'king_bed', desc: 'Không gian rộng rãi, nội thất cao cấp.', price: '1.2M' },
  { id: '3', name: 'Suite', icon: 'apartment', desc: 'Đẳng cấp thượng lưu, view toàn thành phố.', price: '3.5M' },
]

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Sẵn sàng', icon: 'check_circle', color: 'text-emerald-500' },
  { value: 'OCCUPIED', label: 'Đang ở', icon: 'person_pin', color: 'text-rose-500' },
  { value: 'MAINTENANCE', label: 'Bảo trì', icon: 'build', color: 'text-slate-400' },
]

export function RoomFormModal({ isOpen, onClose, onSubmit, room, loading }: RoomFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room
      ? {
          roomNumber: room.roomNumber,
          roomTypeId: String(room.type?.id ?? 1),
          status: room.status,
        }
      : {
          roomNumber: '',
          roomTypeId: '1',
          status: 'AVAILABLE',
        },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={room ? 'Cập Nhật Thông Tin Phòng' : 'Thêm Phòng Nghỉ Mới'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="roomNumber"
            label="Số Phòng (Ví dụ: 101, 202...)"
            placeholder="Nhập số phòng..."
            error={errors.roomNumber?.message}
            {...register('roomNumber')}
            className="rounded-2xl border-slate-200 focus:ring-primary-100"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Trạng thái ban đầu</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                  {STATUS_OPTIONS.map((opt) => {
                    const isActive = field.value === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isActive ? opt.color : ''}`}>
                          {opt.icon}
                        </span>
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>

        {/* Room Type Visual Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-slate-700">Chọn loại phòng</label>
            {errors.roomTypeId && <span className="text-xs font-bold text-rose-500 animate-pulse">{errors.roomTypeId.message}</span>}
          </div>
          
          <Controller
            name="roomTypeId"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROOM_TYPES.map((type) => {
                  const isActive = field.value === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => field.onChange(type.id)}
                      className={`group relative flex flex-col text-left p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-primary-200'
                      }`}
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                        isActive ? 'bg-white/10 text-primary-400' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <span className="material-symbols-outlined text-[28px]">{type.icon}</span>
                      </div>
                      <p className="text-base font-black italic uppercase tracking-tight">{type.name}</p>
                      <p className={`mt-1 text-[10px] font-medium leading-relaxed ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                        {type.desc}
                      </p>
                      <div className={`mt-4 text-sm font-black ${isActive ? 'text-primary-400' : 'text-slate-900'}`}>
                        {type.price} <span className="text-[10px] font-bold opacity-60">/ đêm</span>
                      </div>
                      {isActive && (
                        <div className="absolute top-4 right-4 h-6 w-6 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 rounded-2xl py-6 font-bold hover:bg-slate-50">
            Hủy Bỏ
          </Button>
          <Button type="submit" loading={loading} className="flex-[2] rounded-2xl bg-slate-900 py-6 font-bold shadow-xl shadow-slate-200">
            {room ? 'Lưu Thay Đổi' : 'Xác Nhận Thêm Phòng'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

## File: frontend/src/features/rooms/components/RoomGridView.tsx
```typescript
import { RoomCard } from './RoomCard'
import type { Room } from '../../../types'

interface RoomWithBooking extends Room {
  currentBooking?: {
    guestName: string
    checkIn: string
    checkOut: string
    company?: string
    price: number
  }
  floor?: number
}

interface RoomGridViewProps {
  rooms: RoomWithBooking[]
  loading?: boolean
  groupBy: 'floor' | 'type' | 'none'
  onRoomClick?: (room: Room) => void
}

function groupRoomsByFloor(rooms: RoomWithBooking[]): Record<string, RoomWithBooking[]> {
  return rooms.reduce((acc, room) => {
    // Extract floor from room number (e.g., 501 -> floor 5, 101 -> floor 1)
    const floor = room.floor || Math.floor(parseInt(room.roomNumber) / 100) || 1
    const key = `Floor ${floor}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(room)
    return acc
  }, {} as Record<string, RoomWithBooking[]>)
}

function groupRoomsByType(rooms: RoomWithBooking[]): Record<string, RoomWithBooking[]> {
  return rooms.reduce((acc, room) => {
    const key = room.type?.name ?? 'Unknown Type'
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(room)
    return acc
  }, {} as Record<string, RoomWithBooking[]>)
}

export function RoomGridView({ rooms, loading, groupBy, onRoomClick }: RoomGridViewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        No rooms found
      </div>
    )
  }

  const groupedRooms = groupBy === 'floor'
    ? groupRoomsByFloor(rooms)
    : groupBy === 'type'
    ? groupRoomsByType(rooms)
    : { 'All Rooms': rooms }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRooms).map(([groupName, groupRooms]) => (
        <div key={groupName}>
          {/* Group header */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {groupName} <span className="text-gray-400 font-normal">({groupRooms.length})</span>
          </h3>

          {/* Room grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {groupRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                booking={room.currentBooking}
                onClick={() => onRoomClick?.(room)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

## File: frontend/src/features/rooms/components/RoomStatusBadge.tsx
```typescript
import { Badge } from '../../../components/ui'
import type { RoomStatus } from '../../../types'

interface RoomStatusBadgeProps {
  status: RoomStatus | string
}

const statusConfig: Record<RoomStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  AVAILABLE: { label: 'Available', variant: 'success' },
  OCCUPIED: { label: 'Occupied', variant: 'danger' },
  MAINTENANCE: { label: 'Maintenance', variant: 'warning' },
}

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const config = statusConfig[status as RoomStatus] ?? { label: status || 'Unknown', variant: 'warning' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
```

## File: frontend/src/features/rooms/components/RoomStatusTabs.tsx
```typescript
interface StatusTab {
  key: string
  label: string
  count: number
  color: string
}

interface RoomStatusTabsProps {
  tabs: StatusTab[]
  activeTab: string
  onTabChange: (key: string) => void
}

export function RoomStatusTabs({ tabs, activeTab, onTabChange }: RoomStatusTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="relative z-10">{tab.label}</span>
            <span className={`relative z-10 flex h-6 min-w-[1.5rem] items-center justify-center rounded-lg px-1.5 text-[10px] font-black tabular-nums transition-colors ${
              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
```

## File: frontend/src/features/rooms/components/RoomTable.tsx
```typescript
import { Table, Button } from '../../../components/ui'
import { RoomStatusBadge } from './RoomStatusBadge'
import type { Room } from '../../../types'

interface RoomTableProps {
  rooms: Room[]
  loading?: boolean
  onEdit: (room: Room) => void
  onChangeStatus: (room: Room) => void
}

export function RoomTable({ rooms, loading, onEdit, onChangeStatus }: RoomTableProps) {
  const getRoomTypeName = (room: Room) => room.type?.name ?? 'Unknown type'
  const getRoomCapacity = (room: Room) => room.type?.capacity ?? 0
  const getRoomPrice = (room: Room) => room.type?.price ?? 0

  const columns = [
    {
      key: 'roomNumber',
      header: 'Room Number',
      render: (room: Room) => (
        <span className="font-medium">{room.roomNumber}</span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (room: Room) => getRoomTypeName(room),
    },
    {
      key: 'capacity',
      header: 'Capacity',
      render: (room: Room) => `${getRoomCapacity(room)} guests`,
    },
    {
      key: 'price',
      header: 'Price/Night',
      render: (room: Room) => `$${getRoomPrice(room).toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (room: Room) => <RoomStatusBadge status={room.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (room: Room) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(room)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onChangeStatus(room)}>
            Change Status
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={rooms}
      keyExtractor={(room) => room.id}
      loading={loading}
      emptyMessage="No rooms found"
    />
  )
}
```

## File: frontend/src/layouts/AdminLayout.tsx
```typescript
import { useMemo, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Phòng nghỉ', href: '/rooms', icon: 'bed' },
  { name: 'Đặt phòng', href: '/bookings', icon: 'book_online' },
]

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const currentPage = useMemo(() => {
    const activeItem = navigation.find((item) => pathname.startsWith(item.href))
    return activeItem?.name ?? 'Dashboard'
  }, [pathname])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white transition-all duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-500/20">
            <span className="material-symbols-outlined text-[24px]">apartment</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Grand <span className="text-primary-400">Hub</span></span>
        </div>

        <div className="mt-4 flex-1 px-4 py-4">
          <p className="mb-4 px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Menu quản trị</p>
          <nav className="space-y-1.5">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className={`material-symbols-outlined text-[22px] transition-colors`}>
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-slate-800/50 p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold text-primary-400 border border-slate-600">
                {user.initials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{user.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700/50 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{currentPage}</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Trang chủ</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary-600">{currentPage}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] font-medium text-green-600 flex items-center justify-end gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Đang trực tuyến
                </p>
              </div>
              <img 
                src={`https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=2563eb&bold=true`} 
                className="h-10 w-10 rounded-xl border-2 border-white shadow-sm"
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
```

## File: frontend/src/types/booking.ts
```typescript
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface RoomShort {
  id: number
  roomNumber: string
  type?: {
    name: string
  }
  roomType?: {
    name: string
  }
}

export interface Booking {
  id: number
  userId: number
  room: RoomShort | null
  checkIn: string
  checkOut: string
  status: BookingStatus
}

export interface CreateBookingRequest {
  userId?: number
  guestName?: string
  phoneNumber?: string
  email?: string
  roomId: number
  checkIn: string
  checkOut: string
}

export interface UpdateBookingRequest {
  status: BookingStatus
}
```

## File: frontend/vite.config.ts
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

## File: frontend/package.json
```json
{
  "name": "hotel-management-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@fontsource/inter": "^5.2.8",
    "@hookform/resolvers": "^3.9.0",
    "@tanstack/react-query": "^5.56.2",
    "axios": "^1.7.7",
    "material-symbols": "^0.40.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-router-dom": "^6.26.2",
    "zod": "^3.23.8",
    "zustand": "^4.5.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.11.1",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.11.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.12",
    "globals": "^15.9.0",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.7.0",
    "vite": "^5.4.8",
    "vitest": "^2.1.9"
  }
}
```

## File: frontend/src/App.tsx
```typescript
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import RoomListPage from './features/rooms/pages/RoomListPage'
import BookingListPage from './features/bookings/pages/BookingListPage'
import LoginPage from './features/auth/LoginPage'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { PublicOnlyRoute } from './features/auth/PublicOnlyRoute'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomListPage />} />
          <Route path="bookings" element={<BookingListPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
```

## File: frontend/src/features/bookings/hooks/useBookings.ts
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockBookingsList } from '../../../data/mockData'
import type { Booking, CreateBookingRequest, UpdateBookingRequest } from '../../../types'

// Use mock data for demo - replace with API calls in production
const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

async function readJsonSafely(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

async function loadBookingsFromApi() {
  const response = await fetch('/api/bookings')
  const payload = await readJsonSafely(response)

  if (!response.ok || !Array.isArray(payload)) {
    if (!USE_DEV_FALLBACK) {
      throw new Error('Khong tai duoc danh sach bookings tu API.')
    }

    console.warn('Bookings API unavailable, using mock bookings for frontend flow.')
    return mockBookingsList
  }

  return payload.filter(isBookingLike) as Booking[]
}

function isBookingLike(value: unknown): value is Booking {
  if (!value || typeof value !== 'object') {
    return false
  }

  const booking = value as Partial<Booking>

  return typeof booking.id === 'number' && typeof booking.checkIn === 'string' && typeof booking.checkOut === 'string' && typeof booking.status === 'string'
}

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async (): Promise<Booking[]> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockBookingsList
      }

      return loadBookingsFromApi()
    },
  })
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: async (): Promise<Booking | undefined> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockBookingsList.find((booking) => booking.id === id)
      }

      const response = await fetch(`/api/bookings/${id}`)
      const payload = await readJsonSafely(response)

      if (!response.ok || !payload || Array.isArray(payload)) {
        if (!USE_DEV_FALLBACK) {
          throw new Error(`Khong tai duoc booking #${id} tu API.`)
        }

        return mockBookingsList.find((booking) => booking.id === id)
      }

      return payload as Booking
    },
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBookingRequest) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock create booking:', data)
        return { id: Date.now(), ...data, status: 'PENDING' }
      }
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateBookingRequest }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock update booking:', id, data)
        const booking = mockBookingsList.find((b) => b.id === id)
        return { ...booking, ...data }
      }
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock cancel booking:', id)
        const booking = mockBookingsList.find((b) => b.id === id)
        return { ...booking, status: 'CANCELLED' }
      }
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
```

## File: frontend/src/features/rooms/hooks/useRooms.ts
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockRooms } from '../../../data/mockData'
import type { RoomStatus, Room, UpdateRoomRequest } from '../../../types'

// Use mock data for demo - replace with API calls in production
const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_FALLBACK !== 'false'

async function readJsonSafely(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

function getMockRooms(status?: RoomStatus) {
  if (status) {
    return mockRooms.filter((room) => room.status === status)
  }

  return mockRooms
}

async function loadRoomsFromApi(status?: RoomStatus) {
  const response = await fetch(`/api/rooms${status ? `?status=${status}` : ''}`)
  const payload = await readJsonSafely(response)

  if (!response.ok || !Array.isArray(payload)) {
    if (!USE_DEV_FALLBACK) {
      throw new Error('Khong tai duoc danh sach rooms tu API.')
    }

    console.warn('Rooms API unavailable, using mock rooms for frontend flow.')
    return getMockRooms(status)
  }

  return payload.filter(isRoomLike) as Room[]
}

function isRoomLike(value: unknown): value is Room {
  if (!value || typeof value !== 'object') {
    return false
  }

  const room = value as Partial<Room>

  return typeof room.id === 'number' && typeof room.roomNumber === 'string' && typeof room.status === 'string'
}

export function useRooms(status?: RoomStatus) {
  return useQuery({
    queryKey: ['rooms', status],
    queryFn: async (): Promise<Room[]> => {
      if (USE_MOCK) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        return getMockRooms(status)
      }

      return loadRoomsFromApi(status)
    },
  })
}

export function useRoom(id: number) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: async (): Promise<Room | undefined> => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockRooms.find((room) => room.id === id)
      }

      const response = await fetch(`/api/rooms/${id}`)
      const payload = await readJsonSafely(response)

      if (!response.ok || !payload || Array.isArray(payload)) {
        if (!USE_DEV_FALLBACK) {
          throw new Error(`Khong tai duoc room #${id} tu API.`)
        }

        return mockRooms.find((room) => room.id === id)
      }

      return payload as Room
    },
    enabled: !!id,
  })
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { roomNumber: string; roomTypeId: number; status: RoomStatus }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock create room:', data)
        return { id: Date.now(), ...data }
      }
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useUpdateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateRoomRequest }) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock update room:', id, data)
        const room = mockRooms.find((r) => r.id === id)
        return { ...room, ...data }
      }
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}

export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log('Mock delete room:', id)
        return
      }
      await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
```

## File: frontend/src/features/rooms/pages/RoomListPage.tsx
```typescript
import { useState, useMemo } from 'react'
import { RoomStatusTabs, RoomGridView, RoomTable, RoomFormModal, ChangeStatusModal } from '../components'
import { useRooms, useUpdateRoom } from '../hooks/useRooms'
import { mockBookings } from '../../../data/mockData'
import { Button } from '../../../components/ui'
import type { Room, RoomStatus } from '../../../types'

type FilterType = 'booking' | 'type' | 'floor' | 'room'
type ViewMode = 'grid' | 'list'
type StatusFilter = 'all' | 'available' | 'reserved' | 'checkin' | 'occupied' | 'checkout' | 'dirty'

export default function RoomListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeFilter] = useState<FilterType>('floor')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchValue, setSearchValue] = useState('')
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const { data: rooms = [], isLoading } = useRooms()
  const updateRoom = useUpdateRoom()

  const statusCounts = useMemo(() => {
    const counts = { all: rooms.length, available: 0, reserved: 0, checkin: 0, occupied: 0, checkout: 0, dirty: 0 }
    rooms.forEach((room) => {
      if (room.status === 'AVAILABLE') counts.available++
      else if (room.status === 'OCCUPIED') counts.occupied++
      else if (room.status === 'MAINTENANCE') counts.dirty++
    })
    return counts
  }, [rooms])

  const statusTabs = [
    { key: 'all', label: 'Tất cả', count: statusCounts.all, color: 'text-slate-600' },
    { key: 'available', label: 'Sẵn sàng', count: statusCounts.available, color: 'text-emerald-600' },
    { key: 'occupied', label: 'Đang ở', count: statusCounts.occupied, color: 'text-rose-600' },
    { key: 'dirty', label: 'Bảo trì', count: statusCounts.dirty, color: 'text-slate-400' },
  ]

  const filteredRooms = useMemo(() => {
    let result = rooms
    if (statusFilter === 'available') result = result.filter((r) => r.status === 'AVAILABLE')
    else if (statusFilter === 'occupied') result = result.filter((r) => r.status === 'OCCUPIED')
    else if (statusFilter === 'dirty') result = result.filter((r) => r.status === 'MAINTENANCE')
    if (searchValue) result = result.filter((r) => r.roomNumber.toLowerCase().includes(searchValue.toLowerCase()))
    return result
  }, [rooms, statusFilter, searchValue])

  const roomsWithBookings = useMemo(() => {
    return filteredRooms.map((room) => ({
      ...room,
      currentBooking: room.status === 'OCCUPIED' ? mockBookings[room.id] : undefined,
    }))
  }, [filteredRooms])

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room)
    setStatusModalOpen(true)
  }

  const handleStatusUpdate = (status: RoomStatus) => {
    if (selectedRoom) {
      updateRoom.mutate(
        { id: selectedRoom.id, data: { status } },
        {
          onSuccess: () => {
            setStatusModalOpen(false)
            setSelectedRoom(null)
          },
        }
      )
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic text-slate-900 tracking-tight uppercase">Sơ đồ phòng nghỉ</h1>
          <p className="mt-1 text-slate-500 font-medium">Theo dõi và vận hành trạng thái phòng thời gian thực.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setViewMode('grid')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">view_list</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className="space-y-6">
        {/* Filter Toolbar */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center">
          <div className="flex-1 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
            <RoomStatusTabs
              tabs={statusTabs}
              activeTab={statusFilter}
              onTabChange={(key) => setStatusFilter(key as StatusFilter)}
            />
          </div>
          
          <div className="xl:w-80 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center px-4 group focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary-600 transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Tìm số phòng..."
              className="w-full bg-transparent border-none outline-none px-3 py-2 text-sm font-bold text-slate-900 placeholder:text-slate-300"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Button 
            onClick={() => setFormModalOpen(true)}
            className="rounded-2xl bg-slate-900 py-6 px-6 shadow-xl shadow-slate-200"
          >
            <span className="material-symbols-outlined mr-2">add</span>
            Thêm Phòng
          </Button>
        </div>

        {/* Room Display Area */}
        <div className="min-h-[400px]">
          {viewMode === 'grid' ? (
            <RoomGridView
              rooms={roomsWithBookings}
              loading={isLoading}
              groupBy={activeFilter === 'floor' ? 'floor' : 'type'}
              onRoomClick={handleRoomClick}
            />
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <RoomTable
                rooms={filteredRooms}
                loading={isLoading}
                onEdit={(room) => { setSelectedRoom(room); setFormModalOpen(true); }}
                onChangeStatus={handleRoomClick}
              />
            </div>
          )}
        </div>
      </div>

      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => { setFormModalOpen(false); setSelectedRoom(null); }}
        onSubmit={(data) => { console.log('Form submitted:', data); setFormModalOpen(false); setSelectedRoom(null); }}
        room={selectedRoom || undefined}
      />

      <ChangeStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => { setStatusModalOpen(false); setSelectedRoom(null); }}
        onSubmit={handleStatusUpdate}
        room={selectedRoom}
        loading={updateRoom.isPending}
      />
    </div>
  )
}
```

## File: frontend/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-900;
  font-family: "Inter", sans-serif;
}

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    font-variation-settings:
            "FILL" 0,
            "wght" 400,
            "GRAD" 0,
            "opsz" 24;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-top {
  from { transform: translateY(-0.5rem); }
  to { transform: translateY(0); }
}

.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: forwards;
}

.fade-in {
  animation-name: fade-in;
}

.slide-in-from-top-1 {
  animation-name: slide-in-from-top;
}

.slide-in-from-top-2 {
  animation-name: slide-in-from-top;
  animation-duration: 500ms;
}
```

## File: frontend/src/main.tsx
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { AuthProvider } from './features/auth/AuthProvider'
import './index.css'
import 'material-symbols'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
```
