import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="bg-white border-b border-[var(--border-light)] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[var(--text-primary)] rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4v16M18 4v16M6 12h12" />
              </svg>
            </div>
            <div>
              <span className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
                コンビニ高タンパク飯DB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
            >
              ホーム
            </Link>
            <Link
              href="/ranking"
              className="px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
            >
              ランキング
            </Link>
            <Link
              href="/meal-plan"
              className="px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
            >
              メニュー提案
            </Link>

            {/* Store Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200 flex items-center gap-1">
                コンビニ別
                <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-lg border border-[var(--border-light)] py-2 min-w-[180px]">
                  <Link
                    href="/store/seven"
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <span className="store-dot store-dot-seven"></span>
                    セブン-イレブン
                  </Link>
                  <Link
                    href="/store/lawson"
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <span className="store-dot store-dot-lawson"></span>
                    ローソン
                  </Link>
                  <Link
                    href="/store/familymart"
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <span className="store-dot store-dot-familymart"></span>
                    ファミリーマート
                  </Link>
                  <Link
                    href="/store/mybasket"
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <span className="store-dot store-dot-mybasket"></span>
                    まいばすけっと
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
            >
              このサイトについて
            </Link>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
