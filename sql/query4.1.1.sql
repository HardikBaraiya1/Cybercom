use internship;

CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE books41 (
    id INT PRIMARY KEY,
    title VARCHAR(100),
    author_id INT,
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE book_category_mappings (
    id INT PRIMARY KEY,
    book_id INT,
    category_id INT,
    FOREIGN KEY (book_id) REFERENCES books41(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);


INSERT INTO authors (id, name) VALUES
(1, 'X'),
(2, 'Y'),
(3, 'Z');

INSERT INTO books41 (id, title, author_id, publication_date) VALUES
(1, 'A', 1, '2020-01-15'),
(2, 'B', 2, '2020-05-20'),
(3, 'C', 3, '2019-11-10'),
(4, 'D', 1, '2020-08-25'),
(5, 'E', 2, '2018-03-12');

INSERT INTO book_categories (id, name) VALUES
(1, 'Fiction'),
(2, 'Non-Fiction'),
(3, 'Science Fiction');

INSERT INTO book_category_mappings (id, book_id, category_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 1),
(5, 5, 3);


-- 1.	Write a query to find all books published in the year 2020.
SELECT title FROM books41 WHERE YEAR(publication_date) = 2020;

-- 2.	Write a query to find the name of the author who has written the most number of books.
SELECT a.name AS author_name FROM authors a
JOIN (
    SELECT author_id, COUNT(*) AS num_books FROM books41
    GROUP BY author_id
    ORDER BY num_books DESC
    LIMIT 1
) AS b ON a.id = b.author_id;


-- 3.	Write a query to find the name of the category with the most number of books.
SELECT bc.name AS category_name
FROM book_categories bc
JOIN (
    SELECT category_id, COUNT(*) AS num_books
    FROM book_category_mappings
    GROUP BY category_id
    ORDER BY num_books DESC
    LIMIT 1
) AS b ON bc.id = b.category_id;

-- 4.	Write a query to find the name of the author who has written the most number of books in the category "fiction".
SELECT a.name AS author_name
FROM authors a
JOIN (
    SELECT author_id, COUNT(*) AS num_books
    FROM books
    WHERE id IN (
        SELECT book_id
        FROM book_category_mappings
        WHERE category_id = (
            SELECT id
            FROM book_categories
            WHERE name = 'Fiction'
        )
    )
    GROUP BY author_id
    ORDER BY num_books DESC
    LIMIT 1
) AS b ON a.id = b.author_id;

-- 5.	Write a query to find the titles of the top 5 most popular books. The popularity of a book is defined as the number of times it has been borrowed by customers. Assume that information about book borrowings is stored in a separate table called book_borrowings with the following columns:
-- id: unique identifier for each borrowing
-- book_id: foreign key pointing to the books table
-- customer_id: foreign key pointing to the customers table
-- borrow_date: date on which the book was borrowed


CREATE TABLE book_borrowings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    customer_id INT,
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books41(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

drop table book_borrowings;

INSERT INTO book_borrowings (book_id, customer_id, borrow_date) VALUES
(1, 1, '2023-01-01'),
(3, 3, '2023-01-03'),
(1, 4, '2023-01-04');

SELECT b.title, COUNT(bb.id) AS num_borrowings
FROM books41 b
INNER JOIN book_borrowings bb ON b.id = bb.book_id
GROUP BY b.id, b.title
ORDER BY num_borrowings DESC
LIMIT 5;
