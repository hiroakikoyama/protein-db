'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'

type RankingType = 'protein' | 'cospa' | 'lowcal' | 'lowfat'

const rankingConfig = {
  protein: {
    label: 'タンパク質量',
    icon: '💪',
    description: 'タンパク質が多い順',
    color: 'orange',
  },
  cospa: {
    label: 'コスパ',
    icon: '💰',
    description: '100円あたりタンパク質が多い順',
    color: 'purple',
  },
  lowcal: {
    label: '低カロリー',
    icon: '🔥',
    description: 'カロリーが低い順（タンパク質15g以上）',
    color: 'green',
  },
  lowfat: {
    label: '低脂質',
    icon: '🥗',
    description: '脂質が少ない順（タンパク質15g以上）',
    color: 'blue',
  },
}

const storeNames = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
}

const storeColors = {
  seven: 'bg-red-500',
  lawson: 'bg-blue-500',
  familymart: 'bg-green-500',
}

export function RankingTabs() {
  const [activeTab, setActiveTab] = useState<RankingType>('protein')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRanking(activeTab)
  }, [activeTab])

  async function fetchRanking(type: RankingType) {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .not('protein', 'is', null)

      if (type === 'protein') {
        query = query.order('protein', { ascending: false })
      } else if (type === 'cospa') {
        // コスパはクライアントサイドでソート
        query = query.order('protein', { ascending: false })
      } else if (type === 'lowcal') {
        query = query.gte('protein', 15).order('calories', { ascending: true })
      } else if (type === 'lowfat') {
        query = query.gte('protein', 15).order('fat', { ascending: true })
      }

      const { data, error } = await query.limit(20)

      if (error) {
        console.error('Error fetching ranking:', error)
        return
      }

      let sortedData: Product[] = data || []

      // コスパ順の場合はクライアントサイドでソート
      if (type === 'cospa') {
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

  const config = rankingConfig[activeTab]

  return (
    <div>
      {/* タブ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(rankingConfig) as RankingType[]).map((type) => {
          const cfg = rankingConfig[type]
          const isActive = activeTab === type
          return (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                isActive
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cfg.icon}</span>
              <span>{cfg.label}</span>
            </button>
          )
        })}
      </div>

      {/* 説明 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-gray-600">
          <span className="font-semibold">{config.icon} {config.label}ランキング：</span>
          {config.description}
        </p>
      </div>

      {/* ランキングリスト */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">データがありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product, index) => {
            const rank = index + 1
            const cospa = product.protein && product.price
              ? (product.protein / product.price * 100).toFixed(1)
              : null

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                {/* ランク */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  rank === 2 ? 'bg-gray-300 text-gray-700' :
                  rank === 3 ? 'bg-orange-300 text-orange-800' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {rank}
                </div>

                {/* 画像 */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* 商品情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${storeColors[product.store_name]} text-white text-xs px-2 py-0.5 rounded`}>
                      {storeNames[product.store_name]}
                    </span>
                    {product.category && (
                      <span className="text-xs text-gray-500">{product.category}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 truncate">{product.product_name}</h3>
                  <p className="text-sm text-gray-500">¥{product.price}</p>
                </div>

                {/* スコア */}
                <div className="flex-shrink-0 text-right">
                  {activeTab === 'protein' && (
                    <div>
                      <div className="text-2xl font-bold text-orange-500">{product.protein}g</div>
                      <div className="text-xs text-gray-500">タンパク質</div>
                    </div>
                  )}
                  {activeTab === 'cospa' && cospa && (
                    <div>
                      <div className="text-2xl font-bold text-purple-500">{cospa}g</div>
                      <div className="text-xs text-gray-500">100円あたり</div>
                    </div>
                  )}
                  {activeTab === 'lowcal' && (
                    <div>
                      <div className="text-2xl font-bold text-green-500">{product.calories}kcal</div>
                      <div className="text-xs text-gray-500">P:{product.protein}g</div>
                    </div>
                  )}
                  {activeTab === 'lowfat' && (
                    <div>
                      <div className="text-2xl font-bold text-blue-500">{product.fat}g</div>
                      <div className="text-xs text-gray-500">脂質</div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
