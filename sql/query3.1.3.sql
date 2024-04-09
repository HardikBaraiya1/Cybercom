
CREATE TABLE sales (
    id INT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

drop table sales;

INSERT INTO sales (id, date, customer_id, product_id, quantity, total_price) 
VALUES 
  (1, '2021-02-15', 1, 101, 2, 50.00),
  (2, '2021-05-10', 2, 102, 1, 30.00),
  (3, '2021-07-20', 3, 103, 3, 90.00),
  (4, '2021-10-05', 4, 104, 4, 120.00),
  (5, '2022-01-15', 5, 105, 2, 70.00),
  (6, '2022-04-10', 1, 106, 1, 40.00),
  (7, '2022-06-20', 2, 107, 3, 110.00),
  (8, '2022-09-05', 3, 108, 2, 80.00),
  (9, '2023-01-15', 4, 109, 4, 150.00),
  (10, '2023-05-10', 5, 110, 1, 60.00),
  (11, '2023-08-20', 1, 111, 3, 100.00),
  (12, '2023-11-05', 2, 112, 2, 70.00),
  (13, '2024-03-15', 3, 113, 1, 50.00),
  (14, '2024-08-10', 4, 114, 2, 90.00),
  (15, '2025-02-20', 5, 115, 3, 120.00),
  (16, '2025-06-05', 1, 116, 4, 140.00),
  (17, '2025-09-15', 2, 117, 1, 30.00),
  (18, '2026-04-10', 3, 118, 2, 80.00),
  (19, '2026-11-20', 4, 119, 3, 110.00),
  (20, '2027-05-05', 5, 120, 2, 70.00);


select * from sales;
# Write a query to retrieve the total sales for each month in the year 2021, sorted in ascending order by month.
SELECT 
    DATE_FORMAT(date, '%m-%Y') AS month,
    SUM(total_price) AS total_sales
FROM 
    sales
WHERE 
    YEAR(date) = 2021
GROUP BY 
    DATE_FORMAT(date, '%m-%Y')
ORDER BY 
    DATE_FORMAT(date, '%m-%Y');
