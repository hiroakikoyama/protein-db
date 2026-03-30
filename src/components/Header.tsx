import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <div>
              <h1 className="text-xl font-bold">コンビニ高タンパク飯DB</h1>
              <p className="text-xs text-orange-100">筋トレ・ダイエットの味方</p>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-orange-200 transition-colors">
              ホーム
            </Link>
            <Link href="/ranking" className="hover:text-orange-200 transition-colors">
              ランキング
            </Link>
            <Link href="/about" className="hover:text-orange-200 transition-colors">
              このサイトについて
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
