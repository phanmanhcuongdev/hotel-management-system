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
