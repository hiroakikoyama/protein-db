import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'このサイトについて | コンビニ高タンパク飯DB',
  description: 'コンビニ高タンパク飯DBの使い方、特徴、よくある質問について',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="text-section text-[var(--text-primary)] mb-3">
              このサイトについて
            </h1>
            <p className="text-[15px] text-[var(--text-tertiary)]">
              コンビニで手軽にタンパク質を摂りたい人のためのデータベース
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          {/* Features */}
          <div className="mb-14">
            <h2 className="text-subsection text-[var(--text-primary)] mb-6">特徴</h2>
            <div className="grid gap-4">
              <div className="card p-5">
                <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-2">
                  タンパク質に特化
                </h3>
                <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                  筋トレやダイエットに欠かせないタンパク質量を基準に商品を検索・比較できます。
                </p>
              </div>
              <div className="card p-5">
                <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-2">
                  コスパ計算
                </h3>
                <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                  100円あたりのタンパク質量を自動計算。効率よくタンパク質を摂取できる商品がわかります。
                </p>
              </div>
              <div className="card p-5">
                <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-2">
                  3大コンビニ対応
                </h3>
                <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                  セブン-イレブン、ローソン、ファミリーマートの商品を網羅。近くのコンビニで買える商品が見つかります。
                </p>
              </div>
            </div>
          </div>

          {/* How to use */}
          <div className="mb-14">
            <h2 className="text-subsection text-[var(--text-primary)] mb-6">使い方</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--text-primary)] text-white rounded-full flex items-center justify-center text-[14px] font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-1">商品を検索</h3>
                  <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                    トップページで店舗やカテゴリを選択して、目的の商品を絞り込みます。
                    タンパク質量順、カロリー順、価格順で並び替えも可能です。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--text-primary)] text-white rounded-full flex items-center justify-center text-[14px] font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-1">ランキングをチェック</h3>
                  <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                    <Link href="/ranking" className="text-[var(--accent-highlight)] hover:underline">ランキングページ</Link>
                    では、タンパク質量・コスパ・低カロリー・低脂質の4つの切り口で商品を比較できます。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--text-primary)] text-white rounded-full flex items-center justify-center text-[14px] font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-1">コンビニで購入</h3>
                  <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                    気になる商品が見つかったら、お近くのコンビニでお買い求めください。
                    商品の在庫状況は店舗によって異なります。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Target users */}
          <div className="mb-14">
            <h2 className="text-subsection text-[var(--text-primary)] mb-6">こんな人におすすめ</h2>
            <div className="card p-6">
              <ul className="space-y-3">
                {[
                  '筋トレをしていて、手軽にタンパク質を摂りたい',
                  'ダイエット中で、低カロリー高タンパクな食事を探している',
                  '忙しくて自炊できないけど、栄養バランスを気にしている',
                  'コスパ良くタンパク質を摂取したい',
                  'コンビニ商品の栄養成分を比較したい',
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 text-[var(--accent-highlight)] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-[14px] text-[var(--text-secondary)]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-14">
            <h2 className="text-subsection text-[var(--text-primary)] mb-6">よくある質問</h2>
            <div className="space-y-3">
              {[
                {
                  q: '商品情報はどこから取得していますか？',
                  a: '各コンビニの公式サイトおよび商品パッケージの栄養成分表示を参考にしています。情報は定期的に更新していますが、最新の情報は店頭でご確認ください。',
                },
                {
                  q: '掲載されていない商品をリクエストできますか？',
                  a: 'はい、お問い合わせページからリクエストを受け付けています。高タンパク商品であれば、順次追加を検討いたします。',
                },
                {
                  q: '1日にどれくらいタンパク質を摂ればいいですか？',
                  a: '一般的な目安として、体重1kgあたり1.2〜2.0gのタンパク質摂取が推奨されています。例えば体重60kgの方なら、1日72〜120g程度です。',
                },
                {
                  q: '地域によって商品は違いますか？',
                  a: 'はい、コンビニ商品は地域や店舗によって品揃えが異なります。当サイトでは全国で販売されている定番商品を中心に掲載しています。',
                },
              ].map((item, i) => (
                <details key={i} className="card group">
                  <summary className="p-5 cursor-pointer text-[15px] font-medium text-[var(--text-secondary)] flex items-center justify-between">
                    {item.q}
                    <svg className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/" className="btn-primary">
              商品を検索する
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
