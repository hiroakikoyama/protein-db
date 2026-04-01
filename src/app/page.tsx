import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductList } from '@/components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section - Compact */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-5 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-[20px] sm:text-[26px] font-bold text-[var(--text-primary)] leading-tight">
                  コンビニ高タンパク飯DB
                </h1>
                <p className="text-[13px] text-[var(--text-tertiary)] mt-1">
                  セブン・ローソン・ファミマ・まいばすの商品をタンパク質量・コスパ・カロリーで比較
                </p>
              </div>
              <div className="flex gap-4 text-[12px] text-[var(--text-muted)] shrink-0">
                <span>P量で比較</span>
                <span>コスパ算出</span>
                <span>4チェーン対応</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product List Section */}
        <section className="max-w-6xl mx-auto px-6 py-6">
          <ProductList />
        </section>
      </main>
      <Footer />
    </>
  )
}
