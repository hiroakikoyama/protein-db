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
        <section className="bg-gradient-to-b from-purple-600 to-purple-500 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-3">高タンパク商品ランキング</h1>
            <p className="text-purple-100">
              目的別にコンビニ商品を比較。あなたに最適な商品を見つけよう
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <RankingTabs />
        </section>
      </main>
      <Footer />
    </>
  )
}
