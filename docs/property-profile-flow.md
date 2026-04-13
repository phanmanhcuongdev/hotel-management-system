# Property Profile Flow

## Scope
This product remains a single-property internal hotel operations application.

The property profile module exposes the single hotel record that already exists in the database so staff can manage the active hotel's operational identity without introducing multi-property behavior.

## Backend API
- `GET /api/property`
  - Returns the current hotel profile.
  - Under the current single-property assumption, the backend loads the first hotel record ordered by `id`.
- `PATCH /api/property`
  - Updates the current hotel profile.
  - Supported fields:
    - `name`
    - `starLevel`
    - `address`
    - `description`

## Validation
- `name` is required and limited to 255 characters.
- `starLevel` is required and must be between `1` and `5`.
- `address` is required and limited to 255 characters.
- `description` is optional and limited to 500 characters.

## Product behavior
- The module is available as `Property` in the admin navigation.
- Staff can view the current hotel profile and edit the same record in place.
- The module does not allow creating, switching, or managing multiple hotels.

## Data model grounding
The module is grounded in the existing `hotels` table:

- `id`
- `name`
- `star_level`
- `address`
- `description`

No schema change is required for this feature.
