CREATE DATABASE hotel_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hotel_management;

CREATE TABLE tblHotel (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    starLevel INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE tblUser (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    mail VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE tblClient (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    idCardNumber INT NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    description VARCHAR(255)
);

CREATE TABLE tblService (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE tblRoom (
    ID VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(500),
    hotelID INT NOT NULL,
    FOREIGN KEY (hotelID) REFERENCES tblHotel(ID)
);

CREATE TABLE tblBooking (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    bookingDate DATE NOT NULL,
    discount FLOAT NOT NULL,
    note VARCHAR(500),
    clientID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (clientID) REFERENCES tblClient(ID),
    FOREIGN KEY (userID) REFERENCES tblUser(ID)
);

CREATE TABLE tblBookedRoom (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    discount FLOAT NOT NULL,
    isCheckedIn INT NOT NULL,
    note VARCHAR(500),
    bookingID INT NOT NULL,
    roomID VARCHAR(255) NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES tblBooking(ID),
    FOREIGN KEY (roomID) REFERENCES tblRoom(ID)
);

CREATE TABLE tblUsedService (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    discount FLOAT NOT NULL,
    serviceID INT NOT NULL,
    bookedRoomID INT NOT NULL,
    FOREIGN KEY (serviceID) REFERENCES tblService(ID),
    FOREIGN KEY (bookedRoomID) REFERENCES tblBookedRoom(ID)
);

CREATE TABLE tblBill (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    paymentDate DATE NOT NULL,
    paymentAmount FLOAT NOT NULL,
    paymentType INT NOT NULL,
    note VARCHAR(500),
    bookingID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES tblBooking(ID),
    FOREIGN KEY (userID) REFERENCES tblUser(ID)
);