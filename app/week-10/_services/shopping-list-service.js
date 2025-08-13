import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

// Get all items for a user
export async function getItems(userId) {
  if (!userId) return [];
  const itemsCol = collection(db, "users", userId, "items");
  // Optional: order by name (or category)
  const q = query(itemsCol, orderBy("name"));
  const snap = await getDocs(q);

  const items = [];
  snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
  return items;
}

// Add an item for a user; returns the new id
export async function addItem(userId, item) {
  if (!userId) throw new Error("Missing userId");
  const itemsCol = collection(db, "users", userId, "items");
  const newRef = await addDoc(itemsCol, {
    name: item.name,
    quantity: item.quantity,
    category: item.category,
  });
  return newRef.id;
}

// Optional challenge: delete an item
export async function deleteItem(userId, itemId) {
  if (!userId || !itemId) return;
  const ref = doc(db, "users", userId, "items", itemId);
  await deleteDoc(ref);
}
