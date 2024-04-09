# 6.	Write an SQL query to create index on the email column.

CREATE TABLE PersonForIndex (
    id INT PRIMARY KEY,
    email VARCHAR(150)
);

CREATE INDEX idx_email ON PersonForIndex (email);

select * from PersonForIndex;

show index from PersonForIndex;