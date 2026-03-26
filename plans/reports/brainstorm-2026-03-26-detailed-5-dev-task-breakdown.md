# Detailed task breakdown for 5 developers

## Goal
- Hoàn thiện backend đủ dùng cho frontend admin hiện tại.
- Refactor vừa đủ để tránh làm lại 2 lần.
- Giảm mock/fallback, tăng integration thật.

## Assumptions
- Không redesign toàn bộ database trong vòng này.
- Chỉ ưu tiên 3 domain chính: `auth`, `rooms`, `bookings`.
- Những phần như `bill`, `service`, `hotel`, `client` full flow tạm chưa làm nếu chưa cần cho UI hiện tại.

## Shared rules for all 5 dev
- Không tự ý đổi API contract sau khi đã chốt.
- Không merge code chưa qua build/lint/test tối thiểu.
- Nếu phát hiện mismatch FE/BE, báo lại Dev 1 trước khi tự sửa ở local theo ý riêng.
- Boundary rule:
  - Backend không đoán UI.
  - Frontend không đoán API.
  - Contract là nguồn sự thật.

## Dev 1 - Tech lead / Integration owner

### Mục tiêu
- Giữ cả đội đi cùng một hướng.
- Chặn rework do lệch contract.

### Việc chính
1. Chốt API contract cho:
   - auth login
   - rooms list/detail/create/update
   - bookings list/detail/create/update status
2. Chốt shape response/error chung.
3. Chốt enum dùng chung:
   - room status
   - booking status
4. Chốt payload `create booking`:
   - dùng `guestName/phone/email` hay `userId`
5. Viết tài liệu contract ngắn gọn cho team dùng mỗi ngày.
6. Review PR boundary giữa FE và BE.
7. Chạy integration review cuối mỗi phase.

### Deliverables
- 1 file contract/API spec
- 1 bảng mapping FE field <-> BE field <-> DB field
- checklist integration cho cả team

### Không nên làm
- Không tự ôm code quá nhiều feature business.
- Không vừa chốt contract vừa thay liên tục giữa tuần.

## Dev 2 - Backend persistence + Rooms API

### Mục tiêu
- Làm cho backend rooms chạy đúng với DB thật.

### Việc chính
1. Audit entity/repository hiện tại so với schema thật.
2. Refactor persistence layer cho rooms:
   - entity
   - repository
   - mapper
   - persistence adapter
3. Hoàn thiện API rooms:
   - `GET /api/rooms`
   - `GET /api/rooms/{id}`
   - `POST /api/rooms`
   - `PUT/PATCH /api/rooms/{id}`
4. Thêm validation rooms:
   - room number không trùng
   - status hợp lệ
5. Viết test cho rooms service/controller.

### Deliverables
- rooms API usable bằng Postman/Swagger
- test pass cho rooms flow
- DTO rooms thống nhất với frontend

### Cần phối hợp
- Dev 1: contract
- Dev 5: rooms UI fields và error cases

### Không nên làm
- Không tự thêm `DELETE room` nếu business chưa chốt.
- Không để controller chứa business logic.

## Dev 3 - Backend bookings API

### Mục tiêu
- Làm xong flow bookings đủ để frontend dùng thật.

### Việc chính
1. Hoàn thiện persistence/mapping cho bookings.
2. Hoàn thiện API bookings:
   - `GET /api/bookings`
   - `GET /api/bookings/{id}`
   - `POST /api/bookings`
   - `PUT/PATCH /api/bookings/{id}` hoặc `/status`
3. Chốt logic nghiệp vụ tối thiểu:
   - ngày check-in < check-out
   - phòng phải tồn tại
   - trạng thái booking hợp lệ
   - tránh tạo booking vô lý
4. Nếu FE dùng guest info mới:
   - quyết định mapping vào `client/user` như nào
   - nếu chưa đủ domain thì làm adapter tối thiểu, không over-design
5. Viết test cho create/list/update booking.

### Deliverables
- bookings API usable thật
- business rules tối thiểu rõ ràng
- response bookings ổn định cho frontend

### Cần phối hợp
- Dev 1: chốt payload create booking
- Dev 2: room availability / room status impact
- Dev 5: bookings screen needs

### Không nên làm
- Không cố làm full PMS workflow trong vòng này.
- Không tự nghĩ thêm 20 trạng thái booking nếu UI chưa cần.

## Dev 4 - Backend auth + platform + CI

### Mục tiêu
- Làm backend có thể chạy an toàn hơn và deploy/test được.

### Việc chính
1. Bỏ hardcoded config trong `application.yaml`:
   - datasource url
   - username
   - password
   - JWT secret nếu có
2. Làm auth tối thiểu:
   - `POST /api/auth/login`
   - current user/me nếu cần
   - password hash
   - JWT/session filter
3. Bảo vệ `/api/**` cần login.
4. Thêm CI quality gates:
   - backend build
   - backend test
   - frontend lint
   - frontend build/test
5. Hỗ trợ logging/error handling chuẩn hơn.

### Deliverables
- login backend chạy được
- config qua env
- CI có kiểm tra chất lượng tối thiểu

### Cần phối hợp
- Dev 1: auth contract
- Dev 5: login flow frontend

### Không nên làm
- Không lao vào refresh token/RBAC sâu nếu chưa có yêu cầu rõ.
- Không làm auth quá to khi login basic còn chưa xong.

## Dev 5 - Frontend owner

### Mục tiêu
- Làm frontend dùng API thật, ổn định, ít crash.

### Việc chính
1. Gom toàn bộ API call về `apiClient`/shared layer.
2. Bỏ dần `fetch` trực tiếp và bỏ fallback/mock mặc định.
3. Chuẩn hóa types frontend theo contract mới.
4. Nối login thật:
   - login page
   - token/session bootstrap
   - unauthorized handling
   - logout
5. Nối rooms screens với API thật:
   - list
   - detail/edit nếu có
6. Nối bookings screens với API thật:
   - list
   - create
   - update status
7. Dọn crash path còn lại:
   - modal
   - detail component
   - badge/status fallback
8. Viết test cho FE flow chính.

### Deliverables
- frontend không cần mock mặc định để chạy flow chính
- rooms/bookings/auth chạy thật với backend
- UI không trắng trang khi gặp data lạ cơ bản

### Cần phối hợp
- Dev 1: contract
- Dev 2, Dev 3, Dev 4: API readiness theo phase

### Không nên làm
- Không tự đổi field name để “cho chạy tạm”.
- Không giữ song song nhiều model quá lâu (`roomType` vs `type`, `userId` vs guest info).

## Timeline dễ hiểu

### Giai đoạn 1 - Chốt nền tảng
- Dev 1: chốt contract + tài liệu ngắn
- Dev 4: env + CI baseline
- Dev 2/3: audit schema/code mismatch
- Dev 5: audit frontend API usage + type mismatch

### Giai đoạn 2 - Rooms trước
- Dev 2 làm rooms backend xong trước
- Dev 5 nối rooms frontend
- Dev 1 review contract thực tế

### Giai đoạn 3 - Bookings sau
- Dev 3 làm bookings backend
- Dev 5 nối bookings frontend
- Dev 2 hỗ trợ impact từ rooms/status

### Giai đoạn 4 - Auth
- Dev 4 làm auth backend
- Dev 5 nối login/session thật
- Dev 1 review end-to-end

### Giai đoạn 5 - Ổn định
- cả team sửa bug integration
- Dev 4 chốt CI
- Dev 1 chốt release checklist

## Checklist hoàn thành theo người

### Dev 1 xong khi
- contract không đổi nữa
- mọi team đang code cùng 1 DTO/enum
- integration checklist có người dùng được

### Dev 2 xong khi
- rooms API pass test
- FE rooms dùng được API thật

### Dev 3 xong khi
- bookings API pass test
- FE bookings create/list/update chạy được

### Dev 4 xong khi
- login thật chạy được
- env không còn hardcode
- CI có quality gates

### Dev 5 xong khi
- auth/rooms/bookings FE không phụ thuộc mock mặc định
- build pass, UI flow chính không crash

## Risks to tell team early
- Nếu payload create booking không chốt ngay, Dev 3 và Dev 5 sẽ làm lại.
- Nếu schema DB lệch quá sâu với entity hiện tại, Dev 2 sẽ trở thành critical path.
- Nếu auth bị scope creep, Dev 4 sẽ chặn cả team.
- Nếu Dev 5 làm một mình mà không có Dev 1 hỗ trợ integration, FE sẽ chờ backend nhiều.

## Anti-patterns
- mỗi người tự đổi contract theo ý mình
- merge khi chỉ test local happy path
- để mock fallback che bug thật
- làm thêm feature ngoài `auth/rooms/bookings`
- redesign DB toàn bộ trong vòng này

## Immediate action
1. Họp 30-45 phút để chốt contract.
2. Khóa payload create booking.
3. Lập board task theo 5 owner ở trên.
4. Bắt đầu từ persistence + contract, không bắt đầu từ polish UI.
