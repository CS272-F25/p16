// Global Navbar
document.getElementById("navbar").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
  <a class="navbar-brand" href="index.html">Smart Grocery</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
      <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      <li class="nav-item"><a class="nav-link" href="recipe-recommendations.html">Recipes</a></li>
      <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
      <li class="nav-item"><a class="nav-link" href="cart.html">Cart</a></li>
      <li class="nav-item"><a class="nav-link" href="checkout.html">Checkout</a></li>
    </ul>
  </div>
</nav>
`;


// Footer script
document.getElementById("footer").innerHTML = `
  <footer class="global-footer">
    <p>© 2025 SmartGrocery</p>
  </footer>
`;