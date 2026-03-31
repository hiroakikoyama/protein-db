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
      <main className="flex-1">
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="text-section text-[var(--text-primary)]">
              プライバシーポリシー
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">1. 個人情報の取り扱いについて</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                コンビニ高タンパク飯DB（以下「当サイト」）は、ユーザーの個人情報の重要性を認識し、
                その保護の徹底をはかり、個人情報保護法に基づき、以下のプライバシーポリシーを定めます。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">2. 収集する情報</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">当サイトでは、以下の情報を取得する場合があります：</p>
              <ul className="mt-2 pl-5 space-y-1">
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">お問い合わせ時にご入力いただく氏名、メールアドレス等</li>
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">アクセスログ（IPアドレス、ブラウザ情報、アクセス日時等）</li>
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">Cookie情報</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">3. 情報の利用目的</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">取得した情報は、以下の目的で利用いたします：</p>
              <ul className="mt-2 pl-5 space-y-1">
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">お問い合わせへの対応</li>
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">サイトの改善・運営</li>
                <li className="text-[14px] text-[var(--text-tertiary)] list-disc">アクセス解析によるサービス向上</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">4. 第三者への提供</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">5. 広告について</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトでは、第三者配信の広告サービスを利用しています。
                広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">6. アフィリエイトプログラムについて</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトは、アクセストレード等のアフィリエイトプログラムに参加しています。
                当サイト経由で商品を購入された場合、当サイトが紹介料を受け取ることがあります。
                これにより、ユーザーの購入価格が変わることはありません。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">7. アクセス解析ツールについて</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用しています。
                これらのツールはCookieを使用してデータを収集しますが、このデータは匿名で収集されており、
                個人を特定するものではありません。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">8. 免責事項</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトに掲載されている商品情報は、各コンビニエンスストアの公式情報を参考に作成していますが、
                価格・栄養成分・販売状況は変更される場合があります。
                最新の情報は各店舗でご確認ください。
                当サイトの情報を利用したことによる損害について、当サイトは一切の責任を負いません。
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">9. プライバシーポリシーの変更</h2>
              <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
                当サイトは、必要に応じて本ポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
              </p>
            </div>

            <p className="text-[var(--text-muted)] text-[13px] pt-6">
              制定日：2026年3月31日
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
