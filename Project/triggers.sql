
DELIMITER //

CREATE TRIGGER CalculateTotalAmountBeforeInsert
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    DECLARE total DECIMAL(10, 2);
    SELECT SUM(quantity * price) INTO total
    FROM Cart
    JOIN Products ON Cart.productId = Products.productId
    WHERE customerId = NEW.customerId;

    SET NEW.totalAmount = total;
END //

DELIMITER ;
