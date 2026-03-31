import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RankingTabs } from '@/components/RankingTabs'

export const metadata: Metadata = {
  title: 'ランキング | コンビニ高タンパク飯DB',
  description: 'コンビニで買える高タンパク商品のランキング。タンパク質量、コスパ、低カロリー別に比較できます。',
}

export default function RankingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="text-section text-[var(--text-primary)] mb-3">
              高タンパク商品ランキング
            </h1>
            <p className="text-[15px] text-[var(--text-tertiary)]">
              目的別にコンビニ商品を比較
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          <RankingTabs />
        </section>
      </main>
      <Footer />
    </>
  )
}
