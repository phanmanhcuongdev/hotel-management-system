# Bill Payment Flow

## API
- `GET /api/bills`
- `GET /api/bills/{billId}`
- `GET /api/bookings/{bookingId}/bill`
- `POST /api/bookings/{bookingId}/bill`

## Scope in this step
- Internal bill summary only
- No external payment gateway
- No payment status workflow beyond creating one bill record for demo
- No schema change
- Billing is now exposed as an operational ledger/history module in addition to booking detail.

## Bill summary contents
- booking info
- booking discount
- booking note
- room charge
- used service lines
- service charge total
- total amount
- bill/payment info if a bill already exists

## Current rules
- Bill summary can be viewed for any booking.
- Bill creation is allowed only when booking status is `COMPLETED`.
- One booking can only create one bill in this step.
- `payment_type` stays as `INT` in DB, but code/docs map it as:
  - `1 = CASH`
  - `2 = CARD`
  - `3 = BANK_TRANSFER`

## Calculation
- `roomCharge = roomType.price * nights - booking.discount - bookedRoom.discount`
- `serviceCharge = sum(service.price * quantity - usedService.discount)`
- `totalAmount = roomCharge + serviceCharge`

## Booking detail linkage
- Booking discount is created with the booking and can be updated until the booking is closed.
- Booking note is an internal operational note and is shown in both booking detail and bill summary.
- Reports already read billed revenue, so once a bill is created, booking discount is reflected through the saved bill amount rather than a separate reporting rule.

## Frontend behavior
- Booking detail modal loads bill summary.
- After checkout, the booking detail remains available with `COMPLETED` state so staff can create the bill immediately.
- If no bill exists yet, staff can choose a payment type and create one internal bill record.
- Admin staff can browse `/billing` as a bill ledger/history page.
- Ledger filters support practical bill lookup by:
  - keyword (`bill id`, `booking id`, guest, room)
  - booking id
  - payment type
  - payment date range
- Ledger filters can be reset, and invalid payment-date ranges are blocked before querying.
- Bill detail and ledger actions link into the related booking context on the booking page, and booking detail links forward to the stored bill record when one exists.
