-- Seed data for the current repository schema.
-- Run this after reset-hotel-management-dev.sql
-- and after selecting the target database:
--   USE hotel_management_dev;

INSERT INTO `room_types` (`id`, `name`, `price`, `capacity`) VALUES
  (1, 'Standard', 100.00, 2),
  (2, 'Deluxe', 150.00, 2),
  (3, 'Suite', 250.00, 4);

INSERT INTO `rooms` (`id`, `room_number`, `status`, `room_type_id`) VALUES
  (1, '101', 'OCCUPIED', 1),
  (2, '102', 'AVAILABLE', 1),
  (3, '103', 'OCCUPIED', 2),
  (4, '104', 'AVAILABLE', 2),
  (5, '105', 'MAINTENANCE', 1),
  (6, '106', 'AVAILABLE', 3),
  (7, '201', 'OCCUPIED', 2),
  (8, '202', 'AVAILABLE', 2),
  (9, '203', 'OCCUPIED', 3),
  (10, '204', 'AVAILABLE', 1),
  (11, '205', 'AVAILABLE', 2),
  (12, '206', 'OCCUPIED', 3),
  (13, '301', 'AVAILABLE', 3),
  (14, '302', 'OCCUPIED', 3),
  (15, '303', 'AVAILABLE', 2),
  (16, '304', 'MAINTENANCE', 1),
  (17, '305', 'AVAILABLE', 2),
  (18, '306', 'OCCUPIED', 1);

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
  `updated_at`
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
    '2026-04-08 10:00:00'
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
    '2026-04-09 09:30:00'
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
    '2026-04-12 12:00:00'
  );

ALTER TABLE `room_types` AUTO_INCREMENT = 4;
ALTER TABLE `rooms` AUTO_INCREMENT = 19;
ALTER TABLE `bookings` AUTO_INCREMENT = 4;
ALTER TABLE `user` AUTO_INCREMENT = 2;
