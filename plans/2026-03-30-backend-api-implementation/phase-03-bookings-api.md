# Phase 03 - Bookings API

## Context links
- `plans/reports/brainstorm-2026-03-26-api-contract-draft.md`

## Overview
- Date: 2026-03-30
- Priority: High
- Status: PLANNED

## Key insights
- Current booking create still uses `userId`, not guest info
- Need client lookup/create and status transitions

## Requirements
- `GET /api/bookings`
- `GET /api/bookings/{id}`
- `POST /api/bookings`
- `PATCH /api/bookings/{id}/status`

## Architecture
- Booking rules live in service layer
- Persistence adapters handle client/booking storage only

## Related code files
- `backend/src/main/java/com/hotel/backend/adapter/in/web/BookingController.java`
- `backend/src/main/java/com/hotel/backend/application/domain/service/CreateBookingService.java`

## Implementation steps
1. Replace create booking command/request model
2. Add list/detail/status use cases
3. Add client lookup/create flow
4. Add overlap/status validation
5. Add tests

## Todo list
- [ ] Booking create guest-info flow
- [ ] Booking list/detail
- [ ] Booking status patch
- [ ] Conflict validation

## Success criteria
- Bookings contract works end-to-end

## Risk assessment
- DB client model may be awkward to map cleanly

## Security considerations
- Protect endpoints
- Validate all input

## Next steps
- Move to auth phase
