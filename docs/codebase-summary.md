# Codebase Summary

## Repository layout
- `backend/`: Spring Boot application with web adapters, use cases, ports, and persistence adapters
- `frontend/`: React + TypeScript application organized by feature modules
- `database/`: schema creation, reset, and seed scripts
- `docs/`: concise product and flow documentation

## Current feature modules
- Authentication
- Dashboard
- Rooms
- Room Types
- Bookings
- Clients
- Services
- Billing
- Reports
- Users
- Property Settings

## Backend shape
The backend follows a Buckpal-style hexagonal layout:
- inbound web adapters in `adapter/in/web`
- outbound persistence adapters in `adapter/out/persistence`
- use cases and commands in `application/port/in`
- outbound ports in `application/port/out`
- domain services in `application/domain/service`

## Frontend shape
The frontend is feature-oriented:
- pages, components, and hooks grouped under `frontend/src/features/*`
- shared UI primitives under `frontend/src/components/ui`
- API clients under `frontend/src/api`
- shared app shell in `frontend/src/layouts/AdminLayout.tsx`

## Important runtime conventions
- frontend requests are proxied to backend through `/api`
- the app is admin-only in the current repository
- the property scope remains single-hotel
- booking, billing, and report flows all assume internal operational use

## Recommended entry points
- `README.md`
- `frontend/src/App.tsx`
- `frontend/src/layouts/AdminLayout.tsx`
- `backend/src/main/java/com/hotel/backend/adapter/in/web/`
- `backend/src/main/java/com/hotel/backend/application/domain/service/`
- `database/hotel-management.sql`
