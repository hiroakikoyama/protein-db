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
  { value: 'mybasket', label: 'まいばす' },
]

const categories = [
  { value: '', label: '全カテゴリ' },
  { value: 'サラダチキン', label: 'サラダチキン' },
  { value: '弁当', label: '弁当' },
  { value: 'プロテインドリンク', label: 'プロテインドリンク' },
  { value: 'おにぎり', label: 'おにぎり' },
  { value: '魚', label: '魚' },
  { value: 'ホットスナック', label: 'ホットスナック' },
  { value: 'プロテインバー', label: 'プロテインバー' },
  { value: 'サンドイッチ', label: 'サンドイッチ' },
  { value: '麺', label: '麺' },
  { value: '豆腐', label: '豆腐' },
  { value: 'ヨーグルト', label: 'ヨーグルト' },
  { value: 'パン', label: 'パン' },
  { value: 'ゆで卵', label: 'ゆで卵' },
  { value: 'おつまみ', label: 'おつまみ' },
  { value: 'サラダ', label: 'サラダ' },
  { value: '惣菜', label: '惣菜' },
]

const sortOptions = [
  { value: 'protein', label: 'タンパク質順' },
  { value: 'cospa', label: 'コスパ順' },
  { value: 'calories', label: '低カロリー順' },
  { value: 'price', label: '安い順' },
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
    <div className="space-y-2 mb-4">
      {/* Row 1: Store Chips - horizontal scroll on mobile */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1 scrollbar-hide">
        {stores.map((s) => (
          <button
            key={s.value}
            onClick={() => onStoreChange(s.value)}
            className={`chip !py-1 !px-2.5 !text-[12px] shrink-0 ${store === s.value ? 'chip-active' : ''}`}
          >
            {s.value && (
              <span className={`store-dot store-dot-${s.value} mr-1.5`}></span>
            )}
            {s.label}
          </button>
        ))}
      </div>

      {/* Row 2: Category + Sort - side by side */}
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="select-custom !py-1.5 !px-2.5 !pr-7 !text-[12px] flex-1 min-w-0"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="select-custom !py-1.5 !px-2.5 !pr-7 !text-[12px] flex-1 min-w-0"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
