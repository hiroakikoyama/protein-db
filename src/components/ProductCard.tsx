'use client'

import type { Product } from '@/types/database'

const storeColors = {
  seven: 'bg-red-500',
  lawson: 'bg-blue-500',
  familymart: 'bg-green-500',
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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        <span className={`absolute top-2 left-2 ${storeColors[product.store]} text-white text-xs px-2 py-1 rounded`}>
          {storeNames[product.store]}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-gray-900">¥{product.price}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="bg-orange-50 rounded p-2 text-center">
            <div className="text-orange-600 font-bold">{product.protein}g</div>
            <div className="text-gray-500 text-xs">タンパク質</div>
          </div>
          <div className="bg-blue-50 rounded p-2 text-center">
            <div className="text-blue-600 font-bold">{product.calories}kcal</div>
            <div className="text-gray-500 text-xs">カロリー</div>
          </div>
          <div className="bg-yellow-50 rounded p-2 text-center">
            <div className="text-yellow-600 font-bold">{product.fat}g</div>
            <div className="text-gray-500 text-xs">脂質</div>
          </div>
          <div className="bg-green-50 rounded p-2 text-center">
            <div className="text-green-600 font-bold">{product.carbs}g</div>
            <div className="text-gray-500 text-xs">炭水化物</div>
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg p-2 text-center">
          <span className="text-purple-700 font-bold">
            100円あたり {product.protein_per_100yen.toFixed(1)}g
          </span>
          <span className="text-purple-500 text-xs block">タンパク質コスパ</span>
        </div>

        {product.affiliate_url && (
          <a
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg font-medium transition-colors"
          >
            詳細を見る
          </a>
        )}
      </div>
    </div>
  )
}
