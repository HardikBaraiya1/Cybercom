

CREATE TABLE Activity (
    player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, event_date)
);

INSERT INTO Activity (player_id, device_id, event_date, games_played)
VALUES
    (1, 2, '2016-03-01', 5),
    (1, 2, '2016-05-02', 6),
    (2, 3, '2017-06-25', 1),
    (3, 1, '2016-03-02', 0),
    (3, 4, '2018-07-03', 5);
    
    
# Write an SQL query to report the first login date for each player. Return the result table in any order.
select player_id, min(event_date) as first_login from Activity
group by player_id;


# Write an SQL query to report the device that is first logged in for each player. Return the result table in any order.
select player_id, device_id from Activity
where (player_id, event_date) 
in (
	select player_id, min(event_date) as first_login from Activity
	group by player_id
);


select * from Activity;

# Write an SQL query to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date. Check the example for clarity. Return the result table in any order.
select player_id,event_date,
		sum(games_played) over (partition by player_id order by event_date) as games_played_so_far 
        from Activity;
        
        
