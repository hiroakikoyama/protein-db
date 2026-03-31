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
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">お問い合わせ</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 mb-6">
            当サイトに関するお問い合わせは、以下の方法でご連絡ください。
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="font-semibold text-lg mb-2">メールでのお問い合わせ</h2>
              <p className="text-gray-700">
                <a
                  href="mailto:hiroaki38@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  hiroaki38@gmail.com
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                ※お返事には数日かかる場合がございます
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="font-semibold text-lg mb-2">Twitterでのお問い合わせ</h2>
              <p className="text-gray-700">
                <a
                  href="https://twitter.com/protein_conveni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @protein_conveni
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                DMにてお問い合わせを受け付けております
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">お問い合わせの際のお願い</h3>
            <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
              <li>商品情報の誤りに関するご指摘</li>
              <li>掲載商品の追加リクエスト</li>
              <li>サイトの不具合報告</li>
              <li>その他ご意見・ご要望</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">
              上記の内容を明記の上、お問い合わせいただけますと対応がスムーズです。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
