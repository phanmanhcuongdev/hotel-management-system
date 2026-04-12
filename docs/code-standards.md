# Codebase Structure and Conventions

## Backend
- The backend follows a hexagonal structure with inbound ports, outbound ports, domain services, web adapters, and persistence adapters.
- Controllers under `adapter/in/web` stay thin and delegate business behavior to use cases and domain services.
- DTOs live under `adapter/in/web/dto`.
- Persistence mapping stays under `adapter/out/persistence`.
- Business rules belong in domain services, not controllers.

## Frontend
- The frontend is organized by feature under `frontend/src/features/*`.
- Each feature owns its pages, hooks, and local components.
- Shared UI primitives live under `frontend/src/components/ui`.
- API calls are centralized under `frontend/src/api`.
- React Query is used for server state, cache invalidation, and mutation refresh behavior.

## Naming and product language
- User-facing product language should remain English.
- UI labels should prefer current product terms:
  - `Clients`
  - `Room Types`
  - `Billing`
  - `Property`
- Internal code identifiers do not need renaming unless they block comprehension or correctness.

## Database notes
- The schema remains normalized around hotels, rooms, room types, bookings, booked rooms, used services, bills, users, clients, and services.
- Monetary columns still rely on the current schema shape and should be handled carefully in future finance-sensitive work.

## Delivery expectations
- Prefer targeted functional changes over broad refactors.
- Keep database scripts, seed data, and docs aligned when schema behavior changes.
- Preserve the existing architecture and project structure when adding features or fixing bugs.
