# 4.	Write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id. Return the result table in any order.

CREATE TABLE Person (
    id INT PRIMARY KEY,
    email VARCHAR(155)
);

INSERT INTO Person VALUES
(1, 'john@example.com'),
(2, 'bob@example.com'),
(3, 'john@example.com');

show variables like 'sql_safe_updates';
set sql_safe_updates = 0;
delete p1
	from Person p1
    join Person p2 on p1.email = p2.email AND p1.id > p2.id;

set sql_safe_updates = 1;
show variables like 'sql_safe_updates';

select * from Person;