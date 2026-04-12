# Project Overview

## Product scope
`hotel-management-system` is a single-property internal hotel back-office application.

It supports the core operational workflow for one hotel:
- staff authentication
- room inventory and room type management
- booking creation with availability checks
- check-in and checkout
- service usage during a stay
- internal billing and bill ledger review
- reporting
- client profile management
- admin user management
- property profile settings

The product is intentionally not a public booking website and not a multi-property management platform.

## Technology stack
- Backend: Spring Boot with a ports-and-adapters / hexagonal structure
- Frontend: React + TypeScript + Vite
- Database: MySQL schema and seed scripts in `database/`

## Current deployment assumptions
- one hotel record is treated as the active property profile
- all operational users are currently `ADMIN`
- authentication is internal and session-based through the backend auth API
- billing is internal only; there is no external payment gateway

## Repository structure
- `backend/`: Spring Boot application
- `frontend/`: React application
- `database/`: schema, reset, and seed scripts
- `docs/`: product and technical notes for implemented flows

## Practical release note
This repository is suitable for internal demo and controlled back-office use. Reporting and occupancy metrics are operationally useful, but occupancy still relies on scheduled stay ranges rather than separate actual-stay audit timestamps.
