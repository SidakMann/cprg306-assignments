"use client";
import { useState } from "react";
import NewItem from "./new-item";
import itemsData from "./items.json";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Add new item to list
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Handle item selection and clean up the name
  const handleItemSelect = (item) => {
    if (!item?.name) return;

    // Remove emojis
    let cleanedName = item.name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF])/g,
      ""
    );

    // Remove size info after comma (if any), trim spaces
    cleanedName = cleanedName.split(",")[0].trim();

    setSelectedItemName(cleanedName);
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Left side: New Item + Item List */}
      <div className="flex-1 space-y-6">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>

      {/* Right side: Meal Ideas */}
      <div className="flex-1">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </div>
  );
}
