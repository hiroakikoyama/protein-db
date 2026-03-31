import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductList } from '@/components/ProductList'
import { AdBanner } from '@/components/AdBanner'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-orange-500 to-orange-400 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              コンビニで買える<br className="md:hidden" />高タンパク商品を検索
            </h2>
            <p className="text-lg text-orange-100 mb-6">
              セブン・ローソン・ファミマの商品を栄養成分で比較
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <span className="font-bold text-xl">💪</span>
                <span className="ml-2">タンパク質量で比較</span>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <span className="font-bold text-xl">💰</span>
                <span className="ml-2">100円あたりコスパ</span>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <span className="font-bold text-xl">🏪</span>
                <span className="ml-2">3大コンビニ対応</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <AdBanner slot="header" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            高タンパク商品一覧
          </h2>
          <ProductList />

          <div className="mt-8">
            <AdBanner slot="footer" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
