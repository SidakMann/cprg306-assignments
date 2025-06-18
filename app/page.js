import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">CPRG306 - Assignments</h1>
      <ul className="space-y-2">
        <li><Link href="/week-2" className="text-blue-600 hover:underline">Week 2</Link></li>
        <li><Link href="/week-3" className="text-blue-600 hover:underline">Week 3</Link></li>
        <li><Link href="/week-4" className="text-blue-600 hover:underline">Week 4</Link></li>
        <li>
          <Link href="/week-5" className="text-blue-600 hover:underline">Week 5</Link>
        </li>

      </ul>
    </main>
  );
}
