# Phase 01 - Contract and baseline

## Context links
- `plans/reports/brainstorm-2026-03-26-api-contract-draft.md`
- `plans/reports/brainstorm-2026-03-26-backend-refactor.md`
- `docs/system-architecture.md`

## Overview
- Date: 2026-03-30
- Priority: High
- Status: IN_PROGRESS

## Key insights
- Current backend only covers `GET /api/rooms` and `POST /api/bookings`
- Contract must standardize on `type`, string IDs, guest-info booking create, JWT bearer auth
- Hardcoded datasource config is a blocker

## Requirements
- Align enums and DTOs to contract
- Prepare shared error format
- Add baseline security/config classes

## Architecture
- Keep hexagonal layering
- Controllers thin
- Service/use-case owns business rules
- Web mappers normalize API shape

## Related code files
- `backend/src/main/java/com/hotel/backend/adapter/in/web/**/*.java`
- `backend/src/main/java/com/hotel/backend/application/**/*.java`
- `backend/src/main/resources/application.yaml`

## Implementation steps
1. Update DTOs/enums to contract
2. Add missing ports/use cases needed by rooms/bookings/auth
3. Replace hardcoded config with env placeholders
4. Add security baseline skeleton

## Todo list
- [ ] Align `RoomStatus`
- [ ] Align `BookingStatus`
- [ ] Replace `CreateBookingRequest`
- [ ] Add auth request/response DTOs
- [ ] Add env config placeholders

## Success criteria
- Contract reflected in code entry points
- No hardcoded DB secret in config

## Risk assessment
- DB mismatch may require deeper refactor than expected

## Security considerations
- No plaintext secrets in source
- Password hash, not plain compare

## Next steps
- Move to rooms API implementation
