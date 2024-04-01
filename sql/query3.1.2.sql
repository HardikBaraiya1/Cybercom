
CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

INSERT INTO inventory (id, name, quantity, price, category) 
VALUES 
    (1, 'A', 10, 50.00, 'Electronics'),
    (2, 'B', 20, 30.00, 'Clothing'),
    (3, 'C', 15, 25.50, 'Home Goods');

update inventory set quantity=0 where id=1;

# Write a query to retrieve the name and price of all items in the inventory where the quantity is greater than 0 and the category is 'electronics', sorted in descending order by price.
select name,price from inventory where category='Electronics' AND quantity>0 order by price desc;