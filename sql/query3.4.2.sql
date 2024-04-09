
# 1.	Write a query that returns the first and last name of all employees who have a title that contains the word "Manager".
create table if not exists employees342(
	id int auto_increment primary key,
    firstName varchar(170),
    lastName varchar(170),
    title varchar(150)
);


insert into employees342(firstName,lastName,title,salary) values
												('Ram','Shukla','manager',50000),
                                                ('Mehul','Pandit','Intern',75000);
                                                
select * from employees342;
select firstName,lastName from employees342 where title= 'manager';

# 2.	Write a query that returns the department name and the average salary of all employees in each department.
select * from employees;
insert into employees(id,name,department,salary) values (4,'D','sales',30000),(5,'E','marketing',35000)
													,(6,'F','marketing',70000);
                                                    
select department,avg(salary) as 'Avarage salary' from employees group by department;

# 3.	Write a query that returns the number of employees who were hired in each year, sorted by year.
select * from employee;
insert into employee values (3,'Ram','ram@gmail.com','Testing','2020-7-30');
select count(employeeId) from employee group by year(joiningDate);

# 4.	Write a query that returns the first name, last name, and salary of the top 10 highest-paid employees.
select * from employees342;
alter table employees342
add column salary int;
update employees342  set salary=170000 where id=3;

INSERT INTO employees342 (firstName, lastName, title, salary)
VALUES
('Ram', 'Shukla', 'manager', 50000),
('Mehul', 'Pandit', 'Intern', 75000),
('John', 'Doe', 'Engineer', 60000),
('Jane', 'Smith', 'Analyst', 55000),
('Michael', 'Johnson', 'Manager', 70000),
('Emily', 'Brown', 'Assistant', 45000),
('David', 'Lee', 'Developer', 65000),
('Emma', 'Davis', 'Coordinator', 50000),
('Daniel', 'Wilson', 'Designer', 60000),
('Sarah', 'Taylor', 'Consultant', 70000),
('James', 'Clark', 'Administrator', 55000),
('Olivia', 'Martinez', 'Supervisor', 65000),
('Liam', 'Harris', 'Specialist', 60000),
('Sophia', 'Anderson', 'Assistant', 45000),
('William', 'Thomas', 'Technician', 55000);

select firstName,lastName from employees342 order by salary desc limit 10;

# 5.	Write a query that updates the salary of all employees in the "Sales" department to be 10% higher than their current salary.
select * from employees;
SHOW VARIABLES LIKE 'sql_safe_updates';
set sql_safe_updates = 0;
update employees 
	set salary = salary + salary * 0.1
    where department = 'sales';
set sql_safe_updates = 1;

# 6.	Write a query that deletes all employees who were hired before the year 2000.
select * from employee;
insert into employee values (4,'samir','samir@gmail.com','Testing','1980-7-30'),(5,'rajat','rajat@gmail.com','DevOps','1990-7-30');
set sql_safe_updates = 0;
delete from  employee where year(joiningDate)<2000;
set sql_safe_updates = 1;

# 7.	Write a query that creates a new table called "employee_stats" that contains the 
		-- following columns: "department_name", "total_employees", and "average_salary". 
		-- The table should include one row for each department.
create table employee_stats as 
			select title as department_name,
					count(*) as total_employees,
                    avg(salary) as average_salary
			from employees342
            group by title;
            
select * from employee_stats;


# 8.	Write a query that returns the first and last name of all employees who have the same last name as their manager.
select * from employees342;
select * from employees342 e1
join employees342 e2 on e1.lastName = e2.lastName
where e2.title = 'manager' and e1.title != 'manager';

# 9.	Write a query that returns the top 5 departments with the highest average salary.
select department_name from employee_stats order by average_salary desc limit 5;

# 10.	Write a query that returns the first and last name of all employees who have at least one dependent. 
		-- Sort the results by last name.

select * from employees342;
select firstName,lastName from employees342 where title is not null order by lastName;