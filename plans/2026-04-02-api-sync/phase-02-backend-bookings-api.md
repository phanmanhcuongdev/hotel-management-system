# Phase 02: Backend Bookings API + Guest Fields

## Context
- `backend/src/main/java/com/hotel/backend/adapter/in/web/BookingController.java`
- `backend/src/main/java/com/hotel/backend/application/domain/model/Booking.java`
- `backend/src/main/java/com/hotel/backend/application/domain/model/BookingStatus.java`
- `backend/src/main/java/com/hotel/backend/application/domain/service/CreateBookingService.java`
- `backend/src/main/java/com/hotel/backend/application/port/out/SaveBookingPort.java`
- `backend/src/main/java/com/hotel/backend/adapter/out/persistence/BookingPersistenceAdapter.java`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/dto/CreateBookingRequest.java`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/dto/BookingResponse.java`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/dto/RoomShortResponse.java`

## Overview
- **Date**: 2026-04-02
- **Priority**: HIGH
- **Status**: pending
- **Goal**: Backend hỗ trợ đầy đủ Bookings CRUD + guest contact fields + list/update endpoints

## Key Insights
1. **CRITICAL GAP**: Backend `Booking` domain model thiếu hoàn toàn guest contact fields mà frontend cần:
   - `guestName` (required)
   - `phoneNumber` (required)
   - `email` (optional)
2. Frontend `Booking` model có `room: RoomShort | null` nhưng backend `RoomShortResponse` thiếu `typeName`
3. Frontend có `BookingStatus.COMPLETED` nhưng backend chỉ có `PENDING, CONFIRMED, CANCELLED`
4. Backend chưa có `LoadBookingsPort` — chỉ có `SaveBookingPort`
5. Backend chưa có `GetBookingUseCase` — chỉ có `CreateBookingUseCase`
6. Backend chưa có `UpdateBookingUseCase` — booking status update không có
7. JPA `BookingJpaEntity` thiếu guest contact fields

## Requirements
- Thêm `COMPLETED` vào `BookingStatus` enum
- Thêm guest contact fields vào domain model và JPA entity:
  - `guestName: String` (required)
  - `phoneNumber: String` (required)
  - `email: String` (optional)
- Tạo `LoadBookingsPort` interface (query)
- Tạo `LoadBookingPort` interface (query single)
- Tạo `UpdateBookingPort` interface (update status)
- Tạo `GetBookingsUseCase` với `listAll()` và `listByStatus()`
- Tạo `GetBookingUseCase` với `getById()`
- Tạo `UpdateBookingUseCase` với `updateStatus()`
- Update `BookingController` với 4 endpoints:
  - `GET /api/bookings` — list all hoặc filter by status
  - `GET /api/bookings/{id}` — get single booking
  - `PUT /api/bookings/{id}` — update status
  - `POST /api/bookings` — create (đã có, cần update body)
- `RoomShortResponse` phải có `typeName`
- `BookingResponse` phải include guest info

## Architecture

### New Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/bookings` | List all bookings (optional `?status=PENDING`) |
| GET | `/api/bookings/{id}` | Get single booking |
| PUT | `/api/bookings/{id}` | Update booking status |
| POST | `/api/bookings` | Create booking (update: thêm guest fields) |

### New / Modified Ports
```java
// New ports
public interface LoadBookingsPort {
    List<Booking> loadAll();
    List<Booking> loadByStatus(BookingStatus status);
}

public interface LoadBookingPort {
    Optional<Booking> loadById(Long id);
}

public interface UpdateBookingPort {
    Booking updateStatus(Long id, BookingStatus status);
}
```

### Modified Domain Model
```java
// Booking.java - THAY ĐỔI LỚN
record Booking(
    Long id,
    Long userId,           // optional - cho logged-in user
    Long roomId,
    LocalDate checkIn,
    LocalDate checkOut,
    BookingStatus status,
    String guestName,      // NEW - required
    String phoneNumber,    // NEW - required
    String email          // NEW - optional
) {}
```

### New DTOs
```java
// CreateBookingRequest - THAY ĐỔI
record CreateBookingRequest(
    Long userId,           // optional - backend gán từ auth context
    Long roomId,
    LocalDate checkIn,
    LocalDate checkOut,
    String guestName,      // NEW - required
    String phoneNumber,    // NEW - required
    String email           // NEW - optional
)

// BookingResponse - THAY ĐỔI
record BookingResponse(
    Long id,
    Long userId,
    RoomShortResponse room,
    LocalDate checkIn,
    LocalDate checkOut,
    String status,
    String guestName,      // NEW
    String phoneNumber,   // NEW
    String email          // NEW
)

// UpdateBookingRequest - NEW
record UpdateBookingRequest(
    BookingStatus status   // chỉ status được phép update
)
```

### Modified Files
1. `BookingStatus.java` — thêm `COMPLETED`
2. `Booking.java` — thêm guestName, phoneNumber, email
3. `BookingJpaEntity.java` — thêm guest contact columns
4. `BookingMapper.java` — map guest fields
5. `CreateBookingRequest.java` — thêm guest fields
6. `BookingResponse.java` — thêm guest fields
7. `RoomShortResponse.java` — thêm `typeName`
8. `BookingController.java` — thêm GET /, GET /{id}, PUT /{id}
9. `SpringDataBookingRepository.java` — thêm query methods
10. `BookingPersistenceAdapter.java` — implement new ports
11. `BeanConfig.java` — wire new ports/adapters/use cases
12. `CreateBookingService.java` — cập nhật command để include guest fields

## Related Code Files
```
backend/src/main/java/com/hotel/backend/
├── adapter/
│   ├── in/web/
│   │   ├── BookingController.java     # MODIFIED - add GET /, GET /{id}, PUT /{id}
│   │   ├── BookingWebMapper.java      # MODIFIED - map guest fields
│   │   └── dto/
│   │       ├── CreateBookingRequest.java  # MODIFIED - add guest fields
│   │       ├── BookingResponse.java       # MODIFIED - add guest fields
│   │       ├── UpdateBookingRequest.java  # NEW
│   │       └── RoomShortResponse.java    # MODIFIED - add typeName
│   └── out/persistence/
│       ├── BookingPersistenceAdapter.java # MODIFIED - implement new ports
│       ├── BookingJpaEntity.java          # MODIFIED - add guest columns
│       ├── BookingMapper.java             # MODIFIED - map guest fields
│       └── SpringDataBookingRepository.java # MODIFIED - add query methods
├── application/
│   ├── domain/
│   │   ├── model/
│   │   │   ├── Booking.java          # MODIFIED - add guest fields
│   │   │   └── BookingStatus.java    # MODIFIED - add COMPLETED
│   │   └── service/
│   │       ├── CreateBookingService.java   # MODIFIED - pass guest fields
│   │       ├── GetBookingsService.java     # NEW
│   │       └── UpdateBookingService.java   # NEW
│   └── port/
│       ├── in/
│       │   ├── GetBookingsUseCase.java    # NEW
│       │   ├── GetBookingUseCase.java      # NEW
│       │   ├── UpdateBookingUseCase.java   # NEW
│       │   └── CreateBookingUseCase.java   # MODIFIED - command includes guest
│       └── out/
│           ├── LoadBookingsPort.java       # NEW
│           ├── LoadBookingPort.java        # NEW
│           └── UpdateBookingPort.java      # NEW
└── config/
    └── BeanConfig.java                # MODIFIED - wire new ports
```

## Implementation Steps

1. **Thêm COMPLETED vào BookingStatus enum**
   - File: `BookingStatus.java`
   - Thêm `COMPLETED` vào enum values

2. **Thêm guest fields vào Booking domain model**
   - File: `Booking.java`
   - Thêm `guestName`, `phoneNumber`, `email` vào record

3. **Thêm guest columns vào BookingJpaEntity**
   - File: `BookingJpaEntity.java`
   - Thêm `guest_name`, `phone_number`, `email` columns
   - KHÔNG tạo migration — giả định schema mới đã có

4. **Update BookingMapper**
   - File: `BookingMapper.java`
   - Map guest fields giữa Entity ↔ Domain

5. **Update CreateBookingRequest DTO**
   - File: `CreateBookingRequest.java`
   - Thêm guestName, phoneNumber, email fields
   - userId vẫn giữ nhưng đánh dấu optional

6. **Update BookingResponse DTO**
   - File: `BookingResponse.java`
   - Thêm guestName, phoneNumber, email fields

7. **Thêm typeName vào RoomShortResponse**
   - File: `RoomShortResponse.java`
   - Thêm `typeName: String` field

8. **Tạo LoadBookingsPort interface**
   - File: `LoadBookingsPort.java`
   - Methods: `loadAll()`, `loadByStatus(BookingStatus)`

9. **Tạo LoadBookingPort interface**
   - File: `LoadBookingPort.java`
   - Method: `loadById(Long id)`

10. **Tạo UpdateBookingPort interface**
    - File: `UpdateBookingPort.java`
    - Method: `updateStatus(Long id, BookingStatus status)`

11. **Thêm query methods vào SpringDataBookingRepository**
    - File: `SpringDataBookingRepository.java`
    - `findAll()`, `findByStatus(String status)`, `findById(Long id)`

12. **Update BookingPersistenceAdapter**
    - File: `BookingPersistenceAdapter.java`
    - Implement `LoadBookingsPort`, `LoadBookingPort`, `UpdateBookingPort`

13. **Tạo GetBookingsService**
    - File: `GetBookingsService.java`
    - Implement `GetBookingsUseCase`

14. **Tạo GetBookingService**
    - File: `GetBookingService.java`
    - Implement `GetBookingUseCase`

15. **Tạo UpdateBookingService**
    - File: `UpdateBookingService.java`
    - Validate booking tồn tại, update status

16. **Update CreateBookingService**
    - File: `CreateBookingService.java`
    - Command mới bao gồm guest fields

17. **Update BookingController**
    - File: `BookingController.java`
    - Thêm `GetBookingsUseCase`, `GetBookingUseCase`, `UpdateBookingUseCase`
    - Thêm endpoints: GET `/`, GET `/{id}`, PUT `/{id}`

18. **Update BookingWebMapper**
    - File: `BookingWebMapper.java`
    - Map guest fields, map `room.type.name` → `typeName`

19. **Update BeanConfig**
    - File: `BeanConfig.java`
    - Wire `LoadBookingsPort`, `LoadBookingPort`, `UpdateBookingPort` → adapter
    - Wire new use cases

## Todo List
- [ ] Thêm COMPLETED vào BookingStatus enum
- [ ] Thêm guest fields vào Booking domain model
- [ ] Thêm guest columns vào BookingJpaEntity
- [ ] Update BookingMapper cho guest fields
- [ ] Update CreateBookingRequest DTO
- [ ] Update BookingResponse DTO
- [ ] Thêm typeName vào RoomShortResponse
- [ ] Tạo LoadBookingsPort interface
- [ ] Tạo LoadBookingPort interface
- [ ] Tạo UpdateBookingPort interface
- [ ] Thêm query methods vào SpringDataBookingRepository
- [ ] Update BookingPersistenceAdapter implement new ports
- [ ] Tạo GetBookingsService
- [ ] Tạo GetBookingService
- [ ] Tạo UpdateBookingService
- [ ] Update CreateBookingService command
- [ ] Update BookingController với 3 endpoints mới
- [ ] Update BookingWebMapper
- [ ] Update BeanConfig

## Success Criteria
1. `GET /api/bookings` trả list `BookingResponse` có guest info
2. `GET /api/bookings/{id}` trả single `BookingResponse` có guest info + room.typeName
3. `PUT /api/bookings/{id}` update status, trả updated `BookingResponse`
4. `POST /api/bookings` tạo booking với guest info, trả `BookingResponse`
5. `BookingStatus` backend có đủ `PENDING, CONFIRMED, CANCELLED, COMPLETED`
6. `RoomShortResponse` có `typeName`
7. Frontend `useBookings()`, `useBooking(id)`, `useUpdateBooking()`, `useCancelBooking()` có thể gọi được API

## Risk Assessment
- **Risk**: JPA entity thiếu guest columns trong schema cũ
  - **Impact**: CRITICAL — 500 error khi tạo booking
  - **Mitigation**: Phase này giả định schema mới đã apply. Ghi chú trong docs.
- **Risk**: Update booking chỉ cho phép update status
  - **Impact**: LOW — Frontend chỉ cần update status
  - **Mitigation**: Thiết kế chỉ update status để đơn giản hóa

## Security Considerations
- Validate `guestName` và `phoneNumber` không empty
- Validate `email` format nếu provided
- Validate `roomId` tồn tại và `AVAILABLE`
- Authorization: chỉ authenticated users được quản lý bookings (phase 3)

## Next Steps
- Phase 03: Backend Auth — thêm `/api/auth/login` endpoint
