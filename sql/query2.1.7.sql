# 7.	Create a database schema for student grade system. It contains student data and their grade of each subject based on the different semester.


CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(150),
    date_of_birth DATE,
    address VARCHAR(255)
);


CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100)
);


CREATE TABLE Semesters (
    semester_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_name VARCHAR(100)
);


CREATE TABLE Grades (
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    subject_id INT,
    semester_id INT,
    grade DECIMAL(4,2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (semester_id) REFERENCES Semesters(semester_id)
);


INSERT INTO Students (student_name, date_of_birth, address)
VALUES ('Raman', '2000-01-01', 'manali'),
       ('Daram', '2001-02-15', 'jamanagar');


INSERT INTO Subjects (subject_name)
VALUES ('Maths'),
       ('Science');


INSERT INTO Semesters (semester_name)
VALUES ('Summer 2023'),
       ('Winter 2024');

-- Insert sample data into Grades table
INSERT INTO Grades (student_id, subject_id, semester_id, grade)
VALUES (1, 1, 1, 85.50),
       (1, 2, 1, 90.25),
       (2, 1, 1, 78.75),
       (2, 2, 1, 85.00);

select * from Grades;