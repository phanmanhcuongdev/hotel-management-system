# Booking Availability Flow

## API
- `GET /api/rooms/available`
  - Required query params: `checkIn`, `checkOut`
  - Optional query params: `keyword`, `typeId`
- `POST /api/bookings`
  - Request body stays the same: `guestName`, `phoneNumber`, `email`, `roomId`, `checkIn`, `checkOut`

## Availability logic
- `checkIn` must be before `checkOut`
- `checkIn` must be today or later
- Rooms in `MAINTENANCE` are excluded
- Rooms with overlapping `PENDING` or `CONFIRMED` bookings are excluded
- Availability does not depend on `room.status = AVAILABLE` for future bookings

## Create booking flow
1. Frontend collects guest info and stay dates.
2. Frontend calls `GET /api/rooms/available` to load rooms for the selected date range.
3. User selects one room from the returned list.
4. Backend validates the date range again on `POST /api/bookings`.
5. Backend checks overlap for the selected room.
6. Backend normalizes the phone number to digits-only.
7. Backend looks up a client by normalized phone.
8. If the client does not exist, backend creates a minimal client record and links it to the booking.
9. Backend saves the booking with status `PENDING`.

## Current non-goals
- No refresh token
- No token blacklist or revoke flow
- No standalone client CRUD in this step
- No room status transition to `OCCUPIED` for future bookings

## Assumptions
- Minimal auto-created clients use generated `id_card_number` and a placeholder address because the current schema requires both fields.
- Client lookup matches on normalized phone only in this step.
