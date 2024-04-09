
CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP
);

-- Insert data into blog_posts table
INSERT INTO blog_posts (id, title, body, author_id, created_at, updated_at)
VALUES 
    (1, 'First Post', 'This is the body of the first post.', 1, '2022-01-01 08:00:00', '2022-01-01 08:00:00'),
    (2, 'Second Post', 'This is the body of the second post.', 2, '2022-01-02 09:00:00', '2022-01-02 09:00:00'),
    (3, 'Third Post', 'This is the body of the third post.', 1, '2022-01-03 10:00:00', '2022-01-03 10:00:00'),
    (4, 'Fourth Post', 'This is the body of the fourth post.', 3, '2022-01-04 11:00:00', '2022-01-04 11:00:00'),
    (5, 'Fifth Post', 'This is the body of the fifth post.', 2, '2022-01-05 12:00:00', '2022-01-05 12:00:00');

-- Insert data into blog_comments table
INSERT INTO blog_comments (id, post_id, body, author_id, created_at)
VALUES 
    (1, 1, 'Great post!', 2, '2022-01-01 09:00:00'),
    (2, 1, 'Nice article!', 3, '2022-01-01 10:00:00'),
    (3, 2, 'Interesting read.', 1, '2022-01-02 10:00:00'),
    (4, 3, 'Thanks for sharing!', 2, '2022-01-03 11:00:00'),
    (5, 3, 'Well written.', 3, '2022-01-03 12:00:00'),
    (6, 3, 'Looking forward to more.', 1, '2022-01-03 13:00:00'),
    (7, 4, 'Good job!', 1, '2022-01-04 12:00:00'),
    (8, 5, 'Keep it up!', 3, '2022-01-05 13:00:00');

# Write a query to retrieve the title and body of the five most recent blog posts, along with the number of comments each post has.
select p.title,p.body,count(c.id) as Comments from blog_posts p
	left join blog_comments c on p.id = c.post_id
		group by p.id
        order by p.created_at desc
        limit 5;