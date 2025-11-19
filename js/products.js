fetch('merchandise.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    products = rows.map(row => {
      const [name, price, stock] = row.split(',');
      return { name, price};
    });

    renderProducts(products);
});
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
    });
}
//the actual search
document.getElementById('search-bar').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);
  });