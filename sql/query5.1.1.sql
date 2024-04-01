
-- 1.	Write a SQL query to retrieve the top 10 customers 
		-- who have made the most orders in the "orders" table, along with the total number of orders they have made.
        
select customer_id,count(*) as total_orders from orders2 group by customer_id order by total_orders desc limit 10;

-- 2.	Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products
		-- in the "order_details" table, sorted by the amount sold in descending order
create table if not exists products51(
		id int auto_increment primary key,
        name varchar(150),
        category varchar(150),
        price int
   );     
create table if not exists employees51(
	id int auto_increment primary key,
    name varchar(150)
 );
INSERT INTO products51 (name, category, price) VALUES 
('A', 'Electronics', 10000),
('B', 'Y', 20000),
('C', 'Z', 15000);
select * from products51;

INSERT INTO employees51 (name) VALUES 
('Jaminy'),
('Samir'),
('Salim');
select * from users43;
describe users43;
create table if not exists order51(
	id int auto_increment primary key,
    customer_id int,
    employee_id int,
    product_id int,
    quantity int,
    foreign key(customer_id) references users43(id),
    foreign key(employee_id) references employees51(id),
    foreign key(product_id) references products51(id)
);
INSERT INTO order51 (customer_id, employee_id, product_id, quantity) VALUES 
(1, 1, 1, 2),
(1, 1, 2, 1);

alter table order51
add column country varchar(150);
update order51 set country = 'USA' where  id = 1;

select * from order51;
select * from users43;
select * from products51;
-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days.
	select u.name , sum(o.quantity*p.price) as total_amount_spend , sum(case when o.orderDate >= date_sub(current_date(), interval 30 day) then o.quantity * price else 0 end) as amount_spend_last_30Days
    from order51 o
    join users43 u on u.id = o.customer_id
    join products51 p on p.id = o.product_id
    group by o.customer_id;
    
-- 4.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than 
		-- the average salary of all employees in the "employees" table, sorted by salary in descending order.
select name,salary from employees where salary > (select avg(salary) from employees) order by salary desc;

select e1.name,e1.salary from employees e1
join (
	select avg(salary) as avg_salary from employees
) as avg_table on e1.salary > avg_table.avg_salary order by e1.salary desc;



-- 	5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- 	but have not made any orders in the last 90 days.
select u.name from users43 u
inner join orders43 o on u.id = o.user_id and o.created_at < date_sub(curdate(), interval 90 day);


-- 6.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the minimum salary 
	-- of their department in the "employees" table, sorted by department ID and then by salary in descending order.
    select * from employees;
    select e.name,e.salary from employees e
    join(
		select department, min(salary) as min_salary from employees
        group by department
    )as min_salaries on e.department = min_salaries.department
    where e.salary >min_salaries.min_salary
    order by e.department,e.salary desc;
    
-- 7.	Write a SQL query to retrieve the names and salaries of the five highest paid employees 
	-- in each department of the "employees" table, sorted by department ID and then by salary in descending order.
    select * from employees;
SELECT name, salary, department FROM employees e1
WHERE (
    SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.department = e1.department AND e2.salary >= e1.salary
) <= 5
ORDER BY department, salary DESC;



-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table,
	-- but have not made any orders for products in the "products" table with a price greater than $100.
select * from product;

select u.name from users u
inner join orders o on u.id = o.user_id
left join product p on u.id = o.user_id and price < 100;

-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
	-- along with the total amount they have spent on all orders and the average amount they have spent per order.
select * from orders2;
select u.name,
		sum(total_amount)as total_amount_spend,
		avg(total_amount) as avarage_amount_spend from users u 
inner join orders2 o on u.id = o.customer_id
group by u.name	;


-- 10.	Write a SQL query to retrieve the names of all products in the "products" table that have been 
	-- ordered by customers in more than one country, along with the names of the countries where the products have been ordered.

select * from order51;
SELECT o1.customer_id,p.name,o1.country
FROM order51 o1
JOIN order51 o2 ON 
    CASE 
        WHEN o1.customer_id = o2.customer_id AND o1.country != o2.country THEN TRUE 
        ELSE NULL 
    END
JOIN products51 p ON o1.product_id = p.id
group by o1.customer_id,p.name,o1.country;
