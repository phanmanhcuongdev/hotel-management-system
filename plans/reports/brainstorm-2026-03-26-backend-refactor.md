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
