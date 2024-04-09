

CREATE TABLE Cars (
    CarID INT PRIMARY KEY,
    Brand VARCHAR(50),
    Model VARCHAR(50),
    Year INT,
    Mileage INT,
    Price DECIMAL(10,2),
    Available BIT
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20)
);

CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    CarID INT,
    CustomerID INT,
    SaleDate DATE,
    SalePrice DECIMAL(10,2),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Insert data into Cars table
INSERT INTO Cars (CarID, Brand, Model, Year, Mileage, Price, Available)
VALUES (1, 'Toyota', 'Camry', 2020, 15000, 25000, 1),
       (2, 'Honda', 'Civic', 2019, 20000, 20000, 1),
       (3, 'Ford', 'Fusion', 2018, 30000, 18000, 1);

-- Insert data into Customers table
INSERT INTO Customers (CustomerID, FirstName, LastName, Email, PhoneNumber)
VALUES (1, 'John', 'Doe', 'john@example.com', '123-456-7890'),
       (2, 'Jane', 'Smith', 'jane@example.com', '987-654-3210');

-- Insert data into Sales table
INSERT INTO Sales (SaleID, CarID, CustomerID, SaleDate, SalePrice)
VALUES (1, 1, 1, '2023-05-15', 25000),
       (2, 2, 2, '2023-06-20', 20000),
       (3, 3, 1, '2023-07-10', 18000);


-- 1.	Retrieve the top 10 most expensive cars from the Cars table.
SELECT CarID, Brand, Model, Year, Mileage, Price FROM Cars ORDER BY Price DESC limit 10;

-- 2.	Retrieve the average price of all available cars from the Cars table.
SELECT AVG(Price) AS AveragePrice FROM Cars WHERE Available = 1;

-- 3.	Retrieve the list of customers who have purchased a car, along with the total number of cars each customer has purchased.
SELECT c.CustomerID, c.FirstName, c.LastName, COUNT(s.CarID) AS TotalCarsPurchased
FROM Customers c
INNER JOIN Sales s ON c.CustomerID = s.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;

-- 4.	Retrieve the list of customers who have not yet made a purchase.
SELECT * FROM Customers WHERE CustomerID NOT IN (SELECT DISTINCT CustomerID FROM Sales);

-- 5.	Insert a new car into the Cars table with the following information: Brand='Toyota', Model='Corolla', Year=2022, Mileage=0, Price=20000, Available=1.
INSERT INTO Cars (Brand, Model, Year, Mileage, Price, Available) VALUES ('Toyota', 'Corolla', 2022, 0, 20000, 1);

-- 6.	Update the price of all cars in the Cars table by adding 10% to their current price.
UPDATE Cars SET Price = Price * 1.10;

-- 7.	Delete all sales from the Sales table that occurred before January 1, 2022.
DELETE FROM Sales WHERE SaleDate < '2022-01-01';
