'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text">🧰 AI工具箱</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/rewrite" className="hover:text-blue-600 transition">文本改写</Link>
          <Link href="/summary" className="hover:text-blue-600 transition">摘要生成</Link>
          <span className="text-gray-300">翻译（即将上线）</span>
          <span className="text-gray-300">MD排版（即将上线）</span>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="菜单">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/rewrite" onClick={() => setOpen(false)} className="hover:text-blue-600">文本改写</Link>
          <Link href="/summary" onClick={() => setOpen(false)} className="hover:text-blue-600">摘要生成</Link>
          <span className="text-gray-300">翻译（即将上线）</span>
          <span className="text-gray-300">MD排版（即将上线）</span>
        </nav>
      )}
    </header>
  )
}
