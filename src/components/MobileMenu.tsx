'use client'

import { useState } from 'react'
import Link from 'next/link'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* ハンバーガーボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="メニューを開く"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* メニュー */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-orange-600 shadow-lg z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/ranking"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  ランキング
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  このサイトについて
                </Link>
              </li>
              <li className="border-t border-white/20 pt-2 mt-2">
                <span className="block py-2 px-4 text-orange-200 text-sm">コンビニ別</span>
              </li>
              <li>
                <Link
                  href="/store/seven"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  セブン-イレブン
                </Link>
              </li>
              <li>
                <Link
                  href="/store/lawson"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  ローソン
                </Link>
              </li>
              <li>
                <Link
                  href="/store/familymart"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  ファミリーマート
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
