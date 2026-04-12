# System Architecture

## High-level architecture
The system uses a standard three-layer product shape:
- React frontend for internal staff workflows
- Spring Boot backend for business logic and API contracts
- MySQL schema for operational data

## Backend architecture
The backend follows a hexagonal structure:
- web controllers receive HTTP requests
- web mappers convert between DTOs and domain objects
- use cases and domain services coordinate business rules
- outbound ports define required persistence behavior
- persistence adapters implement those ports with Spring Data JPA

This keeps feature behavior centered in use cases and domain services rather than controllers.

## Frontend architecture
The frontend uses a feature-based React structure:
- each module owns its pages, hooks, and local components
- React Query manages server state and mutation invalidation
- a shared admin layout provides navigation and shell structure
- the API layer centralizes HTTP requests and error normalization

## Data flow
Typical request flow:
1. A page triggers a query or mutation through a feature hook.
2. The hook calls an API client under `frontend/src/api`.
3. The backend controller receives the request and maps it to a use case command/query.
4. The domain service applies business rules and calls outbound ports.
5. Persistence adapters load or save data through JPA repositories.
6. The controller maps the result back to a response DTO.
7. React Query refreshes affected screens after successful mutations.

## Current product boundaries
- Single-property only
- Internal staff operations only
- Internal billing only
- No external payment gateway
- No public guest self-service portal

## Current known limitation
Occupancy reporting is derived from scheduled booking and booked-room ranges. The repository does not yet maintain separate actual-stay audit timestamps for reporting precision.
