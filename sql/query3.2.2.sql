
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);
CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

-- Add data to the users table
INSERT INTO users (id, name, created_at)
VALUES
    (1, 'Alice', '2022-01-05 10:00:00'),
    (2, 'Bob', '2022-02-10 12:30:00'),
    (3, 'Charlie', '2022-03-15 08:45:00');

-- Add data to the posts table
INSERT INTO posts (id, user_id, body, created_at)
VALUES
    (1, 1, 'This is Alice''s post.', '2022-01-10 09:00:00'),
    (2, 2, 'This is Bob''s post.', '2022-02-20 14:15:00'),
    (3, 3, 'This is Charlie''s post.', '2022-03-25 11:20:00');

-- Add data to the likes table
INSERT INTO likes (id, user_id, post_id, created_at)
VALUES
    (1, 2, 1, '2022-01-12 10:30:00'),
    (2, 3, 1, '2022-01-15 11:45:00'),
    (3, 1, 2, '2022-02-22 16:00:00'),
    (4, 2, 3, '2022-03-30 09:30:00');


# Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022, along with the total number of likes received for each user's posts.
select 
	u.name,    
	COUNT(p.id) AS posts,
    COUNT(l.id) AS likes 
    from users u
	left join posts p on u.id = p.user_id
    left join likes l on u.id = l.user_id
    
where year(u.created_at) = 2022
	group by u.id,u.name;
    
    
