create database if not exists hotel_management
  character set utf8mb4
  collate utf8mb4_unicode_ci;

use hotel_management;

create table room_types (
    id bigint auto_increment primary key,
    name varchar(255) not null,
    price decimal(19, 2) not null,
    capacity int
);

create table rooms (
    id bigint auto_increment primary key,
    room_number varchar(255) not null,
    status varchar(255) not null,
    room_type_id bigint not null,
    foreign key (room_type_id) references room_types(id)
);

create table users (
    id bigint auto_increment primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    full_name varchar(255) not null,
    position varchar(255) not null,
    mail varchar(255),
    description varchar(255)
);

create table clients (
    id bigint auto_increment primary key,
    id_card_number varchar(255) not null,
    full_name varchar(255) not null,
    address varchar(255) not null,
    email varchar(255),
    phone varchar(15),
    description varchar(255)
);

create table bookings (
    id bigint auto_increment primary key,
    booking_date date not null,
    discount float not null,
    note varchar(500),
    client_id bigint not null,
    user_id bigint not null,
    foreign key (client_id) references clients(id),
    foreign key (user_id) references users(id)
);

create table booked_rooms (
    id bigint auto_increment primary key,
    checkin date not null,
    checkout date not null,
    discount float not null,
    is_checked_in int not null,
    note varchar(500),
    booking_id bigint not null,
    room_id bigint not null,
    foreign key (booking_id) references bookings(id),
    foreign key (room_id) references rooms(id)
);

create table services (
    id bigint auto_increment primary key,
    name varchar(255) not null,
    unit varchar(255) not null,
    price float not null
);

create table used_services (
    id bigint auto_increment primary key,
    quantity int not null,
    discount float not null,
    service_id bigint not null,
    booked_room_id bigint not null,
    foreign key (service_id) references services(id),
    foreign key (booked_room_id) references booked_rooms(id)
);

create table bills (
    id bigint auto_increment primary key,
    payment_date date not null,
    payment_amount float not null,
    payment_type int not null,
    note varchar(500),
    booking_id bigint not null,
    user_id bigint not null,
    foreign key (booking_id) references bookings(id),
    foreign key (user_id) references users(id)
);
