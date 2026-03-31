import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreProductList } from '@/components/StoreProductList'
import { notFound } from 'next/navigation'

const storeInfo = {
  seven: {
    name: 'セブン-イレブン',
    description: 'サラダチキンや「たんぱく質が摂れる」シリーズが充実',
    dotClass: 'store-dot-seven',
  },
  lawson: {
    name: 'ローソン',
    description: 'ブランパンやからあげクンなど、糖質制限にも対応した商品が豊富',
    dotClass: 'store-dot-lawson',
  },
  familymart: {
    name: 'ファミリーマート',
    description: 'グリルチキンやRIZAP監修商品など独自の高タンパク商品を展開',
    dotClass: 'store-dot-familymart',
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
        {/* Hero */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-3">
              <span className={`store-dot ${store.dotClass}`} style={{ width: '10px', height: '10px' }}></span>
              <h1 className="text-section text-[var(--text-primary)]">
                {store.name}
              </h1>
            </div>
            <p className="text-[15px] text-[var(--text-tertiary)]">
              {store.description}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          <StoreProductList storeName={slug as StoreSlug} />
        </section>
      </main>
      <Footer />
    </>
  )
}
