# Client Management Flow

## Scope

This module turns `clients` into a first-class internal feature for hotel staff.

Current capabilities:

- list and search client profiles
- filter profiles that still need review
- view client detail and linked booking history
- create and update trusted client records
- delete a client only when the profile has no booking history

The module stays intentionally small. It is not a CRM.

## APIs

- `GET /api/clients`
- `GET /api/clients/{id}`
- `POST /api/clients`
- `PATCH /api/clients/{id}`
- `DELETE /api/clients/{id}`

Supported list filters:

- `keyword`
- `needsReview`

## Data model usage

`clients` remains the source of truth for guest profile data:

- `id_card_number`
- `full_name`
- `address`
- `email`
- `phone`
- `description`

`bookings.client_id` links booking history back to the client profile.

## Booking integration

Booking creation still supports the lightweight existing flow:

1. booking is created with guest name, phone, email, room, and stay dates
2. phone number is normalized to digits-only
3. backend searches for an existing client by normalized phone
4. if found, the booking links to that client
5. if not found, the backend creates an auto-generated placeholder client and links the booking

Booking detail now exposes the linked client profile when available.

## Placeholder client cleanup

Auto-generated clients still exist because booking creation must remain lightweight.

Current placeholder pattern:

- `id_card_number = AUTO-PHONE-{normalizedPhone}`
- `address = UNKNOWN`
- `description = Auto-created from booking flow. Needs profile review.`

These records are surfaced as `needsReview = true` in the API and UI.

If a later booking matches the same phone number, the backend can refresh the placeholder profile's name/email safely without changing the placeholder identity fields.

Staff should then complete the profile manually from the client management module.

## Delete rule

`DELETE /api/clients/{id}` is allowed only when the client has no linked booking history.

If any booking references the client, deletion is blocked with a business-conflict response.

This avoids breaking operational history and keeps the product behavior predictable.
