# Create a database structure for worldwide cricket team. 
-- Database will contain, each player’s name, its country, it’s expertise and so on

create table country(
	countryId int primary key auto_increment,
    countryName varchar(100),
    captainName varchar(150)
);

alter table country
modify countryName varchar(100) not null,
modify captainName varchar(150) not null;

create table player(
	playerId int primary key auto_increment,
    playerName varchar(150) not null,
    countryId int,
    expertise varchar(255),
    jerseyNumber int not null,
    
    foreign key(countryId) references country(countryId)
);

insert into country (countryName, captainName)
values ('India', 'Rohit Sharma');

insert into player(playerName,countryId,expertise,jerseyNumber) values
('Virat Kohli', (SELECT countryId FROM country WHERE countryName = 'India'), 'Batsman',12),
('Rohit Sharma', (SELECT countryId FROM country WHERE countryName = 'India'), 'Batsman',18);

select * from player;
