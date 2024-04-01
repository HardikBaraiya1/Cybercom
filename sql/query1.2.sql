#2.	Create a database structure for students and its college. 
-- One student can be on one college only. 

create table college(
	collegeId int auto_increment primary key,
    collegeName varchar(170) not null
);

insert into college(collegeName) values ('GEC MODASA'),('GEC BHAVNAGAR'),('GEC PATAN');
select * from college;

create table student(
	studentId int auto_increment primary key,
    studentName varchar(255) not null,
    collegeId int,
    
    foreign key(collegeId) references college(collegeId)
);

insert into student(studentName,collegeId) values ('Hardik',2),('saman',1),('Uman',3);

select * from student;

select s.studentName,c.collegeName from student s
join college c on s.collegeId = c.collegeId;