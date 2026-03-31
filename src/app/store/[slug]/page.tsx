import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreProductList } from '@/components/StoreProductList'
import { notFound } from 'next/navigation'

const storeInfo = {
  seven: {
    name: 'セブン-イレブン',
    shortName: 'セブン',
    color: 'red',
    bgGradient: 'from-red-600 to-red-500',
    description: 'セブン-イレブンで買える高タンパク商品。サラダチキンやたんぱく質が摂れるシリーズが充実。',
    features: [
      'たんぱく質が摂れるシリーズが豊富',
      'サラダチキンの種類が多い',
      'おにぎり・サンドイッチも高タンパク商品あり',
    ],
  },
  lawson: {
    name: 'ローソン',
    shortName: 'ローソン',
    color: 'blue',
    bgGradient: 'from-blue-600 to-blue-500',
    description: 'ローソンで買える高タンパク商品。ブランパンやロカボ商品など、糖質制限にも対応した商品が豊富。',
    features: [
      'ブランパンシリーズで糖質制限と高タンパクを両立',
      'からあげクンなどホットスナックも充実',
      'プライベートブランド商品が豊富',
    ],
  },
  familymart: {
    name: 'ファミリーマート',
    shortName: 'ファミマ',
    color: 'green',
    bgGradient: 'from-green-600 to-green-500',
    description: 'ファミリーマートで買える高タンパク商品。RIZAP監修商品やお母さん食堂シリーズなど独自商品が魅力。',
    features: [
      'RIZAP監修の低糖質・高タンパク商品',
      'グリルチキンシリーズが人気',
      'お母さん食堂の惣菜も高タンパク',
    ],
  },
}

type StoreSlug = keyof typeof storeInfo

export async function generateStaticParams() {
  return Object.keys(storeInfo).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const store = storeInfo[slug as StoreSlug]
  if (!store) return {}

  return {
    title: `${store.name}の高タンパク商品 | コンビニ高タンパク飯DB`,
    description: store.description,
  }
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = storeInfo[slug as StoreSlug]

  if (!store) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className={`bg-gradient-to-b ${store.bgGradient} text-white py-10`}>
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-3">{store.name}の高タンパク商品</h1>
            <p className="text-white/80 mb-6">{store.description}</p>
            <div className="flex flex-wrap gap-3">
              {store.features.map((feature, i) => (
                <span key={i} className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <StoreProductList storeName={slug as StoreSlug} />
        </section>
      </main>
      <Footer />
    </>
  )
}
