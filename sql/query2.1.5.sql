# 5.	Write an SQL query to report all customers who never order anything. Return the result table in any order.


CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(150)
);


INSERT INTO Customers VALUES
(1, 'Joe'),
(2, 'Henry'),
(3, 'Sam'),
(4, 'Max');



CREATE TABLE Orders (
    id INT PRIMARY KEY,
    customerId INT,
    FOREIGN KEY (customerId) REFERENCES Customers(id)
);


INSERT INTO Orders (id, customerId) VALUES
(1, 3),
(2, 1);

select * from Orders;	
select * from Customers;

select c.id,c.name 
	from Customers c
	left join Orders o on c.id = o.customerId
    where o.customerId is null;


