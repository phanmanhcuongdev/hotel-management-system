# Service And Used Service Flow

## Scope
- Minimal service catalog for demo
- Used service attached to current stay through `booked_rooms`
- No large back-office service management workflow

## API
- `GET /api/services`
- `POST /api/services`
- `PATCH /api/services/{id}`
- `DELETE /api/services/{id}`
- `GET /api/bookings/{bookingId}/used-services`
- `POST /api/bookings/{bookingId}/used-services`

## Data flow
1. `services` stores master service definitions.
2. `used_services` stores actual usage lines.
3. Each `used_services` row points to:
   - one service in catalog
   - one `booked_room` stay context
4. Bill summary reads used services through `booking -> booked_room -> used_services`.

## Current rules
- Service catalog is managed from a dedicated admin screen.
- New or updated services become immediately available in stay operations.
- Service delete is allowed only when no `used_services` rows reference that service yet.
- If a service has historical usage, delete is blocked to protect stay records and bill calculations.
- Used service can only be added when:
  - booking exists
  - booking has a booked room context
  - guest is currently checked in
- Used service is not duplicated into booking or bill tables.
- Bill calculation uses service master price plus usage quantity and discount.

## Frontend behavior
- Admin staff can search, create, update, and delete service catalog entries.
- Booking detail shows existing used services.
- While guest is checked in, staff can select a catalog service and add a usage line.
- Booking detail links to the service catalog screen for master-data maintenance.
- Bill summary refreshes after adding a used service.
