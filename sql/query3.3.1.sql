# Consider a table called "books" with the following 
# columns: "id", "title", "author", "publication_year". 
# Write a SQL query to retrieve the title and author of the oldest book in the table.


create table books(
	id int auto_increment primary key,
    title varchar(155) not null,
    author varchar(175) not null,
    publication_year date not null
);

select * from books;

select title,author from books order by publication_year limit 1;