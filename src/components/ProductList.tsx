'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'
import { ProductCard } from './ProductCard'
import { SearchFilters } from './SearchFilters'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [store, setStore] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('protein')

  useEffect(() => {
    fetchProducts()
  }, [store, category, sortBy])

  async function fetchProducts() {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true)

      if (store) {
        query = query.eq('store_name', store)
      }

      if (category) {
        query = query.eq('category', category)
      }

      // Sort by selected field
      if (sortBy === 'protein') {
        query = query.order('protein', { ascending: false, nullsFirst: false })
      } else if (sortBy === 'calories') {
        query = query.order('calories', { ascending: true, nullsFirst: false })
      } else if (sortBy === 'price') {
        query = query.order('price', { ascending: true })
      } else {
        query = query.order('protein', { ascending: false, nullsFirst: false })
      }

      const { data, error } = await query.limit(50)

      if (error) {
        console.error('Error fetching products:', error)
        return
      }

      let sortedData: Product[] = data || []

      // コスパ順の場合はクライアントサイドでソート
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
      <SearchFilters
        store={store}
        category={category}
        sortBy={sortBy}
        onStoreChange={setStore}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-[var(--border-light)] border-t-[var(--text-primary)] rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--text-tertiary)] mb-2">商品が見つかりませんでした</p>
          <p className="text-[13px] text-[var(--text-muted)]">
            フィルターを変更してお試しください
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
