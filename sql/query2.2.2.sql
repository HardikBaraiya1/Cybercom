
CREATE TABLE Courses (
    student VARCHAR(50),
    class VARCHAR(50),
    PRIMARY KEY (student, class)
);


INSERT INTO Courses (student, class) VALUES
('A', 'Math'),
('B', 'English'),
('C', 'Math'),
('D', 'Biology'),
('E', 'Math'),
('F', 'Computer'),
('G', 'Math'),
('H', 'Math'),
('I', 'Math');


# Write an SQL query to report all the classes that have at least five students. Return the result table in any order.
select class from Courses group by class having count(student)>=5;
