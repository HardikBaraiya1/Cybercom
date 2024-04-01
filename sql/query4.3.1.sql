
	-- The users table contains the following columns:
	-- id (integer)
	-- name (text)
	-- email (text)
	-- password (text)
	-- created_at (timestamp)
	-- updated_at (timestamp)
    
create table if not exists users43(
	id int primary key,
    name text,
    email text,
    password text,
    created_at timestamp,
    updated_at timestamp
);
drop table users43;

	-- The orders table contains the following columns:
	-- id (integer)
	-- user_id (integer)
	-- amount (float)
	-- created_at (timestamp)
	-- updated_at (timestamp)
    
create table if not exists orders43(
	id int primary key,
    user_id int,
    amount float,
    created_at timestamp,
    updated_at timestamp
);


-- 	1.	Create a new user with the following information:
-- 	name: John Doe
-- 	email: john.doe@example.com
-- 	password: 123456
-- 	created_at: current timestamp
-- 	updated_at: current timestamp

INSERT INTO users43 (id,name, email, password, created_at, updated_at)
VALUES (1,'John Doe', 'john.doe@example.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


	-- 2.	Retrieve the names and email addresses of all users who have placed at least one order.
INSERT INTO users43 (id, name, email, password, created_at, updated_at)
VALUES 
(2, 'Johny Doe', 'johny.doe@example.com', '1234567', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Alice Smith', 'alice.smith@example.com', 'password123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Bob Johnson', 'bob.johnson@example.com', 'password456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO orders43 (id, user_id, amount, created_at, updated_at)
VALUES 
(1, 1, 50.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 75.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 1, 30.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- select * from orders43 inner join users43 on orders43.user_id = users43.id;

select distinct u.name,u.email from users43 u
	inner join orders43 o 
    on u.id = o.user_id;
    
    
	-- 3.	Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
select user_id,sum(amount) as total_amount from orders43 group by user_id order by total_amount desc;
    
    
	-- 4.	Retrieve the email address of the user who has placed the most orders.
    select u.email from users43 u
    join (
		select user_id, count(*) as order_count from orders43
        group by user_id
        order by order_count desc
        limit 1
    )as most_orders on u.id = most_orders.user_id;
    
-- select * from orders43;

	-- 5.	Retrieve the user IDs and the total amount of orders placed by users 
		 -- who have placed at least one order and whose total amount of orders exceeds $100.
	update orders43 set amount = 150 where id = 1;
    
	select u.id, o.amount as total_amount from users43 u
		inner join orders43 o
        on u.id = o.user_id where o.amount > 100;
        
        select * from orders43;
        select * from users43;
	
		-- 6.	Retrieve the number of users who have not placed any orders.
        select count(*) from users43 u
        left join orders43 o
        on u.id = o.user_id where o.id is null;
        
        
	-- 7.	Update the user with ID 1 to change their email address to "jane.doe@example.com".
    update users43 set email = 'jane.doe@example.com' where id = 1;
    
    -- 8.	Delete all orders placed by users whose email address contains the string "test".
    set sql_safe_updates = 0;
    delete o from orders43 o 
    join users43 u 
    on o.user_id = u.id
    where u.email like '%test%';
    
    -- 9.	Retrieve the total amount of orders placed on each day of the current week, grouped by day.
    select date_format(created_at,'%D %M-%Y') as Day ,sum(amount) from orders43 
    group by day(created_at),created_at;
    
--  10.	Retrieve the IDs and email addresses of users 
	-- who have placed an order in the current year and whose email address is in the format "example.com".
SELECT u.id, u.email
FROM users43 u
JOIN orders43 o ON u.id = o.user_id
WHERE YEAR(o.created_at) = YEAR(CURDATE()) AND u.email LIKE '%@example.com';
