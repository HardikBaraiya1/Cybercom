
-- Create the orders table
CREATE TABLE orders2 (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2)
);

-- Add data to the orders table
INSERT INTO orders2 (id, customer_id, order_date, total_amount) VALUES
(1, 1, '2022-01-01', 100.00),
(2, 2, '2022-01-02', 150.00),
(3, 1, '2022-01-03', 200.00),
(4, 3, '2022-01-04', 120.00),
(5, 2, '2022-01-05', 180.00);

-- Calculate the total amount of orders for each customer, sorted in descending order by total amount
SELECT customer_id, SUM(total_amount) AS total_orders_amount
FROM orders2
GROUP BY customer_id
ORDER BY total_orders_amount DESC;
