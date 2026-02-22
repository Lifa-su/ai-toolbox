import Link from 'next/link'

export default function ToolCard({ href, icon, title, desc }) {
  return (
    <Link href={href} className="block group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  )
}
