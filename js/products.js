let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
fetch('https://raw.githubusercontent.com/mildebrandtj/product-data-p16/refs/heads/main/merchandise.csv')
  .then(res => res.text())
  .then(data => {
    const rows = data.split('\n').slice(1);

    products = rows
      .map(row => row.trim())
      .filter(row => row.length > 0)
      .map(row => {
        const [name, price] = row.split(',');
        return {
          name,
          price: price.trim(), // still a string!
          numericPrice: parseFloat(price.replace('$', '').trim()) // now usable for sorting
        };
      });

    renderProducts(products);
  });

function addToCart(product, quantity) {
  // if item already exists, this will add it to the quantity
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      numericPrice: product.numericPrice,
      quantity: quantity
    });
  }
  // save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  //alert!
  alert(`${quantity} * ${product.name} added to cart!`);
}


function renderProducts(productArray) {
    const list = document.getElementById('product-container');
    list.innerHTML = ''; //clear prodcuts that don't fit criteria

    productArray.forEach(product => {
      if (!product.name) return;
      const col = document.createElement('div');
      col.classList.add("col-12", "col-sm-6", "col-lg-4", "col-xl-3", "mb-4");
      col.innerHTML =`
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <div class="d-flex align-items-center">
              <input type="number" class="form-control me-2" value="1" min="1" max="100" style="width:80px;">
              <button class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
      list.appendChild(col);

      const button = col.querySelector('button');
      const input = col.querySelector('input');

      button.addEventListener('click', () => {
      const quantity = parseInt(input.value);
      addToCart(product, quantity);
    });
    });
}
//the actual search
document.getElementById('search-bar').addEventListener('input', function(e) {
  const q = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q));
  renderProducts(filtered);
});

//sorting buttons
document.getElementById('sort-low-high').addEventListener('click', () => {
  const sorted = [...products].sort((a, b) => a.numericPrice - b.numericPrice);
  renderProducts(sorted);
});

document.getElementById('sort-high-low').addEventListener('click', () => {
  const sorted = [...products].sort((a, b) => b.numericPrice - a.numericPrice);
  renderProducts(sorted);
});
