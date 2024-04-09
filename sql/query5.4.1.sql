select * from users43;
select * from order51;
select * from returns;
CREATE TABLE IF NOT EXISTS returns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    customer_id INT,
    returned_items INT,
    FOREIGN KEY (order_id) REFERENCES order51(id),
    FOREIGN KEY (customer_id) REFERENCES employees51(id)
);
select * from employees51;
-- Now, let's insert some sample data into the "returns" table
INSERT INTO returns (order_id, customer_id, returned_items) VALUES
(1, 1, 2),
(3, 2, 1),
(5, 3, 3);

-- 1.	Write a SQL query to retrieve the names of all customers who have made at least one order in the "orders" table and have not made any orders in the "returns" table.
SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
WHERE e.id NOT IN(SELECT customer_id from returns);

-- 2.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned at least one item in the "returns" table.
SELECT DISTINCT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN returns r ON o.id = r.order_id;

-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned any items in the "returns" table.
SELECT distinct e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
WHERE e.id NOT IN(SELECT customer_id from returns);

-- 4.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned more items than they have ordered.
	SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN (
    SELECT order_id, SUM(returned_items) AS total_returned
    FROM returns
    GROUP BY order_id
) AS returned_items ON o.id = returned_items.order_id
WHERE returned_items.total_returned > o.quantity;


-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned more items than they have ordered.
SELECT distinct e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
LEFT JOIN (
    SELECT order_id, SUM(returned_items) AS total_returned
    FROM returns
    GROUP BY order_id
) AS returned_items ON o.id = returned_items.order_id
WHERE returned_items.total_returned IS NULL OR returned_items.total_returned <= o.quantity;

-- 6.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders.
SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING SUM(o.quantity * p.price) > 100;

-- 7.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders, sorted by the total amount spent in descending order.
SELECT e.name AS customer_name, SUM(o.quantity * p.price) AS total_spent
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING total_spent > 100
ORDER BY total_spent DESC;

-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in all categories.
SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING COUNT(DISTINCT p.category) = (SELECT COUNT(DISTINCT category) FROM products51);


-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not ordered products in all categories.
SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING COUNT(DISTINCT p.category) < (SELECT COUNT(DISTINCT category) FROM products51);

-- 10.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in at least two different categories.
SELECT e.name AS customer_name
FROM users43 e
JOIN order51 o ON e.id = o.customer_id
JOIN products51 p ON o.product_id = p.id
GROUP BY e.id, e.name
HAVING COUNT(DISTINCT p.category) >= 2;
