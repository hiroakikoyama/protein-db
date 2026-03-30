import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-3">コンビニ高タンパク飯DB</h3>
            <p className="text-sm">
              セブン・ローソン・ファミマで買える高タンパク商品を比較検索できるデータベースサイトです。
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">リンク</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="hover:text-white transition-colors">
                  ランキング
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  このサイトについて
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">SNS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com/protein_conveni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} コンビニ高タンパク飯DB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
