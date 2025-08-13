"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";

// REUSE Week-8 components & data:
import MealIdeas from "../../week-8/meal-ideas";           // if your file is app/week-8/meal-ideas.js
import ItemList from "../../week-8/item-list";             // app/week-8/item-list.js
import itemsData from "../../week-8/items.json";           // app/week-8/items.json
import { useState } from "react";
// If you have NewItem etc., import them too:
// import NewItem from "../../week-8/new-item";

export default function ShoppingListPage() {
  const { user, loadingInitial, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingInitial && !user) router.replace("/week-9");
  }, [user, loadingInitial, router]);

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (loadingInitial) return <p style={{ padding: 16 }}>Loading…</p>;
  if (!user) return null;

  // Clean the item name for TheMealDB (mirrors your Week-8 logic)
  const cleanName = (raw) =>
    raw
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u24C2|\uFE0F)/g,
        ""
      )
      .trim();

  const handleItemSelect = (item) => setSelectedItemName(cleanName(item.name));

  const logout = async () => {
    try { await firebaseSignOut(); router.replace("/week-9"); }
    catch { alert("Logout failed"); }
  };

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1>Shopping List</h1>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <small>Signed in as {user.displayName || user.email}</small>
          <button onClick={logout} style={{padding:"6px 10px", borderRadius:8, border:"1px solid #ddd"}}>Logout</button>
        </div>
      </header>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <section style={{ flex: 1, minWidth: 340 }}>
          
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </section>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
