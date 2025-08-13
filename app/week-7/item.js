export default function Item({ item = {} }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">{item.name || "Unnamed Item"}</h3>
      <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
      <p className="text-sm text-gray-500">Category: {item.category || "Unknown"}</p>
    </div>
  );
}