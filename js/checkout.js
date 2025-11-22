let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Cart loaded:", cart);

const itemContainer = document.getElementById('item-container');
itemContainer.innerHTML = '';
const totalPriceElement = document.getElementById('total-price');
const totalQuantityElement = document.getElementById('total-quantity');
const confirmButton = document.getElementById('confirm-button');

cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add("col-12");
    itemElement.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">
                    ${item.name}
                </h5>
                <div class="row align-items-center">
                    <div class="col-9">
                        <p>
                            ${item.price} each<br>
                        </p>
                        
                    </div>
                    <div class="col-3 align-items-right">
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
                    
            </div>
        </div>
    `;
    itemContainer.appendChild(itemElement);

});

totalPriceElement.innerHTML = `Total Price: $${cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0).toFixed(2)}`;
totalQuantityElement.innerHTML = `Total Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
confirmButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before confirming your order.");
    } else {
        alert("Thank you for your purchase! Your order has been confirmed.");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'index.html';
        console.log("Order confirmed and cart cleared.");
    }
});
