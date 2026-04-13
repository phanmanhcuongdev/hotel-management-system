# Report Flow

## Scope

This module is a read-only reporting layer separated from the quick dashboard.

APIs:

- `GET /api/reports/overview`
- `GET /api/reports/revenue`
- `GET /api/reports/occupancy`

Supported filters:

- `startDate`
- `endDate`
- `roomId`

If the date range is not provided:

- `endDate = today`
- `startDate = endDate - 29 days`

## What Is Calculated Exactly

### Revenue by time

Calculated from:

- `bills.payment_date`
- `bills.payment_amount`

This is a real billed-revenue report, not a booking-value estimate.

### Revenue by room

Calculated from:

- `bills`
- join to `bookings`
- join to `rooms`

This is also a real billed-revenue report within the selected payment date range.

## What Is Approximate

### Occupancy / vacancy over time

Calculated from scheduled stay ranges using:

- `booked_rooms.checkin/checkout` as preferred source when present
- fallback to `bookings.check_in/check_out` for bookings without booked-room rows

The current repository does **not** have:

- `actual_checkin_at`
- `actual_checkout_at`

Because of that, occupancy is an approximation based on scheduled ranges, not an exact operational audit report.

Current denominator:

- operational rooms only
- `MAINTENANCE` rooms are excluded from occupancy/vacancy denominator

## Frontend Route

- `/reports`

The page shows:

- overview cards
- revenue by day table
- revenue by room table
- occupancy by day table

No charting or BI layer is introduced in this step.
