document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
});

async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    
    try {
        const response = await fetch('src/data/merchandise.csv');
        const csvText = await response.text();
        
        const allLines = csvText.split('\n');
        const productLines = allLines.slice(1);

        let cleanProducts = [];

        for (let i = 0; i < productLines.length; i++) {
            const currentLine = productLines[i];
            const columns = currentLine.split(',');

            if (columns.length >= 2) {
                cleanProducts.push({
                    name: columns[0].trim(),
                    price: columns[1].trim()
                });
            }
        }

        cleanProducts.sort(function() { return 0.5 - Math.random() });
        const selectedProducts = cleanProducts.slice(0, 4);

        let htmlContent = "";

        for (let i = 0; i < selectedProducts.length; i++) {
            const product = selectedProducts[i];

            htmlContent += `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm">
                <div class="card-body text-center">
                        <h5 class="card-title text-truncate">${product.name}</h5>
                        <p class="card-text text-success fw-bold fs-5">${product.price}</p>
                        <a href="products.html" class="btn btn-sm btn-light w-100">Add to Cart</a>
                    </div>
                </div>
            </div>
            `;
        }

        container.innerHTML = htmlContent;

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="text-danger">Could not load specials.</p>';
    }
}