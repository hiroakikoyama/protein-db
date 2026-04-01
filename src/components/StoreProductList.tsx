'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'
import { ProductCard } from './ProductCard'

interface StoreProductListProps {
  storeName: 'seven' | 'lawson' | 'familymart' | 'mybasket'
}

const sortOptions = [
  { value: 'protein', label: 'タンパク質が多い順' },
  { value: 'cospa', label: 'コスパが良い順' },
  { value: 'calories', label: 'カロリーが低い順' },
  { value: 'price', label: '価格が安い順' },
]

export function StoreProductList({ storeName }: StoreProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('protein')

  useEffect(() => {
    fetchProducts()
  }, [storeName, sortBy])

  async function fetchProducts() {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .eq('store_name', storeName)

      if (sortBy === 'protein') {
        query = query.order('protein', { ascending: false, nullsFirst: false })
      } else if (sortBy === 'calories') {
        query = query.order('calories', { ascending: true, nullsFirst: false })
      } else if (sortBy === 'price') {
        query = query.order('price', { ascending: true })
      }

      const { data, error } = await query.limit(50)

      if (error) {
        console.error('Error fetching products:', error)
        return
      }

      let sortedData: Product[] = data || []

      if (sortBy === 'cospa') {
        sortedData = sortedData
          .filter((p) => p.price && p.price > 0)
          .sort((a, b) => {
            const cospaA = (a.protein || 0) / a.price * 100
            const cospaB = (b.protein || 0) / b.price * 100
            return cospaB - cospaA
          })
      }

      setProducts(sortedData)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Sort */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`chip ${sortBy === option.value ? 'chip-active' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-[var(--border-light)] border-t-[var(--text-primary)] rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--text-tertiary)] mb-2">商品が見つかりませんでした</p>
          <p className="text-[13px] text-[var(--text-muted)]">
            データを追加中です
          </p>
        </div>
      ) : (
        <>
          <p className="text-[13px] text-[var(--text-muted)] mb-6">
            {products.length}件の商品
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
