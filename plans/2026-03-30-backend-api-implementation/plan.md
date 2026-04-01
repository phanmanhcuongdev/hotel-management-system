# Backend API Implementation Plan

- Date: 2026-03-30
- Status: IN_PROGRESS
- Priority: High
- Goal: implement contract-aligned backend for auth + rooms + bookings without redesigning whole DB

## Phases

1. [Phase 01 - Contract and baseline](phase-01-contract-and-baseline.md) - IN_PROGRESS
2. [Phase 02 - Rooms API](phase-02-rooms-api.md) - PLANNED
3. [Phase 03 - Bookings API](phase-03-bookings-api.md) - PLANNED
4. [Phase 04 - Auth and security baseline](phase-04-auth-and-security.md) - PLANNED
5. [Phase 05 - Verification and cleanup](phase-05-verification-and-cleanup.md) - PLANNED

## Scope
- In scope: auth login/me, rooms list/detail/create/update, bookings list/detail/create/status, env config cleanup, basic tests
- Out of scope: billing/services/full client CRUD/refresh token/RBAC deep dive/delete room hard delete

## Key blockers
- Current DB/persistence model likely mismatched with target contract
- Java toolchain availability may affect local test execution
- Need one contract only: `type`, string IDs, guest-info booking create payload

## Success
- Backend exposes contract draft APIs
- Frontend can integrate without mock-by-default
- Build/tests pass
