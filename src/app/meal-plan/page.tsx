import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MealPlanner } from '@/components/MealPlanner'

export const metadata: Metadata = {
  title: 'メニュー提案 | コンビニ高タンパク飯DB',
  description: '目標PFC・カロリー・食物繊維を入力すると、コンビニ商品から1日分の最適メニュー（朝昼晩＋間食）を自動提案。',
  openGraph: {
    title: 'メニュー提案 | コンビニ高タンパク飯DB',
    description: '目標PFCから1日のコンビニメニューを自動生成',
  },
}

export default function MealPlanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
            <h1 className="text-section text-[var(--text-primary)] mb-2">
              1日メニュー提案
            </h1>
            <p className="text-[15px] text-[var(--text-tertiary)] leading-relaxed">
              目標の栄養素を入力すると、コンビニ商品から朝・昼・夜・間食の最適な組み合わせを提案します
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-10">
          <MealPlanner />
        </section>
      </main>
      <Footer />
    </>
  )
}
