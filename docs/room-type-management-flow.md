# Room Type Management Flow

## Scope

This module makes `room_types` manageable as first-class product data for the internal hotel operations app.

Current capabilities:

- list and search room types
- create room types
- update room types
- delete room types only when no rooms still reference them
- reuse room types directly in room creation and editing

The module intentionally keeps pricing simple:

- one nightly base price per room type
- one capacity value per room type
- one optional description per room type

## APIs

- `GET /api/room-types`
- `GET /api/room-types/{id}`
- `POST /api/room-types`
- `PATCH /api/room-types/{id}`
- `DELETE /api/room-types/{id}`

Supported list filters:

- `keyword`

Keyword search currently matches:

- `name`
- `description`

## Data model usage

`room_types` remains the source of truth for:

- room type name
- room type description
- base nightly price
- room capacity

`rooms.room_type_id` links each room back to its room type.

Availability search, room display, and billing continue to read pricing and capacity from the assigned room type.

## Room integration

Room creation and editing now load room types from a dedicated room type API instead of reverse-deriving them from existing rooms.

This keeps room forms consistent and prevents room creation from depending on already seeded room inventory.

## Delete rule

`DELETE /api/room-types/{id}` is allowed only when no rows in `rooms` still reference the room type.

If any room still uses the room type, deletion is blocked with a business-conflict response.

This avoids breaking:

- room inventory integrity
- availability filtering by type
- billing that depends on room type pricing

## Non-goals

- no seasonal pricing
- no occupancy-based pricing rules
- no versioned price history
- no soft delete
