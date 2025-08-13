"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

// Reuse your Week-8 UI (adjust paths if your filenames differ)
import ItemList from "../../week-8/item-list";
import MealIdeas from "../../week-8/meal-ideas";
// If you have a NewItem component to add items:
import NewItem from "../../week-8/new-item"; // comment out if you don’t have it

export default function ShoppingListPage() {
  const router = useRouter();
  const { user, loadingInitial, firebaseSignOut } = useUserAuth();

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Guard route
  useEffect(() => {
    if (!loadingInitial && !user) router.replace("/week-10");
  }, [user, loadingInitial, router]);

  // Load items when user is ready
  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoadingItems(true);
      try {
        const data = await getItems(user.uid);
        setItems(data);
      } catch (e) {
        console.error("Failed to load items:", e);
        alert("Could not load your items.");
      } finally {
        setLoadingItems(false);
      }
    }
    if (user) load();
  }, [user]);

  if (loadingInitial) return <p style={{ padding: 16 }}>Loading…</p>;
  if (!user) return null;

  // Clean selected name for Meal DB
  const cleanName = (raw) =>
    raw
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u24C2|\uFE0F)/g,
        ""
      )
      .trim();

  const handleItemSelect = (item) => setSelectedItemName(cleanName(item.name));

  // Add item → Firestore then local state
  const handleAddItem = async (newItem) => {
    try {
      const id = await addItem(user.uid, newItem);
      setItems((prev) => [...prev, { id, ...newItem }]);
    } catch (e) {
      console.error("Add item failed:", e);
      alert("Could not add item.");
    }
  };

  // Optional: delete item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(user.uid, id);
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (selectedItemName) setSelectedItemName(""); // reset meal ideas if needed
    } catch (e) {
      console.error("Delete item failed:", e);
      alert("Could not delete item.");
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut();
      router.replace("/week-10");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1>Shopping List (Week 10)</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <small>Signed in as {user.displayName || user.email}</small>
          <button onClick={logout} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd" }}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <section style={{ flex: 1, minWidth: 340 }}>
          {/* If you don’t have NewItem, remove this and add from a modal/form you already use */}
          <NewItem onAdd={handleAddItem} />

          {loadingItems ? (
            <p>Loading your items…</p>
          ) : (
            <ItemList
              items={items}
              onItemSelect={handleItemSelect}
              // If your ItemList supports delete, pass a handler; otherwise implement delete inside Item component.
              onDeleteItem={handleDeleteItem}
            />
          )}
        </section>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
