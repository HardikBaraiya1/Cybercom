
-- 1.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, along with the total amount they have spent on all orders. 
	-- The output should be sorted by the total amount spent in descending order.
    select * from products51;
    select * from order51;
    select * from users43;
    select c.name, o.quantity * p.price as total_amount_spent from users43 c 
    join order51 o on o.customer_id = c.id 
    join products51 p on o.product_id = p.id and p.category = 'Electronics'
    order by total_amount_spent desc;
    
    
    -- 2.	Write a SQL query to retrieve the names of all employees who have sold at least one product in the "Clothing" category, along with the total revenue they have generated from those sales. 
			-- The output should be sorted by total revenue generated in descending order.
    SELECT
    e.name AS employee_name,
    SUM(o.quantity * p.price) AS total_revenue
FROM
    order51 o
JOIN
    employees51 e ON o.employee_id = e.id
JOIN
    products51 p ON o.product_id = p.id
WHERE
    p.category = 'Clothing'
GROUP BY
    e.id, e.name
HAVING
    total_revenue > 0
ORDER BY
    total_revenue DESC;


-- 3.	Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and "Clothing" categories. 
		-- The output should only include customers who have ordered products in both categories.
        
        SELECT
    e.name AS customer_name
FROM
    order51 o
JOIN
    employees51 e ON o.customer_id = e.id
JOIN
    products51 p ON o.product_id = p.id
WHERE
    p.category IN ('Electronics', 'Clothing')
GROUP BY
    e.id, e.name
HAVING
    COUNT(DISTINCT CASE WHEN p.category = 'Electronics' THEN p.id END) > 0
    AND COUNT(DISTINCT CASE WHEN p.category = 'Clothing' THEN p.id END) > 0;


-- 4.	Write a SQL query to retrieve the names of all employees who have sold at least one product to a customer who has a shipping address in the same city as the employee. 
		-- The output should only include employees who have made at least one such sale.
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100)
);
INSERT INTO addresses (street, city, state, country) VALUES
('10 MG Road', 'Mumbai', 'Maharashtra', 'India'),
('25 Brigade Road', 'Bangalore', 'Karnataka', 'India'),
('7 Park Street', 'Kolkata', 'West Bengal', 'India');
alter table employees51
add column address int,
add constraint fk_Employee_address_id
	foreign key(address) references addresses(id);
select * from users43;
select * from employees51;
select * from addresses;

SELECT DISTINCT
    e.name AS employee_name
FROM
    employees51 e
JOIN
    order51 o ON e.id = o.employee_id
JOIN
    employees51 c ON o.customer_id = c.id
JOIN
    addresses a_employee ON e.address = a_employee.id
JOIN
    addresses a_customer ON c.address = a_customer.id
WHERE
    a_employee.city = a_customer.city;


-- 5.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category,
		-- but have never placed an order for products in the "Clothing" category.
SELECT distinct
    e.name AS customer_name
FROM
    employees51 e
JOIN
    order51 o_electronics ON e.id = o_electronics.customer_id
JOIN
    products51 p_electronics ON o_electronics.product_id = p_electronics.id
WHERE
    p_electronics.category = 'Electronics'
    AND NOT EXISTS (
        SELECT 1
        FROM order51 o_clothing
        JOIN products51 p_clothing ON o_clothing.product_id = p_clothing.id
        WHERE o_clothing.customer_id = e.id
        AND p_clothing.category = 'Clothing'
    );
select * from order51;
select * from products51;


-- 6.	Write a SQL query to retrieve the names of all employees who have sold at least one product to customers who have placed orders for products in the "Electronics" category, but have never placed an order for products in the "Clothing" category. 
		-- The output should only include employees who have made at least one such sale.
SELECT DISTINCT
    e.name AS employee_name
FROM
    employees51 e
JOIN
    order51 o ON e.id = o.employee_id
JOIN
    products51 p ON o.product_id = p.id
JOIN
    employees51 c ON o.customer_id = c.id
WHERE
    p.category = 'Electronics'
    AND NOT EXISTS (
        SELECT 1
        FROM order51 o_clothing
        JOIN products51 p_clothing ON o_clothing.product_id = p_clothing.id
        WHERE o_clothing.customer_id = c.id
        AND p_clothing.category = 'Clothing'
    );


-- 7.	Write a SQL query to retrieve the names of all customers who have placed orders 
		-- for more than five different products in the "Electronics" category.
select * from order51;
select * from products51;
SELECT
    e.name AS customer_name
FROM
    employees51 e
JOIN
    order51 o ON e.id = o.customer_id
JOIN
    products51 p ON o.product_id = p.id
WHERE
    p.category = 'Electronics'
GROUP BY
    e.id, e.name
HAVING
    COUNT(DISTINCT p.id) >= 5;


-- 8.	Write a SQL query to retrieve the names of all employees who have sold products to customers who have placed orders 
	-- for more than five different products in the "Electronics" category. The output should only include employees who have made at least one such sale.
select * from employees51;
SELECT DISTINCT
    e.name AS employee_name
FROM
    employees51 e
JOIN
    order51 o ON e.id = o.employee_id
JOIN
    products51 p ON o.product_id = p.id
JOIN
    employees51 c ON o.customer_id = c.id
JOIN (
    SELECT
        customer_id
    FROM
        order51
    JOIN
        products51 ON order51.product_id = products51.id
    WHERE
        products51.category = 'Electronics'
    GROUP BY
        customer_id
    HAVING
        COUNT(DISTINCT products51.id) >= 5
) AS customers_more_than_five ON o.customer_id = customers_more_than_five.customer_id;
