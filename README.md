# hotel-management-system

Internal single-property hotel operations system with a Spring Boot backend, React + TypeScript frontend, and MySQL schema/scripts.

## Documentation
- [Project overview](docs/project-overview-pdr.md)
- [Codebase summary](docs/codebase-summary.md)
- [Code structure and standards](docs/code-standards.md)
- [System architecture and data flow](docs/system-architecture.md)
- [Booking lifecycle flow](docs/booking-lifecycle-flow.md)
- [Bill payment flow](docs/bill-payment-flow.md)
- [Client management flow](docs/client-management-flow.md)
- [Room type management flow](docs/room-type-management-flow.md)
- [Service and used-service flow](docs/service-used-service-flow.md)
- [User management flow](docs/user-management-flow.md)
- [Property profile flow](docs/property-profile-flow.md)

## Quick start
1. For local MySQL development, create the schema with `database/reset-hotel-management-dev.sql` and seed it with `database/seed-hotel-management-dev.sql`.
2. Start the backend in local dev mode with the bundled H2 profile:
   `cd backend && ./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev"`
3. Start the frontend:
   `cd frontend && npm install && npm run dev`
4. In development, the Vite dev server proxies `/api` requests to `http://127.0.0.1:8080` by default.

## Environment setup

### Frontend
- Copy `frontend/.env.example` if you need custom values.
- Default behavior:
  - `VITE_API_BASE_URL=/api`
  - `VITE_DEV_API_PROXY_TARGET=http://127.0.0.1:8080`
- In local development, keep `VITE_API_BASE_URL=/api` and let Vite proxy API traffic to the backend.
- In production or separate deployments, set `VITE_API_BASE_URL` to the real API origin if `/api` is not served from the same host.

### Backend
- For local development, use the `dev` Spring profile. It starts against the in-memory H2 database and does not require external `DB_*` or `JWT_*` environment variables.
- For production-style runs, use the default profile and provide values from `backend/.env.example`:
  - `DB_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `JWT_SECRET`
  - `JWT_EXPIRATION_MS`
  - optional `SERVER_PORT`

## Frontend-backend integration
- Development:
  - frontend runs on Vite
  - API calls use `/api`
  - Vite proxies `/api` to `VITE_DEV_API_PROXY_TARGET`
- Production-style deployment:
  - frontend defaults to `/api`
  - `frontend/nginx.conf` proxies `/api` to `http://backend:8080/api/`
  - if you deploy frontend separately from the backend, override `VITE_API_BASE_URL`

## Current product modules
- Authentication
- Dashboard
- Rooms
- Room types
- Bookings and availability search
- Check-in / checkout
- Service catalog and stay service usage
- Billing operations and bill ledger
- Reports
- User management
- Client management
- Property profile settings

## Documentation rule
Keep `docs/` updated whenever architecture, API contracts, or database behavior changes.
