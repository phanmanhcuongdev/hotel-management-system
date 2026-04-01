# Plan: API Sync — Backend ↔ Frontend

## Overview
Sync API end-to-end, loại bỏ mock data và console.log, hệ thống chạy thật từ DB đến UI.

## Nguyên tắc thực hiện
1. **Backend trước, frontend sau** — backend là source of truth
2. **Vertical slices** — mỗi phase tự hoàn thiện 1 feature
3. **Không thay đổi database schema** — chỉ thêm ports/adapters/service mới
4. **Align domain model** — thống nhất Booking domain (giữ guestName/phoneNumber/email)
5. **Hexagonal đúng** — thêm ports mới, KHÔNG nhét logic vào controller

---

## Phases

| Phase | File | Status |
|-------|------|--------|
| 01 | `phase-01-backend-rooms-crud.md` | ✅ DONE |
| 02 | `phase-02-backend-bookings-api.md` | ✅ DONE |
| 03 | `phase-03-backend-auth.md` | ✅ DONE |
| 04 | `phase-04-frontend-cleanup.md` | ✅ DONE |

---

## Key Alignment Issues

| Issue | Backend | Frontend | Resolution |
|-------|---------|----------|------------|
| Booking thiếu guest fields | `Booking(id, userId, roomId, checkIn, checkOut, status)` | `CreateBookingRequest(guestName, phoneNumber, email, roomId, ...)` | Thêm fields vào domain + JPA entity |
| RoomShortResponse thiếu type | `RoomShortResponse(id, roomNumber)` | `RoomShort { id, roomNumber, type?: { name } }` | Thêm `type.name` vào response |
| RoomStatus mismatch | `AVAILABLE, BOOKED, MAINTENANCE` | `AVAILABLE, OCCUPIED, MAINTENANCE` | Thêm `OCCUPIED` vào enum (BE) |
| BookingStatus mismatch | `PENDING, CONFIRMED, CANCELLED` | `PENDING, CONFIRMED, CANCELLED, COMPLETED` | Thêm `COMPLETED` vào enum (BE) |
| BeanConfig duplicate adapter | 2 instance `RoomPersistenceAdapter` | — | Shared single instance |
| Frontend mock branches | — | `USE_MOCK`, `USE_DEV_FALLBACK`, `console.log` | Gỡ bỏ hoàn toàn |

---

## Risks
- Schema cũ (`tbl*`, FLOAT) không khớp JPA entities — phase 1-3 giả định schema mới đã có
- Backend không có auth token verification — phase 3 thêm `/api/auth/login` cơ bản

## Next Steps
Sau khi hoàn thành cả 4 phases → hệ thống chạy end-to-end không mock
