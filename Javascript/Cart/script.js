const cart = [
    { name: 'Shoes', price: 599, quantity: 0, imgPath: 'shoes.jpeg'},
    { name: 'Shirt', price: 799, quantity: 0, imgPath: 'shirt.jpeg' },
    { name: 'Jacket', price: 999, quantity: 0, imgPath: 'jacket.jpeg'}
];

function makeCart(){
    var area = document.getElementById('container');

    for (let i=0;i<cart.length;i++) {
        let newcartData = document.createElement('div');
        newcartData.classList ='boxes';
        // console.log('index:',i,'data: ',cart)
        newcartData.innerHTML = `
        <div class="pic">
          <img src="assests/${cart[i].imgPath}" alt="logo" width="125px">
        </div>
        <div class="data">
          <h5>${cart[i].name}</h5>
          <p>₹${cart[i].price}</p>
        </div>
        <div class="incDec">
            <div class="icons" onclick="updateQuantity(${i}, -1)">-</div>
        <div id="quantity${i+1}">${cart[i].quantity}</div>
        <div class="icons" onclick="updateQuantity(${i}, 1)">+</div>
      
        </div>
        `
        // console.log(newcartData.innerHTML)
        area.appendChild(newcartData);
        // document.body.appendChild(area);
    }
}


function updateQuantity(index, change) {
    var quantityElement = document.getElementById('quantity' + (index + 1));
    var currentQuantity = cart[index].quantity;

    // not go below 0
    if (currentQuantity + change >= 0) {
        quantityElement.textContent = currentQuantity + change;
        cart[index].quantity += change;
    }
}

function checkout() {
    // Filtering items
    var selectedItems = cart.filter(item => item.quantity > 0);

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    location.href = 'checkout.html';
}











var selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

function displayCart() {
    document.getElementById('noItems').remove();

    var cartItemsElement = document.getElementById('cartItems');
    var grandTotalElement = document.getElementById('grandTotal');
    var grandTotal = 0;

    selectedItems.forEach(item => {
        var total = item.price * item.quantity;
        grandTotal += total;

        var itemRow = document.createElement('div');
        itemRow.classList.add('item-row');
        itemRow.innerHTML = `
        <div>${item.name}</div>
        <div>${item.quantity} Pcs</div>
        <div>Total: ₹${total}</div>
      `;

        cartItemsElement.appendChild(itemRow);
    });

    grandTotalElement.innerHTML = `
    <table>
    <tr>
      <td>Total:</td>
      <td>₹${grandTotal}</td>
    </tr>
    <tr>
    <td>Including GST:
    </td>
    <td>₹${grandTotal*0.18} </td>
  </tr>
  <tr>
  <td>Grand Total: </td>
  <td>₹${grandTotal+ grandTotal*0.18}</td>
</tr>
  </table>
`;
}

