import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'お問い合わせ | コンビニ高タンパク飯DB',
  description: 'コンビニ高タンパク飯DBへのお問い合わせ',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="text-section text-[var(--text-primary)]">
              お問い合わせ
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-[14px] text-[var(--text-tertiary)] mb-8">
            当サイトに関するお問い合わせは、以下の方法でご連絡ください。
          </p>

          <div className="space-y-4 mb-10">
            <div className="card p-5">
              <h2 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-3">
                メールでのお問い合わせ
              </h2>
              <a
                href="mailto:hiroaki38@gmail.com"
                className="text-[14px] text-[var(--accent-highlight)] hover:underline"
              >
                hiroaki38@gmail.com
              </a>
              <p className="text-[13px] text-[var(--text-muted)] mt-2">
                お返事には数日かかる場合がございます
              </p>
            </div>

            <div className="card p-5">
              <h2 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-3">
                Xでのお問い合わせ
              </h2>
              <a
                href="https://twitter.com/protein_conveni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[var(--accent-highlight)] hover:underline"
              >
                @protein_conveni
              </a>
              <p className="text-[13px] text-[var(--text-muted)] mt-2">
                DMにてお問い合わせを受け付けております
              </p>
            </div>
          </div>

          <div className="card p-6 bg-[var(--bg-tertiary)]">
            <h3 className="text-[14px] font-semibold text-[var(--text-secondary)] mb-4">
              お問い合わせの際のお願い
            </h3>
            <ul className="space-y-2 text-[13px] text-[var(--text-tertiary)]">
              <li>- 商品情報の誤りに関するご指摘</li>
              <li>- 掲載商品の追加リクエスト</li>
              <li>- サイトの不具合報告</li>
              <li>- その他ご意見・ご要望</li>
            </ul>
            <p className="text-[13px] text-[var(--text-muted)] mt-4">
              上記の内容を明記の上、お問い合わせいただけますと対応がスムーズです。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
