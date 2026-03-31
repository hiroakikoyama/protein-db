'use client'

import type { Product } from '@/types/database'

const storeClasses = {
  seven: 'card-seven',
  lawson: 'card-lawson',
  familymart: 'card-familymart',
}

const storeNames = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
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
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="placeholder-image w-full h-full">
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Store & Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`store-dot store-dot-${product.store_name}`}></span>
          <span className="text-[12px] font-medium text-[var(--text-muted)]">
            {storeNames[product.store_name]}
          </span>
          {product.category && (
            <>
              <span className="text-[var(--border-light)]">/</span>
              <span className="text-[12px] text-[var(--text-muted)]">
                {product.category}
              </span>
            </>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] leading-snug mb-4 line-clamp-2 min-h-[2.5em]">
          {product.product_name}
        </h3>

        {/* Protein - Hero Display */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-protein-value">{product.protein ?? '-'}</span>
          <span className="text-protein-unit">g</span>
          <span className="text-[12px] text-[var(--text-muted)] ml-1">protein</span>
        </div>

        {/* Other Nutrients - Minimal Row */}
        <div className="nutrient-row mb-4 pb-4 border-b border-[var(--border-light)]">
          <div className="nutrient-item">
            <span className="nutrient-label">F</span>
            <span className="nutrient-value ml-1">{product.fat ?? '-'}g</span>
          </div>
          <span className="nutrient-divider">|</span>
          <div className="nutrient-item">
            <span className="nutrient-label">C</span>
            <span className="nutrient-value ml-1">{product.carbs ?? '-'}g</span>
          </div>
          <span className="nutrient-divider">|</span>
          <div className="nutrient-item">
            <span className="nutrient-value">{product.calories ?? '-'}</span>
            <span className="nutrient-label ml-0.5">kcal</span>
          </div>
        </div>

        {/* Price & Cospa */}
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[var(--text-primary)]">
            ¥{product.price?.toLocaleString()}
          </span>
          {proteinPer100yen && (
            <span className="text-[12px] font-medium text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-full">
              {proteinPer100yen}g/¥100
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
