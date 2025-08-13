"use client";
import { useState } from "react";
import NewItem from "./new-item";
import itemsData from "./items.json";
import ItemList from "./item-list";


export default function Page() {
    const [items, setItems] = useState(itemsData);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };
  return (
    
      <div>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </div>
    
    
  );
}