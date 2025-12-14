import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // loads your .env

const app = express();
const PORT = 3000;
const API_KEY = process.env.SPOONACULAR_API_KEY;

app.get("/api/recipes", async (req, res) => {
  const { ingredients, cuisine } = req.query;

  // Build Spoonacular API URL
  const url = `https://api.spoonacular.com/recipes/findByIngredients?` +
              `ingredients=${ingredients}&number=6&ranking=1&ignorePantry=true` +
              (cuisine ? `&cuisine=${cuisine}` : "") +
              `&apiKey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  res.json(data); // Send results back to frontend
});

// Optional: serve frontend files
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
