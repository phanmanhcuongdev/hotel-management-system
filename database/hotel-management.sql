CREATE DATABASE IF NOT EXISTS hotel_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

use hotel_management;

DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS used_services;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS booked_rooms;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS room_types;
DROP TABLE IF EXISTS bill;
DROP TABLE IF EXISTS used_service;
DROP TABLE IF EXISTS booked_room;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS hotel;

CREATE TABLE hotel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    star_level INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    mail VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_card_number VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    description VARCHAR(255)
);

CREATE TABLE service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL
);

CREATE TABLE room (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    description VARCHAR(500),
    hotel_id INT NOT NULL,
    CONSTRAINT fk_room_hotel
        FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

CREATE TABLE booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_date DATE NOT NULL,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    note VARCHAR(500),
    client_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_booking_client
        FOREIGN KEY (client_id) REFERENCES client(id),
    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE booked_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    is_checked_in BOOLEAN NOT NULL DEFAULT FALSE,
    note VARCHAR(500),
    booking_id INT NOT NULL,
    room_id VARCHAR(255) NOT NULL,
    CONSTRAINT fk_booked_room_booking
        FOREIGN KEY (booking_id) REFERENCES booking(id),
    CONSTRAINT fk_booked_room_room
        FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE used_service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    service_id INT NOT NULL,
    booked_room_id INT NOT NULL,
    CONSTRAINT fk_used_service_service
        FOREIGN KEY (service_id) REFERENCES service(id),
    CONSTRAINT fk_used_service_booked_room
        FOREIGN KEY (booked_room_id) REFERENCES booked_room(id)
);

CREATE TABLE bill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_date DATE NOT NULL,
    payment_amount DECIMAL(15,2) NOT NULL,
    payment_type INT NOT NULL,
    note VARCHAR(500),
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_bill_booking
        FOREIGN KEY (booking_id) REFERENCES booking(id),
    CONSTRAINT fk_bill_user
        FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE room_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(19, 2) NOT NULL,
    capacity INT
);

CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    room_type_id BIGINT NOT NULL,
    CONSTRAINT fk_rooms_room_type
        FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    room_id BIGINT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT fk_bookings_room
        FOREIGN KEY (room_id) REFERENCES rooms(id)
);
