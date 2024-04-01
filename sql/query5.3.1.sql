
-- 1.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary of all employees.
SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);
select * from employees;
-- 2.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
ORDER BY total_revenue DESC;

-- 3.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than $10,000.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING total_revenue > 10000
ORDER BY total_revenue DESC;

-- 4.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than the average revenue generated by all customers.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING total_revenue > (SELECT AVG(total_revenue) FROM (SELECT SUM(o.quantity * p.price) AS total_revenue FROM order51 o JOIN products51 p ON o.product_id = p.id GROUP BY o.customer_id) AS avg_revenue)
ORDER BY total_revenue DESC;



-- 5.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the total revenue is greater than the average revenue generated by all customers, and the customer is from the "USA" or "Canada".
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
WHERE o.country IN ('USA', 'Canada')
GROUP BY e.id, e.name
HAVING total_revenue >= (SELECT AVG(total_revenue) FROM (SELECT SUM(o.quantity * p.price) AS total_revenue FROM order51 o JOIN products51 p ON o.product_id = p.id JOIN employees51 e ON o.customer_id = e.id WHERE o.country IN ('USA', 'Canada') GROUP BY o.customer_id) AS avg_revenue)
ORDER BY total_revenue DESC;
select * from products51;
-- 6.	Write a SQL query to retrieve the names of all employees who have made sales greater than $50,000 in the "orders" table.
SELECT e.name AS employee_name
FROM order51 o
JOIN employees51 e ON o.employee_id = e.id
join products51 p on o.product_id = p.id
GROUP BY e.id, e.name
HAVING SUM(o.quantity * p.price) > 50000;

-- 7.	Write a SQL query to retrieve the names of all employees who have made sales greater than the average sales of all employees in the "orders" table, sorted by sales in descending order.
SELECT e.name AS employee_name
FROM order51 o
JOIN employees51 e ON o.employee_id = e.id
join products51 p on o.product_id = p.id
GROUP BY e.id, e.name
HAVING SUM(o.quantity * p.price) > (SELECT AVG(total_sales) FROM (SELECT SUM(o.quantity * p.price) AS total_sales FROM order51 o JOIN products51 p ON o.product_id = p.id JOIN employees51 e ON o.employee_id = e.id GROUP BY e.id) AS avg_sales)
ORDER BY SUM(o.quantity * p.price) DESC;

-- 8.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than $5,000.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
WHERE o.country = 'USA'
GROUP BY e.id, e.name
HAVING total_revenue > 5000
ORDER BY total_revenue DESC;

-- 9.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than the average revenue generated by all customers from the "USA".
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
WHERE o.country = 'USA'
GROUP BY e.id, e.name
HAVING total_revenue >= (SELECT AVG(total_revenue) FROM (SELECT SUM(o.quantity * p.price) AS total_revenue FROM order51 o JOIN products51 p ON o.product_id = p.id JOIN employees51 e ON o.customer_id = e.id WHERE o.country = 'USA' GROUP BY o.customer_id) AS avg_revenue)
ORDER BY total_revenue DESC;

-- 10.	Write a SQL query to retrieve the names and total revenue generated by all customers in the "orders" table, sorted by revenue in descending order, where the customer is from the "USA" and the revenue is greater than the average revenue generated by all customers, and the customer has made at least 2 orders.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_revenue
FROM order51 o
JOIN employees51 e ON o.customer_id = e.id
JOIN products51 p ON o.product_id = p.id
WHERE o.country = 'USA'
GROUP BY e.id, e.name
HAVING COUNT(o.id) >= 2 AND total_revenue >= (SELECT AVG(total_revenue) FROM (SELECT SUM(o.quantity * p.price) AS total_revenue FROM order51 o JOIN products51 p ON o.product_id = p.id JOIN employees51 e ON o.customer_id = e.id WHERE o.country = 'USA' GROUP BY o.customer_id) AS avg_revenue)
ORDER BY total_revenue DESC;

