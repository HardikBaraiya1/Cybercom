create database if not exists project;
use project;
-- drop database project;
-- product table
CREATE TABLE Products (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stockQuantity INT NOT NULL,
    UNIQUE (name)
);


-- user table
CREATE TABLE Customers (
    customerId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    CONSTRAINT check_email CHECK (email LIKE '%_@__%.__%') -- Ensuring email format is valid
);

-- address table
CREATE TABLE Address (
    addressId INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT,
    addressLine1 VARCHAR(255) NOT NULL,
    addressLine2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);

-- cart table
CREATE TABLE Cart (
    cartId INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT,
    productId INT,
    quantity INT NOT NULL,
    CONSTRAINT fk_customerCart FOREIGN KEY (customerId) REFERENCES Customers(customerId),
    CONSTRAINT fk_productCart FOREIGN KEY (productId) REFERENCES Products(productId)
);

-- counting total price
CALL CalculateCartTotalPrice(1, @totalPrice);
SELECT @totalPrice AS totalPrice;

-- order table
-- CREATE TABLE Orders (
--     orderId INT PRIMARY KEY AUTO_INCREMENT,
--     customerId INT,
--     orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     totalAmount DECIMAL(10, 2) NOT NULL,
--     addressId INT NOT NULL,
--     FOREIGN KEY (customerId) REFERENCES Customers(customerId),
--     FOREIGN KEY (addressId) REFERENCES Address(addressId)
-- );
drop table Orders;
CREATE TABLE Orders (
   orderId INT PRIMARY KEY AUTO_INCREMENT,
   customerId INT,
   orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   totalAmount DECIMAL(10, 2),  -- Include the totalAmount column
   addressId INT,
   CONSTRAINT fk_customerOrder FOREIGN KEY (customerId) REFERENCES Customers(customerId),
   CONSTRAINT fk_addressOrder FOREIGN KEY (addressId) REFERENCES Address(addressId)
);


-- orderedItems
CREATE TABLE orderItems (
    orderItemID INT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);

-- product Img
CREATE TABLE Images (
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    imagePath VARCHAR(255) NOT NULL,
    CONSTRAINT fk_productImage FOREIGN KEY (productId) REFERENCES Products(productId)
);

-- categories
CREATE TABLE Categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(255) NOT NULL
);


-- M-M relationship of category and products
CREATE TABLE ProductCategories (
    productCategoryId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    categoryId INT,
    CONSTRAINT fk_productCategory_product FOREIGN KEY (productId) REFERENCES Products(productId),
    CONSTRAINT fk_productCategory_category FOREIGN KEY (categoryId) REFERENCES Categories(categoryId)
);


-- review table
CREATE TABLE Reviews (
    reviewId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    customerId INT,
    rating INT NOT NULL,
    review TEXT,
    reviewDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_productReview FOREIGN KEY (productId) REFERENCES Products(productId),
    CONSTRAINT fk_customerReview FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);

-- payment table
CREATE TABLE Payments (
    paymentId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    paymentMethod VARCHAR(100) NOT NULL,
    transactionId VARCHAR(255),
    paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orderPayment FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);

-- shipping info
CREATE TABLE ShippingInfo (
    shippingId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    shippingAddress VARCHAR(255) NOT NULL,
    trackingNumber VARCHAR(50),
    shippingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orderShipping FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);
