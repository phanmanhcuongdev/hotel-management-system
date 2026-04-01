# hotel-management-system

Landing page này chỉ dẫn bạn đến `docs/` — nơi giữ **nguồn sự thật** cho kiến trúc, API, database và quy trình QA.

## Tài liệu chính
- [Project overview & PDR](docs/project-overview-pdr.md)
- [Codebase summary](docs/codebase-summary.md)
- [Code structure & standards](docs/code-standards.md)
- [System architecture & data flow](docs/system-architecture.md)

## Quick start
1. **Database**: cài MySQL, tạo schema `hotel_management` theo `database/hotel-management.sql`. Hiện schema dùng bảng `tbl*` và `FLOAT` cho tiền nên cần cân nhắc khi deploy production.
2. **Backend** (Java 21, Spring Boot 4):
   - `cd backend && ./mvnw spring-boot:run`
   - Đặt `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` ngoài file thay vì sửa `application.yaml` (hiện đang hardcode host/credentials).
3. **Frontend** (Vite 5, React 18):
   - `cd frontend && npm install && npm run dev`
   - Vite proxy `/api` → `http://localhost:8080`, nên `fetch('/api/...')` hoặc `apiClient` sẽ tự route.

## Những lưu ý nhanh
- Frontend đã có `ProtectedRoute`/`PublicOnlyRoute` và `AuthProvider`, nhưng backend chỉ mới đủ API cho `GET /api/rooms` + `POST /api/bookings`.
- Phần còn lại (rooms CRUD, booking list/update, auth login) đang mock hoặc chưa có controller; nếu bạn thay đổi API, cập nhật ngay trong `docs/`.
- CI hiện chỉ build & push Docker image khi push lên `main` (`.github/workflows/build-backend.yaml`); không có job lint/test.

## Cam kết docs
`docs/` là nguồn duy nhất cho mọi thay đổi liên quan backend, frontend, database và kiến trúc. Đọc đủ `docs/` trước khi sửa logic hoặc thêm endpoint.
