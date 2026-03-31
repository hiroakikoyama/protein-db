import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductList } from '@/components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-2xl">
              <h1 className="text-hero text-[var(--text-primary)] mb-4">
                高タンパク商品を
                <br />
                スマートに検索
              </h1>
              <p className="text-[17px] text-[var(--text-tertiary)] leading-relaxed mb-8">
                セブン-イレブン、ローソン、ファミリーマートの商品を
                <br className="hidden sm:block" />
                タンパク質量・コスパ・カロリーで比較検索
              </p>
              <div className="flex flex-wrap gap-6 text-[14px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">タンパク質量で比較</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">100円あたりコスパ算出</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">3大コンビニ対応</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product List Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <ProductList />
        </section>
      </main>
      <Footer />
    </>
  )
}
