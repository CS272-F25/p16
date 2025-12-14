const API_KEY = "8ed963731dc9494d94e886e150d6ce1f";

const ingredientsInput = document.getElementById("ingredientsInput");
const countryDropdown = document.getElementById("countryDropdown");
const recipesContainer = document.getElementById("recipesContainer");
const searchBtn = document.getElementById("searchBtn");

// --- Helper to strip all HTML tags ---
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

searchBtn.addEventListener("click", async () => {
  const ingredients = ingredientsInput.value.trim();
  const cuisine = countryDropdown.value;

  if (!ingredients) {
    alert("Please enter at least one ingredient.");
    return;
  }

  recipesContainer.innerHTML = "<p>Loading recipes...</p>";

  const recipes = await fetchRecipes(ingredients, cuisine);
  displayRecipes(recipes);
});

async function fetchRecipes(ingredients, cuisine) {
  const params = new URLSearchParams({
    includeIngredients: ingredients,
    cuisine,
    number: 25,
    addRecipeInformation: true
  });

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params}&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";

  if (!recipes.length) {
    recipesContainer.textContent = "No recipes found.";
    return;
  }

  recipes.forEach(r => {
    // Strip all HTML from summary
    const summaryText = r.summary ? stripHtml(r.summary) : "No summary available.";

    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card h-100 shadow-sm p-3">
        <img src="${r.image}" class="card-img-top mb-2" alt="${r.title}">
        <div class="card-body">
          <h5 class="card-title">${r.title}</h5>
          <p>${summaryText}</p>
        </div>
      </div>
    `;

    recipesContainer.appendChild(card);
  });
}
