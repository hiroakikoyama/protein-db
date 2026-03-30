'use client'

interface SearchFiltersProps {
  store: string
  category: string
  sortBy: string
  onStoreChange: (store: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
}

const stores = [
  { value: '', label: '全店舗' },
  { value: 'seven', label: 'セブン' },
  { value: 'lawson', label: 'ローソン' },
  { value: 'familymart', label: 'ファミマ' },
]

const categories = [
  { value: '', label: '全カテゴリ' },
  { value: 'サラダチキン', label: 'サラダチキン' },
  { value: 'プロテインバー', label: 'プロテインバー' },
  { value: 'ゆで卵', label: 'ゆで卵' },
  { value: 'ヨーグルト', label: 'ヨーグルト' },
  { value: 'サラダ', label: 'サラダ' },
  { value: 'おにぎり', label: 'おにぎり' },
  { value: 'その他', label: 'その他' },
]

const sortOptions = [
  { value: 'protein_per_100yen', label: 'コスパ順' },
  { value: 'protein', label: 'タンパク質順' },
  { value: 'calories', label: 'カロリー順' },
  { value: 'price', label: '価格順' },
]

export function SearchFilters({
  store,
  category,
  sortBy,
  onStoreChange,
  onCategoryChange,
  onSortChange,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            店舗
          </label>
          <select
            value={store}
            onChange={(e) => onStoreChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {stores.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            並び替え
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
