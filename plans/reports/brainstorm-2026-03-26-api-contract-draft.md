# API contract draft

## Scope
- Chỉ chốt contract cho vòng này: `auth`, `rooms`, `bookings`.
- Không chốt `bill`, `service`, `hotel`, `client` full CRUD ở vòng này.

## Principles
- FE và BE chỉ dùng 1 shape duy nhất cho mỗi entity.
- Không nuôi song song `type` và `roomType` lâu dài.
- Không để FE đoán business rules từ UI.
- Error format phải thống nhất.

## Final decisions
- `roomId`, `bookingId`, `clientId`, `userId` dùng kiểu `string` ở API layer.
- `RoomResponse` dùng field `type`, không dùng `roomType`.
- `Create booking` dùng `guestName + phoneNumber + email? + roomId + checkIn + checkOut`.
- `RoomStatus`: `AVAILABLE | OCCUPIED | MAINTENANCE`.
- `BookingStatus`: `PENDING | CONFIRMED | CANCELLED | COMPLETED`.
- Protected API dùng `Authorization: Bearer <token>`.

## Shared models

### Error response
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Check-out must be after check-in",
  "details": {
    "checkOut": "must be after checkIn"
  },
  "timestamp": "2026-03-26T10:30:00Z",
  "path": "/api/bookings"
}
```

### Auth user
```json
{
  "id": "staff-001",
  "name": "Nguyen Van A",
  "email": "admin@hotel.com",
  "role": "ADMIN"
}
```

### Room type
```json
{
  "id": "standard",
  "name": "Standard",
  "price": 500000,
  "capacity": 2
}
```

### Room
```json
{
  "id": "101",
  "roomNumber": "101",
  "status": "AVAILABLE",
  "type": {
    "id": "standard",
    "name": "Standard",
    "price": 500000,
    "capacity": 2
  }
}
```

### Booking room short
```json
{
  "id": "101",
  "roomNumber": "101",
  "type": {
    "id": "standard",
    "name": "Standard"
  }
}
```

### Booking
```json
{
  "id": "booking-0001",
  "clientId": "client-0001",
  "guestName": "Nguyen Van A",
  "phoneNumber": "0901234567",
  "email": "a@gmail.com",
  "room": {
    "id": "101",
    "roomNumber": "101",
    "type": {
      "id": "standard",
      "name": "Standard"
    }
  },
  "checkIn": "2026-03-30",
  "checkOut": "2026-04-01",
  "status": "PENDING",
  "createdAt": "2026-03-26T10:30:00Z",
  "updatedAt": "2026-03-26T10:30:00Z"
}
```

## Auth APIs

### POST `/api/auth/login`
Public.

Request:
```json
{
  "username": "admin@hotel.com",
  "password": "secret123"
}
```

Success `200`:
```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer",
  "user": {
    "id": "staff-001",
    "name": "Nguyen Van A",
    "email": "admin@hotel.com",
    "role": "ADMIN"
  }
}
```

Error:
- `401 INVALID_CREDENTIALS`
- `400 VALIDATION_ERROR`

### GET `/api/auth/me`
Protected.

Success `200`:
```json
{
  "id": "staff-001",
  "name": "Nguyen Van A",
  "email": "admin@hotel.com",
  "role": "ADMIN"
}
```

## Rooms APIs

### GET `/api/rooms`
Protected.

Query params:
- `status?=AVAILABLE|OCCUPIED|MAINTENANCE`

Success `200`:
```json
[
  {
    "id": "101",
    "roomNumber": "101",
    "status": "AVAILABLE",
    "type": {
      "id": "standard",
      "name": "Standard",
      "price": 500000,
      "capacity": 2
    }
  }
]
```

### GET `/api/rooms/{id}`
Protected.

Success `200`: same shape as `Room`.

Error:
- `404 ROOM_NOT_FOUND`

### POST `/api/rooms`
Protected.

Request:
```json
{
  "roomNumber": "101",
  "typeId": "standard",
  "status": "AVAILABLE"
}
```

Success `201`: same shape as `Room`.

Error:
- `409 ROOM_NUMBER_ALREADY_EXISTS`
- `400 VALIDATION_ERROR`

### PATCH `/api/rooms/{id}`
Protected.

Request:
```json
{
  "roomNumber": "101",
  "typeId": "deluxe",
  "status": "MAINTENANCE"
}
```

Rules:
- partial update allowed
- if field absent => keep current value

Success `200`: same shape as `Room`.

Error:
- `404 ROOM_NOT_FOUND`
- `409 ROOM_NUMBER_ALREADY_EXISTS`
- `400 INVALID_ROOM_STATUS`

## Bookings APIs

### GET `/api/bookings`
Protected.

Query params:
- `status?=PENDING|CONFIRMED|CANCELLED|COMPLETED`
- `roomId?=101`
- `checkInDate?=2026-03-30`
- `checkOutDate?=2026-04-01`

Success `200`:
```json
[
  {
    "id": "booking-0001",
    "clientId": "client-0001",
    "guestName": "Nguyen Van A",
    "phoneNumber": "0901234567",
    "email": "a@gmail.com",
    "room": {
      "id": "101",
      "roomNumber": "101",
      "type": {
        "id": "standard",
        "name": "Standard"
      }
    },
    "checkIn": "2026-03-30",
    "checkOut": "2026-04-01",
    "status": "PENDING",
    "createdAt": "2026-03-26T10:30:00Z",
    "updatedAt": "2026-03-26T10:30:00Z"
  }
]
```

### GET `/api/bookings/{id}`
Protected.

Success `200`: same shape as `Booking`.

Error:
- `404 BOOKING_NOT_FOUND`

### POST `/api/bookings`
Protected.

Request:
```json
{
  "guestName": "Nguyen Van A",
  "phoneNumber": "0901234567",
  "email": "a@gmail.com",
  "roomId": "101",
  "checkIn": "2026-03-30",
  "checkOut": "2026-04-01"
}
```

Rules:
- `guestName` required
- `phoneNumber` required
- `email` optional
- `checkOut` must be after `checkIn`
- `roomId` must exist
- room must not be in `MAINTENANCE`
- room must not be double-booked in overlapping period
- find existing client by normalized `phoneNumber`
- if not found => create client
- if found => reuse client

Success `201`: same shape as `Booking`.

Error:
- `404 ROOM_NOT_FOUND`
- `409 ROOM_NOT_AVAILABLE`
- `409 BOOKING_DATE_CONFLICT`
- `400 VALIDATION_ERROR`

### PATCH `/api/bookings/{id}/status`
Protected.

Request:
```json
{
  "status": "CONFIRMED"
}
```

Allowed statuses:
- `PENDING`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`

Basic transition rules:
- `PENDING -> CONFIRMED | CANCELLED`
- `CONFIRMED -> COMPLETED | CANCELLED`
- `CANCELLED` is terminal
- `COMPLETED` is terminal

Success `200`: same shape as `Booking`.

Error:
- `404 BOOKING_NOT_FOUND`
- `400 INVALID_BOOKING_STATUS`
- `409 INVALID_BOOKING_TRANSITION`

## Security
- `POST /api/auth/login` public
- all other `/api/**` protected
- header:
```http
Authorization: Bearer <accessToken>
```

## Business rules
- Room status meanings:
  - `AVAILABLE`: có thể đặt
  - `OCCUPIED`: đang có khách
  - `MAINTENANCE`: không cho đặt
- Booking status meanings:
  - `PENDING`: mới tạo, chờ xác nhận
  - `CONFIRMED`: đã xác nhận
  - `CANCELLED`: đã hủy
  - `COMPLETED`: đã hoàn tất lưu trú

## Explicit non-scope for this round
- refresh token
- RBAC phức tạp
- delete room hard delete
- billing/service APIs
- pagination chuẩn hóa nếu UI chưa cần ngay

## Risks
- DB thật có thể không map đẹp với `typeId/clientId/string IDs`; cần adapter/persistence refactor ở backend.
- frontend hiện còn vài nơi hỗ trợ shape cũ; cần dọn sau khi contract này được chốt thật.
- nếu team không khóa contract này ngay, rất dễ quay lại tình trạng `type` vs `roomType`.

## Next steps
1. Dev 1 approve contract này hoặc chỉnh 1 lần cuối.
2. Dev 2/3 map contract này xuống persistence/service.
3. Dev 5 update FE types theo contract duy nhất.
