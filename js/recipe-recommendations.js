import { SPOONACULAR_API_KEY } from "./config.js";

const API_KEY = SPOONACULAR_API_KEY;

const PAGE_SIZE = 10;

// ================= DOM ELEMENTS =================
const ingredientsInput = document.getElementById("ingredientsInput");
const countryDropdown = document.getElementById("countryDropdown");
const recipesContainer = document.getElementById("recipesContainer");
const searchBtn = document.getElementById("searchBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

// ================= STATE =================
let currentPage = 0;
let lastSearch = {
  ingredients: "",
  cuisine: ""
};

// ================= HELPERS =================
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// ================= EVENT LISTENERS =================
searchBtn.addEventListener("click", async () => {
  const ingredients = ingredientsInput.value.trim();
  const cuisine = countryDropdown.value;

  if (!ingredients) {
    alert("Please enter at least one ingredient.");
    return;
  }

  // Reset pagination state
  currentPage = 0;
  lastSearch = { ingredients, cuisine };

  prevBtn.disabled = true;
  nextBtn.disabled = false;
  pageIndicator.textContent = "Page 1";

  await loadPage();
});

nextBtn.addEventListener("click", async () => {
  currentPage++;
  await loadPage();
});

prevBtn.addEventListener("click", async () => {
  if (currentPage > 0) {
    currentPage--;
    await loadPage();
  }
});

// ================= DATA FETCH =================
async function fetchRecipes(ingredients, cuisine, page) {
  const offset = page * PAGE_SIZE;

  const params = new URLSearchParams({
    includeIngredients: ingredients,
    cuisine: cuisine,
    number: PAGE_SIZE,
    offset: offset,
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

// ================= PAGE LOADER =================
async function loadPage() {
  recipesContainer.innerHTML = "<p>Loading recipes...</p>";

  const recipes = await fetchRecipes(
    lastSearch.ingredients,
    lastSearch.cuisine,
    currentPage
  );

  displayRecipes(recipes);

  pageIndicator.textContent = `Page ${currentPage + 1}`;

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = recipes.length < PAGE_SIZE;
}

// ================= UI RENDER =================
function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";

  if (!recipes.length) {
    recipesContainer.textContent = "No recipes found.";
    return;
  }

  recipes.forEach(recipe => {
    const summaryText = recipe.summary
      ? stripHtml(recipe.summary)
      : "No description available.";

    const card = document.createElement("div");
    card.className = "col-md-6 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm p-3">
        <img src="${recipe.image}" class="card-img-top mb-2" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p>${summaryText}</p>
        </div>
      </div>
    `;

    recipesContainer.appendChild(card);
  });
}