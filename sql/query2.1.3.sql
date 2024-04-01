#3.	Write an SQL query to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.Note that you must write a single update statement, do not write any select statement for this problem.


-- +-------------+----------+
-- | Column Name | Type     |
-- +-------------+----------+
-- | id          | int      |
-- | name        | varchar  |
-- | sex         | ENUM     |
-- | salary      | int      |
-- +-------------+----------+
CREATE TABLE Salary (
    id INT PRIMARY KEY,
    name VARCHAR(155),
    sex ENUM('m', 'f'),
    salary INT
);

INSERT INTO Salary VALUES
(1, 'A', 'm', 500),
(2, 'B', 'f', 1800),
(3, 'C', 'm', 8500),
(4, 'D', 'f', 9800);


select * from Salary;

show variables like 'sql_safe_updates';

set sql_safe_updates = 0;
update Salary 
	set sex = CASE
					when sex='m' then 'f'
                    when sex='f' then 'm'
                    else sex
                    
			   end;
set sql_safe_updates=1;

select * from Salary;

show variables like 'sql_safe_updates';
    
    