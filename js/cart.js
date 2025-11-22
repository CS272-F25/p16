let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Cart loaded:", cart);

const itemContainer = document.getElementById('item-container');
itemContainer.innerHTML = '';
const totalPriceElement = document.getElementById('total-price');

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
                        <input type="number" class="form-control" value="${item.quantity}" min="0">
                    </div>
                </div>
                    
            </div>
        </div>
    `;
    itemContainer.appendChild(itemElement);

    const input = itemElement.querySelector('input');
    input.addEventListener('change', () => { 
        item.quantity = parseInt(input.value);
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== item.name);
            itemContainer.removeChild(itemElement);
            console.log(`${item.name} removed from cart.`);
            alert(`${item.name} removed from cart.`);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart updated:", cart);
        totalPriceElement.innerText = `$${cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0).toFixed(2)}`;
    });

});
totalPriceElement.innerText = `$${cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0).toFixed(2)}`;


const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding to checkout.");
    } else {
        window.location.href = 'checkout.html';
    }
});

    
