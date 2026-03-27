# Team split plan - 5 members

## Problem
- Frontend chưa thật sự ổn định, vẫn còn mock/fallback che integration bug.
- Backend mới là skeleton: mới có `GET /api/rooms` và `POST /api/bookings`.
- FE/BE contract đang lệch ở auth, bookings, rooms, status enum, kiểu ID, payload tạo booking.
- Nếu chia 5 người mà không khóa boundary trước, team sẽ đạp chân nhau rất mạnh.

## Hard truths
- Đây không phải kiểu "chia 5 người làm mạnh là xong nhanh". Nếu contract chưa chốt, 5 người chỉ giúp tạo ra 5 hướng sai nhanh hơn.
- Backend hiện chưa đủ để nuôi frontend thật.
- Frontend nhìn chạy được một phần không có nghĩa integration đã ổn.
- Chỉ 1 người frontend là hơi mỏng; cần 1 người fullstack lead hỗ trợ integration thật.

## Approaches considered

### Option A - Functional split with contract-first (Recommended)
- Chia theo workstream: contract, persistence, rooms API, bookings API, auth/platform, frontend integration.
- Pros:
  - ít overlap nhất
  - dễ review ownership
  - hợp KISS nhất
- Cons:
  - phụ thuộc mạnh vào tech lead giữ contract

### Option B - Split by layer only
- 2 FE, 2 BE, 1 DevOps/lead.
- Pros:
  - dễ hiểu tổ chức
- Cons:
  - dễ sinh bottleneck ở contract
  - FE/BE dễ chờ nhau

### Option C - Split by feature vertical only
- mỗi người ôm auth/rooms/bookings/dashboard/infra.
- Pros:
  - end-to-end ownership
- Cons:
  - không hợp repo hiện tại vì persistence và contract đang sai gốc
  - duplicate fix, duplicate mapping, rework cao

## Recommended solution
- Chọn **Option A**: contract-first + workstream ownership rõ.
- Source of truth: dùng DB/schema hiện tại làm gốc cho vòng này, không redesign DB toàn phần.
- Ưu tiên roadmap: `contract -> persistence -> rooms -> bookings -> auth -> frontend integration -> hardening`.

## Work split for 5 members

### Dev 1 - Tech lead / fullstack integration owner
- Chốt contract FE/BE
- giữ OpenAPI/spec/examples
- review boundary PR giữa frontend/backend
- cầm integration branch
- hỗ trợ frontend 30-40% thời gian

### Dev 2 - Backend persistence + rooms
- audit schema thật vs entity hiện tại
- refactor persistence cho khớp schema
- hoàn thiện rooms API: list/detail/create/update
- phối hợp Dev 5 để chốt room DTO

### Dev 3 - Backend bookings
- hoàn thiện bookings API: list/detail/create/update status
- xử lý business rules tối thiểu: ngày ở, status, availability
- chuẩn hóa booking response shape

### Dev 4 - Backend auth + platform
- login endpoint
- password hash, token/session tối thiểu
- auth guard `/api/**`
- env/secrets cho datasource/JWT
- CI: test/lint/build quality gates

### Dev 5 - Frontend owner
- unify API layer qua `apiClient`
- bỏ mock/fallback mặc định
- nối auth thật vào login/session/guard
- hoàn thiện rooms/bookings screens theo API thật
- dọn type mismatch `type` vs `roomType`, `userId` vs guest info

## What backend still needs
- persistence alignment với schema thật
- rooms API đầy đủ tối thiểu
- bookings API đầy đủ tối thiểu
- auth tối thiểu
- validation/error contract thống nhất
- env/secrets + CI quality gates

## What frontend still needs
- bỏ direct `fetch` rải rác, unify qua `apiClient`
- bỏ fallback/mock mặc định ở integration flow
- chuẩn hóa model dữ liệu
- nối auth thật
- dọn crash path còn sót ở modal/form/error states
- thêm test cho flow chính

## Suggested phases

### Week 1 - Freeze foundation
- chốt contract rooms/bookings/auth
- audit schema-vs-code
- bỏ hardcoded config
- dựng CI verify tối thiểu

### Week 2 - Persistence + Rooms
- Dev 2 làm persistence + rooms API
- Dev 5 refactor FE API layer/types
- Dev 1 giữ contract/review

### Week 3 - Bookings
- Dev 3 làm bookings API
- Dev 5 nối bookings UI với API thật
- Dev 2 sửa fallout từ schema mapping

### Week 4 - Auth
- Dev 4 làm auth backend
- Dev 5 nối login/session/logout/protected routes
- Dev 1 kiểm integration end-to-end

### Week 5 - Stabilization
- giảm/tắt mock fallback mặc định
- test end-to-end tay + integration tests
- bug bash

### Week 6 - Buffer
- fix bug integration
- chốt docs/dev setup/release candidate

## Risks
- contract create booking chưa chốt: `userId` hay guest info
- room ID/schema mapping có thể lệch mạnh với FE types hiện tại
- auth scope nở nếu cố làm quá sâu
- mock fallback che integration bug
- 5 người merge song song mà không có CI sẽ rất dễ phá nhau

## Anti-patterns to avoid
- làm song song khi chưa freeze contract
- vá controller trước khi sửa persistence gốc
- nuôi nhiều shape cho cùng 1 DTO quá lâu
- để fallback/mock bật mặc định
- redesign DB toàn phần trong vòng này
- thêm hard delete cho room quá sớm

## Success metrics
- FE chạy với API thật, không phụ thuộc mock mặc định
- login thật hoạt động
- rooms + bookings flow chạy end-to-end
- build/test/lint xanh trong CI
- không còn secret hardcode
- PR ownership rõ, ít conflict chéo

## Next steps
1. Chốt payload `create booking`
2. Chốt enum/status/ID contract
3. Lập backlog theo từng dev + tuần
4. Bắt đầu từ persistence/contract, không bắt đầu từ UI polish
