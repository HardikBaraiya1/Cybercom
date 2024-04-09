# 1.	Create a database structure for employee leave application. 
-- It should include all the employee's information as well as their leave information. 

-- Create Employee table
CREATE TABLE employee(
    employeeId INT PRIMARY KEY AUTO_INCREMENT,
    employeeName VARCHAR(150) NOT NULL,
    employeeEmail VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100),
    joiningDate DATE
);

insert into employee(employeeName,employeeEmail,department,joiningDate) values
	('Ramesh', 'ramesh123@gmail.com','Testing','2020-03-23'),
    ('Shyam','shyam345@gmail.com','DevOps','2019-05-20');

CREATE TABLE LeaveApplications(
    leaveId INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT,
    FOREIGN KEY (employeeId) REFERENCES Employee(employeeId),
    leaveType VARCHAR(50),
    startDate DATE,
    endDate DATE,
    leaveStatus VARCHAR(20) DEFAULT 'Pending',
    reason TEXT
);

insert into LeaveApplications value (1,(select employeeId from employee where employeeName='Ramesh'),'Paid','2024-03-08','2024-03-10','Pending','marriage');

select * from LeaveApplications;
desc LeaveApplications;