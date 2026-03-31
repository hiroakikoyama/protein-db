'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'
import { ProductCard } from './ProductCard'

interface StoreProductListProps {
  storeName: 'seven' | 'lawson' | 'familymart'
}

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

      setProducts(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ソート */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-gray-600 text-sm">並び替え:</span>
        <div className="flex gap-2">
          {[
            { value: 'protein', label: 'タンパク質順' },
            { value: 'calories', label: '低カロリー順' },
            { value: 'price', label: '価格順' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                sortBy === option.value
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

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
        <>
          <p className="text-gray-500 text-sm mb-4">{products.length}件の商品</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
