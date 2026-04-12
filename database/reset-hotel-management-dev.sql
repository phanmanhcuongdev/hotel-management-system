-- Reset and recreate the database used by the current codebase.
-- This script intentionally destroys the existing schema and data.

DROP DATABASE IF EXISTS `hotel_management_dev`;

CREATE DATABASE `hotel_management_dev`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `hotel_management_dev`;

CREATE TABLE `room_types` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) DEFAULT NULL,
  `price` DECIMAL(19,2) NOT NULL,
  `capacity` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `hotels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `star_level` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rooms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `room_number` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `room_type_id` BIGINT NOT NULL,
  `hotel_id` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_rooms_room_number` (`room_number`),
  KEY `idx_rooms_status` (`status`),
  KEY `idx_rooms_room_type_id` (`room_type_id`),
  KEY `idx_rooms_hotel_id` (`hotel_id`),
  CONSTRAINT `fk_rooms_room_type`
    FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`),
  CONSTRAINT `fk_rooms_hotel`
    FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_card_number` VARCHAR(50) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(15) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_clients_id_card_number` (`id_card_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `position` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bookings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `guest_name` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `room_id` BIGINT NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `client_id` INT DEFAULT NULL,
  `user_id` INT DEFAULT NULL,
  `discount` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `note` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bookings_status` (`status`),
  KEY `idx_bookings_room_id` (`room_id`),
  KEY `idx_bookings_client_id` (`client_id`),
  KEY `idx_bookings_user_id` (`user_id`),
  CONSTRAINT `fk_bookings_room`
    FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `fk_bookings_client`
    FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `fk_bookings_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `booked_rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `checkin` DATE NOT NULL,
  `checkout` DATE NOT NULL,
  `discount` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `is_checked_in` TINYINT(1) NOT NULL DEFAULT 0,
  `note` VARCHAR(500) DEFAULT NULL,
  `booking_id` BIGINT NOT NULL,
  `room_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_booked_rooms_booking_id` (`booking_id`),
  KEY `idx_booked_rooms_room_id` (`room_id`),
  CONSTRAINT `fk_booked_rooms_booking`
    FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `fk_booked_rooms_room`
    FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `unit` VARCHAR(255) NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_services_name_unit` (`name`, `unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `used_services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `discount` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `service_id` INT NOT NULL,
  `booked_room_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_used_services_service_id` (`service_id`),
  KEY `idx_used_services_booked_room_id` (`booked_room_id`),
  CONSTRAINT `fk_used_services_service`
    FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `fk_used_services_booked_room`
    FOREIGN KEY (`booked_room_id`) REFERENCES `booked_rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `payment_date` DATE NOT NULL,
  `payment_amount` DECIMAL(15,2) NOT NULL,
  `payment_type` INT NOT NULL,
  `note` VARCHAR(500) DEFAULT NULL,
  `booking_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bills_booking_id` (`booking_id`),
  KEY `idx_bills_user_id` (`user_id`),
  CONSTRAINT `fk_bills_booking`
    FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `fk_bills_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
