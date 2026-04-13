# Booking Lifecycle Flow

## Booking commercial details
- `POST /api/bookings` now accepts:
  - `discount`
  - `note`
- `PATCH /api/bookings/{id}` updates booking commercial details only:
  - `discount`
  - `note`
- These values stay part of the booking record and are visible in booking detail and bill summary.
- Booking ownership is stored through `bookings.user_id` and is surfaced in booking detail as staff attribution.

## Lifecycle states in this step
- `PENDING`: booking created but not confirmed yet
- `CONFIRMED`: booking is valid and ready for arrival
- `CONFIRMED + checkedIn=true`: guest is staying in the room
- `COMPLETED`: stay finished through checkout
- `CANCELLED`: booking closed without stay

## Check-in
- API: `POST /api/bookings/{id}/check-in`
- Allowed only when:
  - booking status is `CONFIRMED`
  - current date is within the stay range
  - room is not `MAINTENANCE`
  - booking is not already checked in
- Effects:
  - create or update `booked_rooms` for the booking
  - set `booked_rooms.is_checked_in = true`
  - set `room.status = OCCUPIED`
  - booking status remains `CONFIRMED`

## Checkout
- API: `POST /api/bookings/{id}/checkout`
- Allowed only when:
  - booking status is `CONFIRMED`
  - booking already has `booked_rooms.is_checked_in = true`
- Effects:
  - set `booked_rooms.is_checked_in = false`
  - set booking status to `COMPLETED`
  - set room status back to `AVAILABLE` unless room is already `MAINTENANCE`

## Status mapping
- Future booking:
  - booking: `CONFIRMED`
  - booked room: absent or `is_checked_in = false`
  - room: usually `AVAILABLE`
- During stay:
  - booking: `CONFIRMED`
  - booked room: `is_checked_in = true`
  - room: `OCCUPIED`
- After checkout:
  - booking: `COMPLETED`
  - booked room: `is_checked_in = false`
  - room: `AVAILABLE`

## Notes
- `PATCH /api/bookings/{id}/status` no longer completes a booking directly.
- `PATCH /api/bookings/{id}` cannot edit a booking after it is `COMPLETED` or `CANCELLED`.
- Checked-in bookings must use checkout, not cancel.
- Billing is intentionally not part of this step, but checkout is now a separate business action that billing can hook into later.
