'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'
import { ProductCard } from './ProductCard'
import { SearchFilters } from './SearchFilters'
import { AdBanner } from './AdBanner'

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

      setProducts(data || [])
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
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">商品が見つかりませんでした</p>
          <p className="text-sm text-gray-400 mt-2">データを追加中です。しばらくお待ちください。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <>
              <ProductCard key={product.id} product={product} />
              {index === 7 && (
                <div key="ad-inline" className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <AdBanner slot="inline" />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  )
}
