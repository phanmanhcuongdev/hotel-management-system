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
