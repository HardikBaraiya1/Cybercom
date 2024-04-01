use internship;
show tables;

select * from employees;
DESC employees;
DELIMITER //
CREATE PROCEDURE add_employee(IN id int, IN name VARCHAR(255),IN department VARCHAR(255),IN salary DECIMAL(10,2))
BEGIN
INSERT INTO employees values (id,name,department,salary);
END //
DELIMITER ;

CALL add_employee(7,'G','sales',76000);

DELIMITER //
-- directly not possible to dynamically give name of table in procedure
CREATE PROCEDURE fetchAll(IN tableName text)
BEGIN
	select * from tableName;
END //
DELIMITER ;
DROP PROCEDURE fetchAll;
-- CALL fetchAll(employees);

DELIMITER //
CREATE PROCEDURE get_emp_byId(IN thisId INT)
BEGIN
	select * from employees where id = thisId;
END //
DELIMITER ;
DROP PROCEDURE Get_emp_byId;
CALL get_emp_byId(1);


DELIMITER //
CREATE PROCEDURE update_employee(IN newId int, IN newName VARCHAR(255),IN newDep VARCHAR(255),IN newSalary DECIMAL(10,2))
BEGIN
UPDATE employees SET name = newName , department = newDep , salary =newSalary where id = newId;
END //
DELIMITER ;
CALL get_emp_byId(1);
CALL update_employee(1,'a','Marketing',76000);


DELIMITER //
CREATE PROCEDURE delete_emp_byId(IN thisId INT)
BEGIN
	DELETE FROM employees where id = thisId;
END //
DELIMITER ;
DROP PROCEDURE delete_emp_byId;
CALL get_emp_byId(7);
CALL delete_emp_byId(7);