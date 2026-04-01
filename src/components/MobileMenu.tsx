'use client'

import { useState } from 'react'
import Link from 'next/link'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
        aria-label="メニューを開く"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-[var(--border-light)] shadow-lg z-50">
            <nav className="max-w-6xl mx-auto px-4 py-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="block py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ranking"
                    className="block py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    ランキング
                  </Link>
                </li>
                <li>
                  <Link
                    href="/meal-plan"
                    className="block py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    メニュー提案
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    このサイトについて
                  </Link>
                </li>

                {/* Divider */}
                <li className="pt-3 mt-3 border-t border-[var(--border-light)]">
                  <span className="block py-2 px-4 text-[12px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    コンビニ別
                  </span>
                </li>

                <li>
                  <Link
                    href="/store/seven"
                    className="flex items-center gap-3 py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="store-dot store-dot-seven"></span>
                    セブン-イレブン
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/lawson"
                    className="flex items-center gap-3 py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="store-dot store-dot-lawson"></span>
                    ローソン
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/familymart"
                    className="flex items-center gap-3 py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="store-dot store-dot-familymart"></span>
                    ファミリーマート
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/mybasket"
                    className="flex items-center gap-3 py-3 px-4 text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="store-dot store-dot-mybasket"></span>
                    まいばすけっと
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
