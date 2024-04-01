

CREATE TABLE customer (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP
);


INSERT INTO customer (id, name, email, created_at) VALUES
(1, 'John Smith', 'johnsmith@gmail.com', '2022-01-01 10:00:00'),
(2, 'Jane Doe', 'janedoe@yahoo.com', '2022-01-02 11:00:00'),
(3, 'Bob Johnson', 'bobjohnson@hotmail.com', '2022-01-03 12:00:00'),
(4, 'Sarah Lee', 'sarahlee@gmail.com', '2022-01-04 13:00:00'),
(5, 'David Kim', 'davidkim@yahoo.com', '2022-01-05 14:00:00');

select * from customer;

# 1.	Write a query that selects all customers whose email address ends with "@gmail.com".
select * from customer where email like '%@gmail.com';

# 2.	Write a query that selects the customer with the earliest created_at date.
select * from customer where created_at = (select min(created_at) from customer);

# 3.	Write a query that selects the name and email of customers who were created on or after January 3, 2022.
select name,email from customer where created_at >= '2022-01-03';

# 4.	Write a query that updates the email address of the customer with id=5 to "davidkim@gmail.com".
update customer set  email = 'davidkim@gmail.com' where id=5;

# 5.	Write a query that deletes the customer with id=2.
delete  from customer where id=2;

# 6.	Write a query that calculates the total number of customers in the "customers" table.
select count(*) as total_number_of_customers from customer;

