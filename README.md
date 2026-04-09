# hotel-management-system

Trang tài liệu dev cho repository này. `docs/` là nguồn sự thật, nên mỗi thay đổi về kiến trúc, API hoặc database cần được cập nhật lại ở đó trước khi merge.

## Chỉ đường tài liệu
- [Project overview & PDR](docs/project-overview-pdr.md)
- [Codebase summary](docs/codebase-summary.md)
- [Code structure & standards](docs/code-standards.md)
- [System architecture & data flow](docs/system-architecture.md)

## Quick start
1. Cài MySQL và tạo schema `hotel_management` theo mô tả trong `database/hotel-management.sql`.
2. Chạy backend: `cd backend && ./mvnw spring-boot:run` với Java 21. Cấu hình datasource và JWT nên được truyền bằng biến môi trường.
3. Chạy frontend: `cd frontend && npm install && npm run dev`. Vite dev server proxy `/api` sang `http://localhost:8080`.
4. Nếu cần hiểu nhanh cấu trúc hệ thống, đọc `docs/system-architecture.md` và `docs/codebase-summary.md`.

## Giữ docs sống
- Mọi thay đổi về kiến trúc, API, database đều phải ghi lại trong `docs/`.
- Nếu cần tạo snapshot phục vụ AI hoặc review, hãy xuất ra file tạm riêng thay vì ghi đè tài liệu chuẩn.
