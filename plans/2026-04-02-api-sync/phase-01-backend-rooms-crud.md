# Phase 01: Backend Rooms CRUD API

## Context
- `backend/src/main/java/com/hotel/backend/adapter/in/web/RoomController.java`
- `backend/src/main/java/com/hotel/backend/application/domain/model/Room.java`
- `backend/src/main/java/com/hotel/backend/application/domain/model/RoomStatus.java`
- `backend/src/main/java/com/hotel/backend/application/domain/model/RoomType.java`
- `backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomsPort.java`
- `backend/src/main/java/com/hotel/backend/application/port/out/LoadRoomPort.java`
- `backend/src/main/java/com/hotel/backend/adapter/out/persistence/RoomPersistenceAdapter.java`
- `backend/src/main/java/com/hotel/backend/config/BeanConfig.java`

## Overview
- **Date**: 2026-04-02
- **Priority**: HIGH
- **Status**: pending
- **Goal**: Backend cung cấp đầy đủ Rooms CRUD endpoints + shared adapter instance

## Key Insights
1. Hiện tại chỉ có `GET /api/rooms` — thiếu CRUD operations khác
2. `RoomStatus` backend chỉ có `AVAILABLE, BOOKED, MAINTENANCE` — frontend cần `OCCUPIED`
3. `BeanConfig` tạo 2 instance `RoomPersistenceAdapter` (1 cho LoadRoomsPort, 1 cho LoadRoomPort) — nên share 1 instance
4. `RoomShortResponse` thiếu `type.name` — frontend Booking model cần `room.type.name`
5. Chưa có `SaveRoomPort` — cần tạo port mới cho update/create room

## Requirements
- `GET /api/rooms/{id}` — lấy 1 room theo id, trả `RoomResponse` (có type.name)
- `POST /api/rooms` — tạo room mới, body `{roomNumber, roomTypeId, status}`
- `PUT /api/rooms/{id}` — update room, body `{roomNumber?, roomTypeId?, status?}`
- `DELETE /api/rooms/{id}` — xóa room (soft delete hoặc hard delete tùy DB)
- Thêm `OCCUPIED` vào `RoomStatus` enum
- Shared `RoomPersistenceAdapter` instance trong BeanConfig
- `RoomResponse.type` phải include `name`

## Architecture

### New Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/rooms/{id}` | Get single room |
| POST | `/api/rooms` | Create room |
| PUT | `/api/rooms/{id}` | Update room |
| DELETE | `/api/rooms/{id}` | Delete room |

### New / Modified Ports
```java
// New port
public interface SaveRoomPort {
    Room save(Room room);           // create
    Room update(Room room);         // update
    void deleteById(Long roomId);   // delete
}

// Modified ports - NO CHANGES needed, just shared adapter
public interface LoadRoomsPort { ... }
public interface LoadRoomPort { ... }
```

### New DTOs
```java
record CreateRoomRequest(
    @NotNull String roomNumber,
    @NotNull Long roomTypeId,
    @NotNull RoomStatus status
)

record UpdateRoomRequest(
    String roomNumber,
    Long roomTypeId,
    RoomStatus status
)
```

### Modified Files
1. `RoomStatus.java` — thêm `OCCUPIED`
2. `RoomController.java` — thêm GET/{id}, POST, PUT/{id}, DELETE/{id}
3. `RoomWebMapper.java` — cần tạo nếu chưa có, để map request → domain
4. `RoomResponse.java` — đảm bảo include `type.name` (đã có `RoomTypeResponse type`)
5. `RoomShortResponse.java` — thêm `typeName` field
6. `RoomPersistenceAdapter.java` — implement `SaveRoomPort`
7. `SpringDataRoomRepository.java` — thêm `findByRoomNumber`, `existsByRoomNumber`
8. `BeanConfig.java` — shared single `RoomPersistenceAdapter` instance, thêm `SaveRoomPort` bean

### New Files
1. `CreateRoomRequest.java` (dto)
2. `UpdateRoomRequest.java` (dto)
3. `SaveRoomPort.java` (port)
4. `RoomService.java` (application/domain/service) — domain logic cho CRUD
5. `GetRoomUseCase.java` (port/in) — nếu cần tách use case

## Related Code Files
```
backend/src/main/java/com/hotel/backend/
├── adapter/
│   ├── in/web/
│   │   ├── RoomController.java        # MODIFIED - add CRUD endpoints
│   │   ├── RoomWebMapper.java         # MODIFIED - map requests to domain
│   │   └── dto/
│   │       ├── CreateRoomRequest.java  # NEW
│   │       └── UpdateRoomRequest.java # NEW
│   └── out/persistence/
│       ├── RoomPersistenceAdapter.java # MODIFIED - implement SaveRoomPort
│       └── SpringDataRoomRepository.java # MODIFIED - add query methods
├── application/
│   ├── domain/
│   │   ├── model/
│   │   │   └── RoomStatus.java        # MODIFIED - add OCCUPIED
│   │   └── service/
│   │       └── RoomService.java       # NEW - domain logic
│   └── port/
│       ├── in/
│       │   └── GetRoomUseCase.java    # NEW (optional)
│       └── out/
│           └── SaveRoomPort.java      # NEW
└── config/
    └── BeanConfig.java                # MODIFIED - shared adapter, new beans
```

## Implementation Steps

1. **Thêm OCCUPIED vào RoomStatus enum**
   - File: `RoomStatus.java`
   - Thêm `OCCUPIED` vào enum values

2. **Tạo SaveRoomPort interface**
   - File: `SaveRoomPort.java`
   - Định nghĩa 3 methods: `save`, `update`, `deleteById`

3. **Tạo DTOs**
   - File: `CreateRoomRequest.java` với `@NotNull roomNumber, roomTypeId, status`
   - File: `UpdateRoomRequest.java` với optional fields

4. **Thêm query methods vào SpringDataRoomRepository**
   - `findByRoomNumber(String roomNumber)`
   - `existsByRoomNumber(String roomNumber)`

5. **Update RoomPersistenceAdapter**
   - Implement `SaveRoomPort`
   - Cần load `RoomType` khi tạo Room mới (cần `SpringDataRoomTypeRepository` hoặc query)

6. **Tạo RoomService**
   - File: `RoomService.java`
   - Logic: validate roomNumber unique, map roomTypeId → RoomType entity
   - KHÔNG nhét logic vào controller

7. **Update RoomController**
   - Thêm `GetRoomUseCase` dependency
   - Thêm `SaveRoomPort` dependency
   - Implement 4 endpoints: GET /{id}, POST, PUT /{id}, DELETE /{id}

8. **Update BeanConfig**
   - Shared single `RoomPersistenceAdapter` instance
   - `LoadRoomsPort` → same adapter instance
   - `LoadRoomPort` → same adapter instance
   - `SaveRoomPort` → same adapter instance
   - `GetRoomUseCase` → new `RoomService` instance
   - `GetRoomsUseCase` → reuse existing service

9. **Update RoomShortResponse**
   - Thêm `typeName: String` field
   - Cập nhật `BookingWebMapper.toResponse()` nếu cần

10. **Update RoomWebMapper**
    - Map `CreateRoomRequest` → domain command
    - Map `UpdateRoomRequest` → domain update

## Todo List
- [ ] Thêm OCCUPIED vào RoomStatus enum
- [ ] Tạo SaveRoomPort interface
- [ ] Tạo CreateRoomRequest và UpdateRoomRequest DTOs
- [ ] Thêm query methods vào SpringDataRoomRepository
- [ ] Update RoomPersistenceAdapter implement SaveRoomPort
- [ ] Tạo RoomService domain logic
- [ ] Update RoomController với 4 endpoints
- [ ] Fix BeanConfig shared adapter instance
- [ ] Thêm typeName vào RoomShortResponse
- [ ] Update RoomWebMapper

## Success Criteria
1. `GET /api/rooms/{id}` trả `RoomResponse` có `type.name`
2. `POST /api/rooms` tạo room mới, trả `RoomResponse`
3. `PUT /api/rooms/{id}` update room, trả `RoomResponse` updated
4. `DELETE /api/rooms/{id}` xóa room, trả 204 No Content
5. `RoomStatus` backend có đủ `AVAILABLE, BOOKED, OCCUPIED, MAINTENANCE`
6. BeanConfig chỉ tạo 1 instance `RoomPersistenceAdapter`
7. `RoomShortResponse` có `typeName` field
8. Frontend `useRoom(id)` hook có thể gọi được `/api/rooms/{id}`

## Risk Assessment
- **Risk**: Schema cũ không có bảng `room_types` hoặc thiếu cột
  - **Impact**: HIGH — JPA query sẽ fail
  - **Mitigation**: Phase này giả định schema mới đã được apply. Ghi chú trong docs.
- **Risk**: Tạo Room mới cần RoomType lookup
  - **Impact**: MEDIUM — Cần thêm query để load RoomType
  - **Mitigation**: Thêm `SpringDataRoomTypeRepository` nếu chưa có

## Security Considerations
- Validate `roomNumber` unique trước khi tạo/update
- Validate `roomTypeId` tồn tại trước khi tạo room
- Authorization: chỉ authenticated users được CRUD rooms (phase 3 sẽ thêm auth)

## Next Steps
- Phase 02: Backend Bookings API — thêm guest contact fields, list/update bookings endpoints
