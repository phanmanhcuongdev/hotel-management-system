# Phase 02 - Rooms API

## Context links
- `plans/reports/brainstorm-2026-03-26-api-contract-draft.md`

## Overview
- Date: 2026-03-30
- Priority: High
- Status: PLANNED

## Key insights
- Rooms API already has list endpoint, needs detail/create/update
- Current persistence shape may need room type lookup changes

## Requirements
- `GET /api/rooms`
- `GET /api/rooms/{id}`
- `POST /api/rooms`
- `PATCH /api/rooms/{id}`

## Architecture
- Use dedicated use cases for each operation
- Keep room number uniqueness validation in service layer

## Related code files
- `backend/src/main/java/com/hotel/backend/adapter/in/web/RoomController.java`
- `backend/src/main/java/com/hotel/backend/adapter/out/persistence/Room*.java`

## Implementation steps
1. Add missing room ports/use cases
2. Extend persistence adapter
3. Extend controller and mapper
4. Add tests

## Todo list
- [ ] Room detail
- [ ] Room create
- [ ] Room patch
- [ ] Room validation

## Success criteria
- Full rooms contract works

## Risk assessment
- Room ID/type mapping may conflict with DB schema

## Security considerations
- Auth required for all room endpoints

## Next steps
- Move to bookings API
