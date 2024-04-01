
CREATE TABLE World (
    name VARCHAR(150) PRIMARY KEY,
    continent VARCHAR(150),
    area INT,
    population INT,
    gdp bigint
);

-- drop table World;

INSERT INTO World (name, continent, area, population, gdp)
VALUES
    ('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
    ('Albania', 'Europe', 28748, 2831741, 12960000000),
    ('Algeria', 'Africa', 2381741, 37100000, 188681000000),
    ('Andorra', 'Europe', 468, 78115, 3712000000),
    ('Angola', 'Africa', 1246700, 20609294, 100990000000);


# Write an SQL query to report the name, population, and area of the big countries.
# A country is big if:
# •	it has an area of at least three million (i.e., 3000000 km2), or
# •	it has a population of at least twenty-five million (i.e., 25000000).
select name,population,area from World where area>=3000000 or population >=25000000;
