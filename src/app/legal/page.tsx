import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: '運営者情報 | コンビニ高タンパク飯DB',
  description: 'コンビニ高タンパク飯DBの運営者情報・特定商取引法に基づく表記',
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">運営者情報</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium w-1/3">サイト名</th>
                <td className="py-4 text-gray-900">コンビニ高タンパク飯DB</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium">運営者</th>
                <td className="py-4 text-gray-900">一合同会社</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium">代表者</th>
                <td className="py-4 text-gray-900">小山 大明</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium">所在地</th>
                <td className="py-4 text-gray-900">東京都（詳細はお問い合わせください）</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium">お問い合わせ</th>
                <td className="py-4 text-gray-900">
                  <a href="/contact" className="text-blue-600 hover:underline">
                    お問い合わせフォーム
                  </a>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-gray-600 font-medium">サイトURL</th>
                <td className="py-4 text-gray-900">
                  <a href="https://protein-conveni.com" className="text-blue-600 hover:underline">
                    https://protein-conveni.com
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">サイトの目的</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、健康・フィットネスに関心のある方に向けて、
            コンビニエンスストアで購入できる高タンパク商品の情報を提供することを目的としています。
            筋力トレーニングやダイエットに取り組む方々が、手軽に栄養価の高い食品を見つけられるよう、
            商品の比較・検索機能を提供しています。
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">掲載情報について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトに掲載している商品情報は、各コンビニエンスストアの公式サイトおよび
            店頭で販売されている商品パッケージを参考に作成しています。
            商品の価格、栄養成分、販売状況は予告なく変更される場合がありますので、
            最新の情報は各店舗にてご確認ください。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
