export default function Item({ name, quantity, category }) {
  return (
    <li className="p-4 border rounded-md shadow-sm bg-white hover:bg-gray-50">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">Quantity: {quantity}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>
    </li>
  );
}
