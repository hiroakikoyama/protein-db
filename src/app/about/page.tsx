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
        <section className="bg-gradient-to-b from-orange-500 to-orange-400 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-3">このサイトについて</h1>
            <p className="text-orange-100">
              コンビニで手軽にタンパク質を摂りたい人のためのデータベース
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          {/* サイトの特徴 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">サイトの特徴</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="font-bold text-lg mb-2">タンパク質に特化</h3>
                <p className="text-gray-600 text-sm">
                  筋トレやダイエットに欠かせないタンパク質量を基準に商品を検索・比較できます。
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold text-lg mb-2">コスパ計算</h3>
                <p className="text-gray-600 text-sm">
                  100円あたりのタンパク質量を自動計算。効率よくタンパク質を摂取できる商品がわかります。
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-4xl mb-4">🏪</div>
                <h3 className="font-bold text-lg mb-2">3大コンビニ対応</h3>
                <p className="text-gray-600 text-sm">
                  セブン-イレブン、ローソン、ファミリーマートの商品を網羅。近くのコンビニで買える商品が見つかります。
                </p>
              </div>
            </div>
          </div>

          {/* 使い方 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">使い方</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">商品を検索</h3>
                  <p className="text-gray-600">
                    トップページで店舗やカテゴリを選択して、目的の商品を絞り込みます。
                    タンパク質量順、カロリー順、価格順で並び替えも可能です。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ランキングをチェック</h3>
                  <p className="text-gray-600">
                    <Link href="/ranking" className="text-orange-500 hover:underline">ランキングページ</Link>
                    では、タンパク質量・コスパ・低カロリー・低脂質の4つの切り口で商品を比較できます。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">コンビニで購入</h3>
                  <p className="text-gray-600">
                    気になる商品が見つかったら、お近くのコンビニでお買い求めください。
                    商品の在庫状況は店舗によって異なります。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* こんな人におすすめ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">こんな人におすすめ</h2>
            <div className="bg-orange-50 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span className="text-gray-700">筋トレをしていて、手軽にタンパク質を摂りたい</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span className="text-gray-700">ダイエット中で、低カロリー高タンパクな食事を探している</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span className="text-gray-700">忙しくて自炊できないけど、栄養バランスを気にしている</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span className="text-gray-700">コスパ良くタンパク質を摂取したい</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span className="text-gray-700">コンビニ商品の栄養成分を比較したい</span>
                </li>
              </ul>
            </div>
          </div>

          {/* よくある質問 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">よくある質問</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  Q. 商品情報はどこから取得していますか？
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  各コンビニの公式サイトおよび商品パッケージの栄養成分表示を参考にしています。
                  情報は定期的に更新していますが、最新の情報は店頭でご確認ください。
                </div>
              </details>
              <details className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  Q. 掲載されていない商品をリクエストできますか？
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  はい、<Link href="/contact" className="text-orange-500 hover:underline">お問い合わせページ</Link>からリクエストを受け付けています。
                  高タンパク商品であれば、順次追加を検討いたします。
                </div>
              </details>
              <details className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  Q. 1日にどれくらいタンパク質を摂ればいいですか？
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  一般的な目安として、体重1kgあたり1.2〜2.0gのタンパク質摂取が推奨されています。
                  例えば体重60kgの方なら、1日72〜120g程度です。
                  筋トレをしている方は多めに、運動しない方は少なめを目安にしてください。
                </div>
              </details>
              <details className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  Q. サラダチキン以外のおすすめはありますか？
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  ゆで卵、プロテインバー、ギリシャヨーグルト、豆腐バー、焼き魚などがおすすめです。
                  カテゴリ別に検索できるので、ぜひ色々な商品を試してみてください。
                </div>
              </details>
              <details className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  Q. 地域によって商品は違いますか？
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  はい、コンビニ商品は地域や店舗によって品揃えが異なります。
                  当サイトでは全国で販売されている定番商品を中心に掲載していますが、
                  一部の商品はお近くの店舗で取り扱いがない場合があります。
                </div>
              </details>
            </div>
          </div>

          {/* タンパク質の基礎知識 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">タンパク質の基礎知識</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg mb-3">なぜタンパク質が重要？</h3>
              <p className="text-gray-600 mb-4">
                タンパク質は筋肉、臓器、皮膚、髪、爪など体のあらゆる組織を作る材料です。
                不足すると筋肉量の低下、免疫力の低下、肌や髪のトラブルなどを引き起こす可能性があります。
              </p>

              <h3 className="font-bold text-lg mb-3">タンパク質が多い食品</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">食品</th>
                      <th className="text-right py-2">タンパク質（100gあたり）</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-2 pr-4">鶏むね肉（皮なし）</td>
                      <td className="text-right">23g</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">サラダチキン</td>
                      <td className="text-right">21〜25g</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">ゆで卵</td>
                      <td className="text-right">13g</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">ギリシャヨーグルト</td>
                      <td className="text-right">10g</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">木綿豆腐</td>
                      <td className="text-right">7g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              商品を検索する
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
