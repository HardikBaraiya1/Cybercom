

CREATE TABLE Employees42 (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    DepartmentID INT,
    Salary DECIMAL(10, 2),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);


CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);


CREATE TABLE Salaries (
    EmployeeID INT,
    Salary DECIMAL(10, 2),
    Date DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees42(EmployeeID)
);


-- Insert sample data into Employees table
INSERT INTO Employees42 (EmployeeID, Name, DepartmentID, Salary) VALUES
(1, 'Rajesh Sharma', 1, 50000),
(2, 'Priya Patel', 2, 55000),
(3, 'Amit Singh', 1, 60000),
(4, 'Neha Kumar', 2, 58000),
(5, 'Sneha Gupta', 1, 52000),
(6, 'Deepak Verma', 3, 62000),
(7, 'Manish Kapoor', 3, 58000),
(8, 'Anita Singh', 2, 53000),
(9, 'Arun Mehta', 1, 65000),
(10, 'Pooja Sharma', 2, 54000);

-- Insert sample data into Departments table
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance');

-- Insert sample data into Salaries table
INSERT INTO Salaries (EmployeeID, Salary, Date) VALUES
(1, 50000, '2023-01-01'),
(2, 55000, '2023-01-01'),
(3, 60000, '2023-01-01'),
(4, 58000, '2023-01-01'),
(5, 52000, '2023-01-01'),
(6, 62000, '2023-01-01'),
(7, 58000, '2023-01-01'),
(8, 53000, '2023-01-01'),
(9, 65000, '2023-01-01'),
(10, 54000, '2023-01-01');



-- 1.	Write a query to return the names of all employees who work in the 'Sales' department.
SELECT Name FROM Employees42 WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE DepartmentName = 'Sales');
select e.name from Employees42 e inner join departments d on e.departmentId = d.DepartmentID where DepartmentName='Sales';

-- 2.	Write a query to return the total number of employees in each department, ordered by department name.
SELECT d.DepartmentName, COUNT(e.EmployeeID) AS TotalEmployees FROM Departments d
LEFT JOIN Employees42 e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName
ORDER BY d.DepartmentName;

-- 3.	Write a query to return the average salary for each department, ordered by department name.
SELECT d.DepartmentName, AVG(e.Salary) AS Average_salary FROM Departments d
LEFT JOIN Employees42 e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName
ORDER BY d.DepartmentName;

-- 4.	Write a query to return the top 10% of highest paid employees, ordered by salary.
SELECT *
FROM Employees
ORDER BY Salary DESC
LIMIT (SELECT CEIL(COUNT(*) * 0.1) FROM Employees);
-- left

-- 5.	Write a query to return the salary of each employee for their latest salary entry.
SELECT e.Name, s.Salary FROM Employees42 e
INNER JOIN (
    SELECT EmployeeID, Salary FROM Salaries
    WHERE (EmployeeID, Date) IN (
        SELECT EmployeeID, MAX(Date) FROM Salaries
        GROUP BY EmployeeID
    )
) s ON e.EmployeeID = s.EmployeeID;
