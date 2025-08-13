"use client";

import { useState, useEffect } from "react";

// Step 3: API fetching function
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  // Step 2: State variable
  const [meals, setMeals] = useState([]);

  // Step 4: Load function
  async function loadMealIdeas() {
    if (!ingredient) return;
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
  }

  // Step 5: useEffect hook
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  // Step 6: Render
  return (
    <div>
      <h2>Meal Ideas for "{ingredient}"</h2>
      {meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={100}
                style={{ borderRadius: "8px", marginRight: "10px" }}
              />
              {meal.strMeal}
            </li>
          ))}
        </ul>
      ) : (
        <p>No meal ideas found.</p>
      )}
    </div>
  );
}
