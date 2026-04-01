'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'

type RankingType = 'protein' | 'cospa' | 'lowcal' | 'lowfat'

const rankingConfig = {
  protein: {
    label: 'タンパク質量',
    description: 'タンパク質が多い順',
  },
  cospa: {
    label: 'コスパ',
    description: '100円あたりタンパク質が多い順',
  },
  lowcal: {
    label: '低カロリー',
    description: 'カロリーが低い順（タンパク質15g以上）',
  },
  lowfat: {
    label: '低脂質',
    description: '脂質が少ない順（タンパク質15g以上）',
  },
}

const storeNames = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
  mybasket: 'まいばす',
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
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(rankingConfig) as RankingType[]).map((type) => {
          const cfg = rankingConfig[type]
          const isActive = activeTab === type
          return (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`chip ${isActive ? 'chip-active' : ''}`}
            >
              {cfg.label}
            </button>
          )
        })}
      </div>

      {/* Description */}
      <p className="text-[13px] text-[var(--text-muted)] mb-6">
        {config.description}
      </p>

      {/* Ranking List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-[var(--border-light)] border-t-[var(--text-primary)] rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--text-tertiary)]">データがありません</p>
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
                className="card flex items-center gap-4 p-4"
              >
                {/* Rank */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold ${
                  rank === 1 ? 'bg-[#FFD700] text-[#7A6200]' :
                  rank === 2 ? 'bg-[#C0C0C0] text-[#4A4A4A]' :
                  rank === 3 ? 'bg-[#CD7F32] text-white' :
                  'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                }`}>
                  {rank}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`store-dot store-dot-${product.store_name}`}></span>
                    <span className="text-[12px] text-[var(--text-muted)]">
                      {storeNames[product.store_name]}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-medium text-[var(--text-secondary)] truncate">
                    {product.product_name}
                  </h3>
                  <p className="text-[13px] text-[var(--text-muted)]">
                    ¥{product.price?.toLocaleString()}
                  </p>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-right">
                  {activeTab === 'protein' && (
                    <div>
                      <div className="text-[24px] font-bold text-[var(--accent-highlight)]">{product.protein}g</div>
                      <div className="text-[11px] text-[var(--text-muted)]">protein</div>
                    </div>
                  )}
                  {activeTab === 'cospa' && cospa && (
                    <div>
                      <div className="text-[24px] font-bold text-[var(--accent-highlight)]">{cospa}g</div>
                      <div className="text-[11px] text-[var(--text-muted)]">/¥100</div>
                    </div>
                  )}
                  {activeTab === 'lowcal' && (
                    <div>
                      <div className="text-[24px] font-bold text-[var(--text-primary)]">{product.calories}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">kcal</div>
                    </div>
                  )}
                  {activeTab === 'lowfat' && (
                    <div>
                      <div className="text-[24px] font-bold text-[var(--text-primary)]">{product.fat}g</div>
                      <div className="text-[11px] text-[var(--text-muted)]">fat</div>
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
