
DELIMITER //

CREATE PROCEDURE CalculateCartTotalPrice (IN customer_id INT, OUT total_price DECIMAL(10, 2))
BEGIN
    SELECT SUM(quantity * price) INTO total_price
    FROM Cart
    JOIN Products ON Cart.productId = Products.productId
    WHERE customerId = customer_id;
END //

DELIMITER ;
