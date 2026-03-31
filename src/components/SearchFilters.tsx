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
  { value: 'プロテインドリンク', label: 'プロテインドリンク' },
  { value: 'ゆで卵', label: 'ゆで卵' },
  { value: 'ヨーグルト', label: 'ヨーグルト' },
  { value: 'サラダ', label: 'サラダ' },
  { value: 'サンドイッチ', label: 'サンドイッチ' },
  { value: '弁当', label: '弁当' },
  { value: '魚', label: '魚' },
  { value: '豆腐', label: '豆腐' },
  { value: 'おつまみ', label: 'おつまみ' },
]

const sortOptions = [
  { value: 'protein', label: 'タンパク質が多い順' },
  { value: 'cospa', label: 'コスパが良い順' },
  { value: 'calories', label: 'カロリーが低い順' },
  { value: 'price', label: '価格が安い順' },
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
    <div className="flex flex-col gap-4 mb-8">
      {/* Store Chips */}
      <div className="flex flex-wrap gap-2">
        {stores.map((s) => (
          <button
            key={s.value}
            onClick={() => onStoreChange(s.value)}
            className={`chip ${store === s.value ? 'chip-active' : ''}`}
          >
            {s.value && (
              <span className={`store-dot store-dot-${s.value} mr-2`}></span>
            )}
            {s.label}
          </button>
        ))}
      </div>

      {/* Category & Sort */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="select-custom"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="h-5 w-px bg-[var(--border-light)] hidden sm:block" />

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="select-custom"
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
