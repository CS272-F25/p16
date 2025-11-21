// === 20 Countries in CSV ===
const countries = [
  "Italy", "Spain", "Mexico", "Thailand", "Turkey",
  "Greece", "France", "Portugal", "Brazil", "Argentina",
  "Morocco", "India", "Japan", "Vietnam", "Malaysia",
  "Indonesia", "South Korea", "China", "Singapore", "Philippines"
];

// Elements
const dropdownMenu = document.getElementById("countryDropdownMenu");
const dropdownButton = document.getElementById("countryDropdown");
const selectedCountry = document.getElementById("selectedCountry");
const recipesContainer = document.getElementById("recipesContainer");

// --- Populate Dropdown ---
countries.forEach(country => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "dropdown-item";
  a.href = "#";
  a.textContent = country;
  li.appendChild(a);
  dropdownMenu.appendChild(li);

  a.addEventListener("click", () => {
    dropdownButton.textContent = country;
    selectedCountry.textContent = country;
    loadRecipes(country);
  });
});

// --- Load CSV and Filter by Country ---
async function loadRecipes(country) {
  const response = await fetch("src/data/recipes.csv");
  const csvText = await response.text();

  const rows = csvText.trim().split("\n").slice(1);

  const recipes = rows
    .map(row => {
      const [cuisine, name, ingredients, instructions] = row.split(",");
      return { cuisine, name, ingredients, instructions };
    })
    .filter(recipe => recipe.cuisine === country);

  displayRecipes(recipes);
}

// --- Display Recipes on Page ---
function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm p-3">
        <h5>${recipe.name}</h5>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      </div>
    `;

    recipesContainer.appendChild(card);
  });
}
