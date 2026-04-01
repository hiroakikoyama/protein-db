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
      <div className="px-2.5 py-2">
        {/* Store + Category */}
        <div className="flex items-center gap-1 mb-0.5">
          <span className={`store-dot store-dot-${product.store_name}`}></span>
          <span className="text-[10px] text-[var(--text-muted)] truncate">
            {storeNames[product.store_name]}
            {product.category ? ` / ${product.category}` : ''}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-[12px] font-semibold text-[var(--text-secondary)] leading-tight mb-1.5 line-clamp-1">
          {product.product_name}
        </h3>

        {/* Protein hero */}
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-[18px] font-bold leading-none text-[var(--accent-highlight)]">
            {product.protein ?? '-'}
          </span>
          <span className="text-[10px] font-medium text-[var(--text-tertiary)]">g</span>
        </div>

        {/* Nutrients compact grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-[10px] mb-1.5">
          <span className="text-[var(--text-muted)]">F <span className="font-semibold text-[var(--text-secondary)]">{product.fat ?? '-'}</span>g</span>
          <span className="text-[var(--text-muted)]">C <span className="font-semibold text-[var(--text-secondary)]">{product.carbs ?? '-'}</span>g</span>
          <span className="text-[var(--text-muted)]"><span className="font-semibold text-[var(--text-secondary)]">{product.calories ?? '-'}</span>kcal</span>
          <span className="text-[var(--text-muted)]">繊維 <span className="font-semibold text-[var(--text-secondary)]">{product.fiber ?? '-'}</span>g</span>
        </div>

        {/* Price + Cospa */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--border-light)]">
          <span className="text-[12px] font-semibold text-[var(--text-primary)]">
            ¥{product.price?.toLocaleString()}
          </span>
          {proteinPer100yen && (
            <span className="text-[10px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded-full">
              {proteinPer100yen}g/¥100
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
