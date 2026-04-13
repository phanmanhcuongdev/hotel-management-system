# Room Delete Flow

## API
- `DELETE /api/rooms/{id}`

## Rule
- Hard delete is allowed only when the room has never been referenced by booking or stay data.
- If the room already has related data in `bookings` or `booked_rooms`, deletion is blocked.
- This rule is intentional to preserve historical integrity for booking, stay, bill, and used-service flows.

## Current behavior
1. Backend loads the room by id.
2. Backend checks whether the room is referenced by:
   - `bookings.room_id`
   - `booked_rooms.room_id`
3. If any reference exists, backend returns a business conflict with a usable message.
4. If no reference exists, backend performs a real delete.

## Non-goals in this step
- No soft delete
- No cascade delete across booking/stay/bill history
- No schema change
