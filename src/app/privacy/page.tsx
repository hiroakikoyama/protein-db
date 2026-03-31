import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | コンビニ高タンパク飯DB',
  description: 'コンビニ高タンパク飯DBのプライバシーポリシーについて',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. 個人情報の取り扱いについて</h2>
            <p className="text-gray-700 leading-relaxed">
              コンビニ高タンパク飯DB（以下「当サイト」）は、ユーザーの個人情報の重要性を認識し、
              その保護の徹底をはかり、個人情報保護法に基づき、以下のプライバシーポリシーを定めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 収集する情報</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、以下の情報を取得する場合があります：
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>お問い合わせ時にご入力いただく氏名、メールアドレス等</li>
              <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時等）</li>
              <li>Cookie情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed">
              取得した情報は、以下の目的で利用いたします：
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>お問い合わせへの対応</li>
              <li>サイトの改善・運営</li>
              <li>アクセス解析によるサービス向上</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 第三者への提供</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 広告について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、第三者配信の広告サービスを利用しています。
              広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. アフィリエイトプログラムについて</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、アクセストレード等のアフィリエイトプログラムに参加しています。
              当サイト経由で商品を購入された場合、当サイトが紹介料を受け取ることがあります。
              これにより、ユーザーの購入価格が変わることはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. アクセス解析ツールについて</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用しています。
              これらのツールはCookieを使用してデータを収集しますが、このデータは匿名で収集されており、
              個人を特定するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. 免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトに掲載されている商品情報は、各コンビニエンスストアの公式情報を参考に作成していますが、
              価格・栄養成分・販売状況は変更される場合があります。
              最新の情報は各店舗でご確認ください。
              当サイトの情報を利用したことによる損害について、当サイトは一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本ポリシーを変更することがあります。
              変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
            </p>
          </section>

          <p className="text-gray-500 text-sm mt-8">
            制定日：2026年3月31日
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
