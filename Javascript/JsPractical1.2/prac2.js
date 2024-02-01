// Product  with information
const product = {
    name: "Books",
    price: 10, //in K
    quantityInStock: 50,
};

// Function to calculate total cost
function calculate(quantity) {
    if (quantity <= 0) {
        return "Quantity should be greater than 0.";
    }

    if (quantity > product.quantityInStock) {
        return "Insufficient stock.";
    }

    const totalCost = quantity * product.price;
    return `Total cost for ${quantity} units of ${product.name}: ${totalCost}`;
}


const quantityToBuy = 10;
const result = calculate(quantityToBuy);
console.log(result);
