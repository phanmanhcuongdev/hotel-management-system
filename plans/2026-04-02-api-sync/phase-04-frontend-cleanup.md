# Phase 04: Frontend Cleanup — Connect Real APIs, Remove Mocks

## Context
- `frontend/src/features/rooms/hooks/useRooms.ts`
- `frontend/src/features/bookings/hooks/useBookings.ts`
- `frontend/src/features/rooms/pages/RoomListPage.tsx`
- `frontend/src/types/booking.ts`
- `frontend/src/types/room.ts`
- `frontend/src/data/mockData.ts`
- `frontend/src/api/client.ts`

## Overview
- **Date**: 2026-04-02
- **Priority**: HIGH
- **Status**: DONE
- **Goal**: Frontend kết nối API thật 100%, loại bỏ mock branches và console.log

## Architecture

### Modified Hooks
```typescript
// useRooms.ts - BEFORE
const USE_MOCK = false
const USE_DEV_FALLBACK = import.meta.env.DEV && ...
if (USE_MOCK) { console.log('Mock create room:', data); ... }

// useRooms.ts - AFTER
// Hoàn toàn gỡ bỏ mock branches
async function createRoom(data: CreateRoomRequest) {
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create room')
  return response.json()
}
```

### Modified Types
```typescript
// room.ts - giữ nguyên (OCCUPIED đã align)
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'

// booking.ts - giữ nguyên (COMPLETED đã align)
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

// CreateBookingRequest - align với backend
export interface CreateBookingRequest {
  userId?: number      // optional, backend gán từ auth context
  guestName: string    // required
  phoneNumber: string  // required
  email?: string       // optional
  roomId: number
  checkIn: string
  checkOut: string
}
```

### Files to Modify
1. `frontend/src/features/rooms/hooks/useRooms.ts` — gỡ mock, gọi real API
2. `frontend/src/features/bookings/hooks/useBookings.ts` — gỡ mock, gọi real API
3. `frontend/src/features/rooms/pages/RoomListPage.tsx` — gỡ mockBookings, console.log
4. `frontend/src/data/mockData.ts` — có thể xóa hoặc giữ lại cho dev fallback không được
5. `frontend/src/types/booking.ts` — align với backend response
6. `frontend/src/types/room.ts` — kiểm tra align

### Files to Check (for console.log)
- `frontend/src/features/rooms/components/RoomFormModal.tsx` — check console.log
- `frontend/src/features/rooms/components/ChangeStatusModal.tsx` — check console.log
- Các components khác có thể có console.log liên quan đến form submit

## Related Code Files
```
frontend/src/
├── features/
│   ├── rooms/
│   │   ├── hooks/
│   │   │   └── useRooms.ts           # MODIFIED - gỡ mock
│   │   └── pages/
│   │       └── RoomListPage.tsx      # MODIFIED - gỡ mockBookings, console.log
│   └── bookings/
│       └── hooks/
│           └── useBookings.ts        # MODIFIED - gỡ mock
├── components/
│   └── ui/                           # check các component có console.log
├── data/
│   └── mockData.ts                   # MODIFIED or DELETED
├── types/
│   ├── booking.ts                    # MODIFIED - align types
│   └── room.ts                       # MODIFIED - align types
└── api/
    └── client.ts                     # keep as-is
```

## Implementation Steps

### 1. Update useRooms.ts
- Gỡ bỏ `USE_MOCK = false` constant
- Gỡ bỏ `USE_DEV_FALLBACK` logic
- Gỡ bỏ `readJsonSafely` (hoặc giữ nếu vẫn cần cho error handling)
- Gỡ bỏ `isRoomLike` type guard (hoặc giữ cho safety)
- Gỡ bỏ mock branches trong tất cả functions
- Gỡ bỏ `console.warn` fallback messages
- Chỉ gọi real API endpoints
- Import types từ `../../../types` (đã có)

### 2. Update useBookings.ts
- Gỡ bỏ `USE_MOCK = false` constant
- Gỡ bỏ `USE_DEV_FALLBACK` logic
- Gỡ bỏ mock branches trong tất cả functions
- Gỡ bỏ `console.warn` fallback messages
- Chỉ gọi real API endpoints
- Update `CreateBookingRequest` body để include guest fields

### 3. Update RoomListPage.tsx
- Gỡ bỏ `import { mockBookings }` từ `../../../data/mockData`
- Gỡ bỏ `roomsWithBookings` useMemo dùng `mockBookings`
- Hoặc thay `mockBookings[room.id]` bằng API data nếu cần
- Gỡ bỏ `console.log('Form submitted:', data)` trong `RoomFormModal` onSubmit
- Gỡ bỏ bất kỳ console.log nào khác trong page

### 4. Check và update các Modal components
- `RoomFormModal.tsx` — gỡ console.log
- `ChangeStatusModal.tsx` — gỡ console.log
- Kiểm tra các component khác trong `rooms/components/`

### 5. Update types (nếu cần)
- `booking.ts` — đảm bảo `CreateBookingRequest` có guest fields
- `room.ts` — đảm bảo `RoomStatus` có `OCCUPIED`
- Backend phase 01/02 đã thêm OCCUPIED và COMPLETED nên types frontend đã đúng

### 6. MockData handling
- Có thể XÓA `mockData.ts` hoàn toàn nếu không còn dùng
- Hoặc giữ lại nhưng REMOVE all exports và comment out để tránh accidentally import

### 7. Auth integration (nếu chưa có)
- Kiểm tra `AuthProvider` đã call `/api/auth/login` chưa
- Nếu chưa, update để call real API
- Đảm bảo token được lưu và inject vào `apiClient`

## Todo List
- [ ] Gỡ mock branches trong useRooms.ts
- [ ] Gỡ mock branches trong useBookings.ts
- [ ] Gỡ mockBookings import và usage trong RoomListPage.tsx
- [ ] Gỡ console.log trong RoomListPage.tsx
- [ ] Gỡ console.log trong RoomFormModal.tsx (nếu có)
- [ ] Gỡ console.log trong ChangeStatusModal.tsx (nếu có)
- [ ] Update CreateBookingRequest để include guest fields
- [ ] Verify RoomStatus có OCCUPIED (đã align từ phase 01)
- [ ] Verify BookingStatus có COMPLETED (đã align từ phase 02)
- [ ] Delete hoặc empty mockData.ts
- [ ] Update AuthProvider để call /api/auth/login (nếu chưa)
- [ ] Verify apiClient inject Authorization header đúng

## Success Criteria
1. Tất cả `USE_MOCK` và `USE_DEV_FALLBACK` branches đã gỡ
2. Không còn `console.log` liên quan đến mock trong hooks
3. Không còn `mockBookings` hay `mockRooms` imports trong production code
4. `RoomListPage` không dùng `mockBookings` cho display data
5. Tất cả form submit gọi API thật thay vì console.log
6. Frontend types align hoàn toàn với backend enums
7. Auth login gọi `/api/auth/login` thật

## Risk Assessment
- **Risk**: Frontend code vẫn dùng mock data sau khi xóa mock branches
  - **Impact**: HIGH — App crash hoặc show empty data
  - **Mitigation**: Thorough testing sau khi gỡ mock
- **Risk**: API response format không match frontend expectations
  - **Impact**: MEDIUM — Type errors hoặc undefined values
  - **Mitigation**: Verify response DTOs match frontend types
- **Risk**: Gỡ mock nhưng chưa có backend — app không hoạt động
  - **Impact**: MEDIUM — Development blocked
  - **Mitigation**: Phải hoàn thành phase 01-03 trước phase 04

## Security Considerations
- Token storage: localStorage là acceptable cho demo, production nên use httpOnly cookie
- API errors: hiển thị user-friendly error messages thay vì console.error
- Authorization: frontend guards vẫn cần backend verification

## Next Steps
Sau khi hoàn thành phase 04 → Toàn bộ hệ thống chạy end-to-end không mock data
