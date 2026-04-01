'use client'

import type { Product } from '@/types/database'

const storeClasses = {
  seven: 'card-seven',
  lawson: 'card-lawson',
  familymart: 'card-familymart',
  mybasket: 'card-mybasket',
}

const storeNames = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
  mybasket: 'まいばす',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const proteinPer100yen = product.protein && product.price
    ? (product.protein / product.price * 100).toFixed(1)
    : null

  return (
    <article className={`card ${storeClasses[product.store_name]}`}>
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Protein - hero */}
        <div className="shrink-0 w-14 text-center">
          <span className="text-[20px] font-bold leading-none text-[var(--accent-highlight)]">
            {product.protein ?? '-'}
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)] ml-0.5">g</span>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className={`store-dot store-dot-${product.store_name}`}></span>
            <span className="text-[10px] text-[var(--text-muted)] truncate">
              {storeNames[product.store_name]}
              {product.category ? ` / ${product.category}` : ''}
            </span>
          </div>
          <h3 className="text-[13px] font-semibold text-[var(--text-secondary)] leading-snug mb-0.5">
            {product.product_name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[10px] text-[var(--text-muted)]">
            <span>F<span className="font-semibold text-[var(--text-secondary)] ml-0.5">{product.fat ?? '-'}</span>g</span>
            <span>C<span className="font-semibold text-[var(--text-secondary)] ml-0.5">{product.carbs ?? '-'}</span>g</span>
            <span><span className="font-semibold text-[var(--text-secondary)]">{product.calories ?? '-'}</span>kcal</span>
            <span>繊維<span className="font-semibold text-[var(--text-secondary)] ml-0.5">{product.fiber ?? '-'}</span>g</span>
          </div>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <div className="text-[13px] font-semibold text-[var(--text-primary)]">
            ¥{product.price?.toLocaleString()}
          </div>
          {proteinPer100yen && (
            <div className="text-[10px] text-[var(--text-muted)]">
              {proteinPer100yen}g/¥100
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
