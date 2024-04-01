# 2.Write an SQL query to report the movies with an odd-numbered ID and a description that is not "boring". 
-- Return the result table ordered by rating in descending order.

-- Create the Cinema table
CREATE TABLE cinema (
    id INT PRIMARY KEY,
    movie VARCHAR(150),
    description VARCHAR(255),
    rating FLOAT
);

alter table cinema
	modify rating decimal(4,2);
    

INSERT INTO Cinema VALUES
    (1, 'War', 'great 3D', 8.9),
    (2, 'Science', 'fiction', 8.5),
    (3, 'irish', 'boring', 6.2),
    (4, 'Ice song', 'Fantacy', 8.6),
    (5, 'House card', 'Interesting', 9.1);

select * from cinema where 
	mod(id,2)=1	AND	description != 'boring'
order by rating desc;	-- desc for descending order 

