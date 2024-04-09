# 8.	Write an SQL query to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead. Return the result table in any order.


CREATE TABLE if not exists PersonForAddress (
    personId INT PRIMARY KEY,
    lastName VARCHAR(100),
    firstName VARCHAR(100)
);


CREATE TABLE if not exists Address (
    addressId INT PRIMARY KEY AUTO_INCREMENT,
    personId INT,
    city VARCHAR(100),
    state VARCHAR(100),
    FOREIGN KEY (personId) REFERENCES PersonForAddress(personId)
);


INSERT INTO PersonForAddress (personId, lastName, firstName)
VALUES (1, 'sumit', 'Dodiya'),
       (2, 'Darshan', 'Bamba'),
       (3,'Mehul', 'Ratan');


INSERT INTO Address (personId, city, state)
VALUES (2, 'Bhavnagar', 'Gujarat'),
       (3, 'Surat', 'Gujarat');

select p.firstName,p.lastName,a.city,a.state from PersonForAddress p
left join Address a on p.personId = a.personId;