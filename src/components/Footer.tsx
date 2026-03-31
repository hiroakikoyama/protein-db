import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-light)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[var(--text-primary)] rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-[14px] font-semibold text-[var(--text-primary)]">
                コンビニ高タンパク飯DB
              </span>
            </Link>
            <p className="text-[13px] text-[var(--text-tertiary)] leading-relaxed">
              セブン-イレブン、ローソン、ファミマで買える高タンパク商品を比較検索
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
              コンテンツ
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/ranking"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  ランキング
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  このサイトについて
                </Link>
              </li>
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
              コンビニ別
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/store/seven"
                  className="flex items-center gap-2 text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span className="store-dot store-dot-seven"></span>
                  セブン-イレブン
                </Link>
              </li>
              <li>
                <Link
                  href="/store/lawson"
                  className="flex items-center gap-2 text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span className="store-dot store-dot-lawson"></span>
                  ローソン
                </Link>
              </li>
              <li>
                <Link
                  href="/store/familymart"
                  className="flex items-center gap-2 text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span className="store-dot store-dot-familymart"></span>
                  ファミリーマート
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
              サイト情報
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  運営者情報
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[14px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border-light)] mt-10 pt-8">
          <p className="text-[12px] text-[var(--text-muted)] text-center">
            &copy; {new Date().getFullYear()} コンビニ高タンパク飯DB
          </p>
        </div>
      </div>
    </footer>
  )
}
