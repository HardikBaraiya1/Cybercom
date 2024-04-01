

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    salary DECIMAL(10, 2)
);


INSERT INTO employees (id, name, department, salary) VALUES
(1, 'A', 'sales', 60000),
(2, 'B', 'marketing', 48000),
(3, 'C', 'sales', 55000);

-- Retrieve names and salaries of sales department employees earning more than $50,000 per year
SELECT name, salary
FROM employees
WHERE department = 'sales' AND salary > 50000;
