-- Seed data for the current repository schema.
-- Run this after reset-hotel-management-dev.sql
-- and after selecting the target database:
--   USE hotel_management_dev;

INSERT INTO `hotels` (`id`, `name`, `star_level`, `address`, `description`) VALUES
  (1, 'Sunrise Hotel', 4, '123 Nguyen Hue, District 1, Ho Chi Minh City', 'Main local development hotel');

INSERT INTO `room_types` (`id`, `name`, `description`, `price`, `capacity`) VALUES
  (1, 'Standard', 'Entry room type for local development', 100.00, 2),
  (2, 'Deluxe', 'Upgraded room with additional amenities', 150.00, 2),
  (3, 'Suite', 'Large suite used for booking flow checks', 250.00, 4);

INSERT INTO `rooms` (`id`, `room_number`, `status`, `room_type_id`, `hotel_id`) VALUES
  (1, '101', 'OCCUPIED', 1, 1),
  (2, '102', 'AVAILABLE', 1, 1),
  (3, '103', 'OCCUPIED', 2, 1),
  (4, '104', 'AVAILABLE', 2, 1),
  (5, '105', 'MAINTENANCE', 1, 1),
  (6, '106', 'AVAILABLE', 3, 1),
  (7, '201', 'OCCUPIED', 2, 1),
  (8, '202', 'AVAILABLE', 2, 1),
  (9, '203', 'OCCUPIED', 3, 1),
  (10, '204', 'AVAILABLE', 1, 1),
  (11, '205', 'AVAILABLE', 2, 1),
  (12, '206', 'OCCUPIED', 3, 1),
  (13, '301', 'AVAILABLE', 3, 1),
  (14, '302', 'OCCUPIED', 3, 1),
  (15, '303', 'AVAILABLE', 2, 1),
  (16, '304', 'MAINTENANCE', 1, 1),
  (17, '305', 'AVAILABLE', 2, 1),
  (18, '306', 'OCCUPIED', 1, 1);

INSERT INTO `clients` (`id`, `id_card_number`, `full_name`, `address`, `email`, `phone`, `description`) VALUES
  (1, '079123456789', 'Nguyen Van A', 'Thu Duc, Ho Chi Minh City', 'guest1@example.com', '0900000001', 'Seeded returning guest'),
  (2, 'AUTO-PHONE-0900000002', 'Tran Thi B', 'UNKNOWN', 'guest2@example.com', '0900000002', 'Auto-created from booking flow. Needs profile review.');

INSERT INTO `user` (`id`, `username`, `password`, `full_name`, `position`, `mail`, `description`) VALUES
  (
    1,
    'admin',
    '$2a$10$dr9FrAqSqcsXShZPSXw1SeYKkOd.LPZmCN7MH99h2y2h202P6q8AW',
    'Dev Admin',
    'ADMIN',
    'admin@hotel.local',
    'Seeded admin account for local development'
  );

INSERT INTO `bookings` (
  `id`,
  `guest_name`,
  `phone_number`,
  `email`,
  `room_id`,
  `check_in`,
  `check_out`,
  `status`,
  `created_at`,
  `updated_at`,
  `client_id`,
  `user_id`,
  `discount`,
  `note`
) VALUES
  (
    1,
    'Nguyen Van A',
    '0900000001',
    'guest1@example.com',
    1,
    '2026-04-08',
    '2026-04-10',
    'CONFIRMED',
    '2026-04-08 10:00:00',
    '2026-04-08 10:00:00',
    1,
    1,
    0.00,
    'Seeded confirmed booking'
  ),
  (
    2,
    'Tran Thi B',
    '0900000002',
    'guest2@example.com',
    3,
    '2026-04-09',
    '2026-04-11',
    'PENDING',
    '2026-04-09 09:30:00',
    '2026-04-09 09:30:00',
    2,
    1,
    10.00,
    'Pending booking with discount'
  ),
  (
    3,
    'Le Van C',
    '0900000003',
    'guest3@example.com',
    7,
    '2026-04-07',
    '2026-04-12',
    'COMPLETED',
    '2026-04-07 08:15:00',
    '2026-04-12 12:00:00',
    NULL,
    1,
    0.00,
    'Walk-in booking completed'
  );

INSERT INTO `booked_rooms` (
  `id`,
  `checkin`,
  `checkout`,
  `discount`,
  `is_checked_in`,
  `note`,
  `booking_id`,
  `room_id`
) VALUES
  (1, '2026-04-08', '2026-04-10', 0.00, 1, 'Primary room assignment', 1, 1),
  (2, '2026-04-09', '2026-04-11', 10.00, 0, 'Pending assignment', 2, 3);

INSERT INTO `services` (`id`, `name`, `unit`, `price`) VALUES
  (1, 'Breakfast', 'set', 12.50),
  (2, 'Laundry', 'kg', 5.00);

INSERT INTO `used_services` (`id`, `quantity`, `discount`, `service_id`, `booked_room_id`) VALUES
  (1, 2, 0.00, 1, 1),
  (2, 3, 1.50, 2, 1);

INSERT INTO `bills` (
  `id`,
  `payment_date`,
  `payment_amount`,
  `payment_type`,
  `note`,
  `booking_id`,
  `user_id`
) VALUES
  (1, '2026-04-10', 225.00, 1, 'Seeded checkout bill', 1, 1);

ALTER TABLE `hotels` AUTO_INCREMENT = 2;
ALTER TABLE `room_types` AUTO_INCREMENT = 4;
ALTER TABLE `rooms` AUTO_INCREMENT = 19;
ALTER TABLE `clients` AUTO_INCREMENT = 3;
ALTER TABLE `bookings` AUTO_INCREMENT = 4;
ALTER TABLE `booked_rooms` AUTO_INCREMENT = 3;
ALTER TABLE `services` AUTO_INCREMENT = 3;
ALTER TABLE `used_services` AUTO_INCREMENT = 3;
ALTER TABLE `bills` AUTO_INCREMENT = 2;
ALTER TABLE `user` AUTO_INCREMENT = 2;
