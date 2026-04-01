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
      <div className="px-3 py-2.5">
        {/* Row 1: Store + Name */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`store-dot store-dot-${product.store_name}`}></span>
          <span className="text-[11px] text-[var(--text-muted)] shrink-0">
            {storeNames[product.store_name]}
          </span>
          {product.category && (
            <>
              <span className="text-[10px] text-[var(--border-default)]">/</span>
              <span className="text-[11px] text-[var(--text-muted)] truncate">
                {product.category}
              </span>
            </>
          )}
        </div>

        {/* Row 2: Product Name */}
        <h3 className="text-[13px] font-semibold text-[var(--text-secondary)] leading-tight mb-2 line-clamp-1">
          {product.product_name}
        </h3>

        {/* Row 3: Protein hero + PFC inline */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-baseline gap-0.5 shrink-0">
            <span className="text-[20px] font-bold leading-none text-[var(--accent-highlight)]">
              {product.protein ?? '-'}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-tertiary)]">g</span>
          </div>
          <div className="nutrient-row text-[11px]">
            <div className="nutrient-item">
              <span className="nutrient-label">F</span>
              <span className="nutrient-value ml-0.5">{product.fat ?? '-'}</span>
            </div>
            <span className="nutrient-divider">|</span>
            <div className="nutrient-item">
              <span className="nutrient-label">C</span>
              <span className="nutrient-value ml-0.5">{product.carbs ?? '-'}</span>
            </div>
            <span className="nutrient-divider">|</span>
            <div className="nutrient-item">
              <span className="nutrient-value">{product.calories ?? '-'}</span>
              <span className="nutrient-label ml-0.5">kcal</span>
            </div>
          </div>
        </div>

        {/* Row 4: Price + Cospa */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border-light)]">
          <span className="text-[13px] font-semibold text-[var(--text-primary)]">
            ¥{product.price?.toLocaleString()}
          </span>
          {proteinPer100yen && (
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded-full">
              {proteinPer100yen}g/¥100
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
