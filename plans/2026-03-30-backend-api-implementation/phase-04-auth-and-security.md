# Phase 04 - Auth and security baseline

## Context links
- `plans/reports/brainstorm-2026-03-26-api-contract-draft.md`

## Overview
- Date: 2026-03-30
- Priority: High
- Status: PLANNED

## Key insights
- Frontend already expects bearer auth
- Need minimal JWT, not full auth platform

## Requirements
- `POST /api/auth/login`
- `GET /api/auth/me`
- Protect `/api/**`

## Architecture
- Spring Security config
- Thin auth controller
- Token utility/service isolated

## Related code files
- `backend/src/main/resources/application.yaml`
- security package to add

## Implementation steps
1. Add auth DTOs and controller
2. Add password encoder + auth service
3. Add JWT utility and filter/config
4. Add me endpoint
5. Add tests

## Todo list
- [ ] Login endpoint
- [ ] Me endpoint
- [ ] JWT validation
- [ ] Security config

## Success criteria
- Protected APIs require bearer token

## Risk assessment
- User table/schema may not map cleanly

## Security considerations
- Hash passwords
- No secret in source

## Next steps
- Verification and cleanup
