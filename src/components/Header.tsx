import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <div>
              <h1 className="text-xl font-bold">コンビニ高タンパク飯DB</h1>
              <p className="text-xs text-orange-100">筋トレ・ダイエットの味方</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-orange-200 transition-colors">
              ホーム
            </Link>
            <Link href="/ranking" className="hover:text-orange-200 transition-colors">
              ランキング
            </Link>
            <div className="relative group">
              <span className="cursor-pointer hover:text-orange-200 transition-colors">
                コンビニ別
              </span>
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[160px]">
                <Link href="/store/seven" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  セブン-イレブン
                </Link>
                <Link href="/store/lawson" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  ローソン
                </Link>
                <Link href="/store/familymart" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ファミリーマート
                </Link>
              </div>
            </div>
            <Link href="/about" className="hover:text-orange-200 transition-colors">
              このサイトについて
            </Link>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
