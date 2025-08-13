import React, { useState } from "react";
import Item from "./item";
import itemsData from "app/week-6/item.json";

export default function ItemList() {
  // Step 1: Initialize state
  const [sortBy, setSortBy] = useState("name");

  // Step 2: Sort the items
  const sortedItems = [...itemsData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      {/* Step 3: Create sort buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setSortBy("name")}
          style={{
            backgroundColor: sortBy === "name" ? "#ddd" : "white",
            marginRight: "0.5rem",
            padding: "0.5rem 1rem",
          }}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          style={{
            backgroundColor: sortBy === "category" ? "#ddd" : "white",
            padding: "0.5rem 1rem",
          }}
        >
          Sort by Category
        </button>
      </div>

      {/* Step 4: Render items */}
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}
