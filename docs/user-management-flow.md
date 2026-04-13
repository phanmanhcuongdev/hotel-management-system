# User Management Flow

## Scope

This document covers the minimal user-related module added on top of the current repository:

- change password for the currently authenticated user
- admin user management:
  - list/search
  - detail
  - create
  - update
  - delete

No schema change is required in this step.

## Auth API

### `POST /api/auth/change-password`

Authenticated endpoint for the current user.

Request body:

```json
{
  "currentPassword": "current-password",
  "newPassword": "new-password",
  "confirmPassword": "new-password"
}
```

Rules:

- `currentPassword` must match the current stored password
- `newPassword` must be at least 6 characters
- `newPassword` and `confirmPassword` must match
- `newPassword` must be different from the current password

Response:

- `204 No Content` on success

## User API

All `/api/users` endpoints are admin-only in the current repository.

### `GET /api/users`

Query params:

- `keyword`

Current search scope:

- `username`
- `fullName`
- `mail`

### `GET /api/users/{id}`

Returns a single user detail.

### `POST /api/users`

Request body:

```json
{
  "username": "admin2",
  "password": "admin123",
  "fullName": "Second Admin",
  "position": "ADMIN",
  "mail": "admin2@hotel.local",
  "description": "Optional note"
}
```

Rules:

- `username` is unique
- `password` must be at least 6 characters
- `position` is currently limited to `ADMIN`

### `PUT /api/users/{id}`

Request body:

```json
{
  "username": "admin2",
  "fullName": "Updated Admin",
  "position": "ADMIN",
  "mail": "admin2@hotel.local",
  "description": "Optional note"
}
```

Rules:

- `username` remains unique
- password is not updated from this endpoint
- password changes must go through `POST /api/auth/change-password`

### `DELETE /api/users/{id}`

Minimal safe delete rule:

- block self-delete for the currently authenticated account
- block delete if the user is referenced by existing `bookings` or `bills`
- only hard delete when no related operational data exists

Failure response uses the existing business conflict pattern with a usable message.

## Frontend Routes

- `/users`
  - admin user list/search
  - create/edit modal
  - delete action with confirmation
- `/change-password`
  - current user change password form

## Tradeoffs

- no reset password flow
- no active/inactive status
- no expanded RBAC beyond current `ADMIN` behavior already used in the repository
- no schema change
