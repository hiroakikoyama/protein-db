import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '運営者情報 | コンビニ高タンパク飯DB',
  description: 'コンビニ高タンパク飯DBの運営者情報・特定商取引法に基づく表記',
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="text-section text-[var(--text-primary)]">
              運営者情報
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="card overflow-hidden mb-10">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] w-1/3">
                    サイト名
                  </th>
                  <td className="py-4 px-5 text-[14px] text-[var(--text-secondary)]">
                    コンビニ高タンパク飯DB
                  </td>
                </tr>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]">
                    運営者
                  </th>
                  <td className="py-4 px-5 text-[14px] text-[var(--text-secondary)]">
                    一合同会社
                  </td>
                </tr>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]">
                    代表者
                  </th>
                  <td className="py-4 px-5 text-[14px] text-[var(--text-secondary)]">
                    小山 大明
                  </td>
                </tr>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]">
                    所在地
                  </th>
                  <td className="py-4 px-5 text-[14px] text-[var(--text-secondary)]">
                    東京都（詳細はお問い合わせください）
                  </td>
                </tr>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]">
                    お問い合わせ
                  </th>
                  <td className="py-4 px-5 text-[14px]">
                    <Link href="/contact" className="text-[var(--accent-highlight)] hover:underline">
                      お問い合わせフォーム
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 px-5 text-left text-[14px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]">
                    サイトURL
                  </th>
                  <td className="py-4 px-5 text-[14px]">
                    <a href="https://protein-conveni.com" className="text-[var(--accent-highlight)] hover:underline">
                      https://protein-conveni.com
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-subsection text-[var(--text-primary)] mb-4">サイトの目的</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトは、健康・フィットネスに関心のある方に向けて、
                コンビニエンスストアで購入できる高タンパク商品の情報を提供することを目的としています。
                筋力トレーニングやダイエットに取り組む方々が、手軽に栄養価の高い食品を見つけられるよう、
                商品の比較・検索機能を提供しています。
              </p>
            </div>

            <div>
              <h2 className="text-subsection text-[var(--text-primary)] mb-4">掲載情報について</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトに掲載している商品情報は、各コンビニエンスストアの公式サイトおよび
                店頭で販売されている商品パッケージを参考に作成しています。
                商品の価格、栄養成分、販売状況は予告なく変更される場合がありますので、
                最新の情報は各店舗にてご確認ください。
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
