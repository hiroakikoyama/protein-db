'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'

type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack'

interface MealPlan {
  breakfast: Product[]
  lunch: Product[]
  dinner: Product[]
  snack: Product[]
  totals: NutrientTotals
}

interface NutrientTotals {
  protein: number
  fat: number
  carbs: number
  calories: number
  fiber: number
  price: number
}

interface Targets {
  protein: number
  fat: number
  carbs: number
  calories: number
  fiber: number
}

const MEAL_LABELS: Record<MealSlot, string> = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
}

const MEAL_RATIOS: Record<MealSlot, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snack: 0.10,
}

const PRESETS: (Targets & { label: string })[] = [
  { label: '減量（男性）', protein: 150, fat: 50, carbs: 200, calories: 1800, fiber: 20 },
  { label: '減量（女性）', protein: 100, fat: 40, carbs: 150, calories: 1400, fiber: 18 },
  { label: '増量（男性）', protein: 180, fat: 80, carbs: 350, calories: 2800, fiber: 25 },
  { label: 'バランス型', protein: 120, fat: 60, carbs: 250, calories: 2000, fiber: 20 },
]

const storeNames: Record<string, string> = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
  mybasket: 'まいばす',
}

export function MealPlanner() {
  const [targets, setTargets] = useState<Targets>({
    protein: 150,
    fat: 50,
    carbs: 200,
    calories: 1800,
    fiber: 20,
  })
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [storeFilter, setStoreFilter] = useState('')

  async function generateMealPlan() {
    setLoading(true)
    setMealPlan(null)
    setError('')

    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .not('protein', 'is', null)
        .not('calories', 'is', null)

      if (storeFilter) {
        query = query.eq('store_name', storeFilter)
      }

      const { data, error: dbError } = await query

      if (dbError) {
        setError('データの取得に失敗しました。')
        console.error('DB Error:', dbError)
        return
      }

      if (!data || data.length === 0) {
        setError('商品データがありません。')
        return
      }

      const plan = buildMealPlan(data, targets)
      setMealPlan(plan)
    } catch (err) {
      setError('メニュー生成中にエラーが発生しました。')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div>
        <p className="text-[13px] font-medium text-[var(--text-muted)] mb-3">プリセット</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setTargets({ protein: p.protein, fat: p.fat, carbs: p.carbs, calories: p.calories, fiber: p.fiber })}
              className="chip"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Input */}
      <div className="card p-5">
        <h2 className="text-[15px] font-semibold text-[var(--text-primary)] mb-4">
          目標栄養素（1日あたり）
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <NutrientInput label="タンパク質" unit="g" value={targets.protein}
            onChange={(v) => setTargets({ ...targets, protein: v })} color="var(--accent-highlight)" />
          <NutrientInput label="脂質" unit="g" value={targets.fat}
            onChange={(v) => setTargets({ ...targets, fat: v })} />
          <NutrientInput label="炭水化物" unit="g" value={targets.carbs}
            onChange={(v) => setTargets({ ...targets, carbs: v })} />
          <NutrientInput label="カロリー" unit="kcal" value={targets.calories}
            onChange={(v) => setTargets({ ...targets, calories: v })} />
          <NutrientInput label="食物繊維" unit="g" value={targets.fiber}
            onChange={(v) => setTargets({ ...targets, fiber: v })} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}
            className="select-custom">
            <option value="">全店舗から選ぶ</option>
            <option value="seven">セブン-イレブン</option>
            <option value="lawson">ローソン</option>
            <option value="familymart">ファミリーマート</option>
            <option value="mybasket">まいばすけっと</option>
          </select>

          <button onClick={generateMealPlan} disabled={loading} className="btn-primary gap-2">
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                生成中...
              </>
            ) : (
              'メニューを提案'
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card p-4 border-l-4 border-l-red-400">
          <p className="text-[13px] text-red-600">{error}</p>
        </div>
      )}

      {/* Result */}
      {mealPlan && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-[15px] font-semibold text-[var(--text-primary)]">
                提案メニュー
              </h2>
              <div className="flex flex-wrap gap-4 text-[13px]">
                <NutrientBadge label="P" value={mealPlan.totals.protein} unit="g" target={targets.protein} />
                <NutrientBadge label="F" value={mealPlan.totals.fat} unit="g" target={targets.fat} />
                <NutrientBadge label="C" value={mealPlan.totals.carbs} unit="g" target={targets.carbs} />
                <NutrientBadge label="kcal" value={mealPlan.totals.calories} unit="" target={targets.calories} />
                <NutrientBadge label="繊維" value={mealPlan.totals.fiber} unit="g" target={targets.fiber} />
                <span className="text-[var(--text-secondary)] font-semibold">
                  合計 ¥{mealPlan.totals.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Meal Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(MEAL_LABELS) as MealSlot[]).map((slot) => (
              <MealSlotCard key={slot} slot={slot} products={mealPlan[slot]} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// --- Sub Components ---

function NutrientInput({ label, unit, value, onChange, color }: {
  label: string; unit: string; value: number; onChange: (v: number) => void; color?: string
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-[var(--text-muted)] mb-1.5">{label}</label>
      <div className="relative">
        <input type="number" value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg px-3 py-2 text-[14px] font-semibold focus:outline-none focus:border-[var(--text-primary)] focus:ring-2 focus:ring-[rgba(26,26,26,0.08)] transition-all"
          style={color ? { color } : {}} min={0} />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[var(--text-muted)]">{unit}</span>
      </div>
    </div>
  )
}

function NutrientBadge({ label, value, unit, target }: {
  label: string; value: number; unit: string; target: number
}) {
  const ratio = target > 0 ? value / target : 0
  const color = ratio > 1.1 ? 'text-red-500' : ratio < 0.9 ? 'text-amber-500' : 'text-emerald-600'
  return (
    <span className={`font-medium ${color}`}>
      {label} {Math.round(value)}{unit}
      <span className="text-[11px] text-[var(--text-muted)] ml-0.5">({Math.round(ratio * 100)}%)</span>
    </span>
  )
}

function MealSlotCard({ slot, products }: { slot: MealSlot; products: Product[] }) {
  const totals = calcTotals(products)

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
          {MEAL_LABELS[slot]}
        </h3>
        <span className="text-[12px] text-[var(--text-muted)]">
          目安 {Math.round(MEAL_RATIOS[slot] * 100)}%
        </span>
      </div>

      {products.length === 0 ? (
        <p className="text-[13px] text-[var(--text-muted)] py-4 text-center">
          条件に合う商品が見つかりませんでした
        </p>
      ) : (
        <div className="space-y-2">
          {products.map((product, i) => (
            <div key={`${product.id}-${i}`}
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-[var(--bg-primary)]">
              <span className={`store-dot store-dot-${product.store_name}`}></span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[var(--text-secondary)] truncate">
                  {product.product_name}
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {storeNames[product.store_name] || product.store_name} · P{product.protein}g · F{product.fat}g · C{product.carbs}g · {product.calories}kcal
                </p>
              </div>
              <span className="text-[12px] font-semibold text-[var(--text-primary)] shrink-0">
                ¥{product.price?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[var(--border-light)] text-[11px] text-[var(--text-muted)]">
          <span>P {Math.round(totals.protein)}g</span>
          <span>F {Math.round(totals.fat)}g</span>
          <span>C {Math.round(totals.carbs)}g</span>
          <span>{Math.round(totals.calories)}kcal</span>
          <span className="ml-auto font-medium text-[var(--text-secondary)]">
            ¥{totals.price.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}

// --- Utilities ---

function calcTotals(products: Product[]): NutrientTotals {
  return products.reduce(
    (acc, p) => ({
      protein: acc.protein + (p.protein || 0),
      fat: acc.fat + (p.fat || 0),
      carbs: acc.carbs + (p.carbs || 0),
      calories: acc.calories + (p.calories || 0),
      fiber: acc.fiber + (p.fiber || 0),
      price: acc.price + (p.price || 0),
    }),
    { protein: 0, fat: 0, carbs: 0, calories: 0, fiber: 0, price: 0 }
  )
}

// --- Meal Plan Algorithm ---

// 各食事帯に適したカテゴリ（主食 / 主菜 / 副菜・その他）
const SLOT_ROLES: Record<MealSlot, { main: string[]; protein: string[]; side: string[] }> = {
  breakfast: {
    main: ['おにぎり', 'サンドイッチ', 'パン'],
    protein: ['ゆで卵', 'ヨーグルト', 'プロテインドリンク', 'サラダチキン'],
    side: ['サラダ', 'プロテインバー'],
  },
  lunch: {
    main: ['弁当', 'おにぎり', 'サンドイッチ', '麺'],
    protein: ['サラダチキン', 'ホットスナック', '魚', '惣菜'],
    side: ['サラダ', 'ゆで卵', '豆腐'],
  },
  dinner: {
    main: ['弁当', '麺', 'おにぎり'],
    protein: ['サラダチキン', '魚', 'ホットスナック', '惣菜', 'おつまみ'],
    side: ['サラダ', '豆腐', 'ゆで卵'],
  },
  snack: {
    main: ['プロテインバー'],
    protein: ['プロテインドリンク', 'ヨーグルト'],
    side: ['ゆで卵', '豆腐'],
  },
}

// プランの目標達成度をスコアリング（低いほど良い）
function scorePlan(plan: Record<MealSlot, Product[]>, targets: Targets): number {
  const all = [...plan.breakfast, ...plan.lunch, ...plan.dinner, ...plan.snack]
  const t = calcTotals(all)

  const pRatio = targets.protein > 0 ? t.protein / targets.protein : 1
  const fRatio = targets.fat > 0 ? t.fat / targets.fat : 1
  const cRatio = targets.carbs > 0 ? t.carbs / targets.carbs : 1
  const calRatio = targets.calories > 0 ? t.calories / targets.calories : 1

  // P: 95%以上を要求（不足ペナルティ大）
  const pPenalty = pRatio < 0.95 ? (0.95 - pRatio) * 500 : pRatio > 1.15 ? (pRatio - 1.15) * 200 : 0
  // F, C, Cal: 90-110%を要求
  const fPenalty = fRatio < 0.9 ? (0.9 - fRatio) * 300 : fRatio > 1.1 ? (fRatio - 1.1) * 300 : 0
  const cPenalty = cRatio < 0.9 ? (0.9 - cRatio) * 300 : cRatio > 1.1 ? (cRatio - 1.1) * 300 : 0
  const calPenalty = calRatio < 0.9 ? (0.9 - calRatio) * 400 : calRatio > 1.1 ? (calRatio - 1.1) * 400 : 0

  // カテゴリ多様性ボーナス（重複カテゴリが少ないほど良い）
  const cats = all.map((p) => p.category)
  const uniqueCats = new Set(cats).size
  const diversityBonus = uniqueCats * -5

  return pPenalty + fPenalty + cPenalty + calPenalty + diversityBonus
}

// プランが基準を満たしているか判定
function meetsTargets(totals: NutrientTotals, targets: Targets): boolean {
  const pRatio = targets.protein > 0 ? totals.protein / targets.protein : 1
  const fRatio = targets.fat > 0 ? totals.fat / targets.fat : 1
  const cRatio = targets.carbs > 0 ? totals.carbs / targets.carbs : 1
  const calRatio = targets.calories > 0 ? totals.calories / targets.calories : 1
  return pRatio >= 0.95 && fRatio >= 0.9 && fRatio <= 1.1 && cRatio >= 0.9 && cRatio <= 1.1 && calRatio >= 0.9 && calRatio <= 1.1
}

function pickRandomFromPool(pool: Product[], usedCategories: Set<string>): Product | null {
  if (pool.length === 0) return null
  // カテゴリ重複を避けつつランダム選択
  const fresh = pool.filter((p) => !usedCategories.has(p.category || ''))
  const candidates = fresh.length > 0 ? fresh : pool
  return candidates[Math.floor(Math.random() * candidates.length)]
}

// 1回分のメニュー案を生成（ランダム性あり）
function generateCandidate(
  allProducts: Product[],
  targets: Targets
): Record<MealSlot, Product[]> {
  const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner', 'snack']
  const result: Record<MealSlot, Product[]> = {
    breakfast: [], lunch: [], dinner: [], snack: [],
  }
  const usedIds = new Set<string>()

  const byCategory = new Map<string, Product[]>()
  for (const p of allProducts) {
    const cat = p.category || 'その他'
    if (!byCategory.has(cat)) byCategory.set(cat, [])
    byCategory.get(cat)!.push(p)
  }

  for (const slot of slots) {
    const slotCalTarget = targets.calories * MEAL_RATIOS[slot]
    const roles = SLOT_ROLES[slot]
    const usedCategories = new Set<string>()
    let slotCal = 0

    // 主食
    const mainPool = roles.main
      .flatMap((cat) => byCategory.get(cat) || [])
      .filter((p) => !usedIds.has(p.id))
    const mainPick = pickRandomFromPool(mainPool, usedCategories)
    if (mainPick) {
      result[slot].push(mainPick)
      usedIds.add(mainPick.id)
      usedCategories.add(mainPick.category || '')
      slotCal += mainPick.calories || 0
    }

    const isBento = mainPick?.category === '弁当'
    const maxItems = slot === 'snack' ? 2 : isBento ? 2 : 3

    // タンパク質源
    if (result[slot].length < maxItems) {
      const proteinPool = roles.protein
        .flatMap((cat) => byCategory.get(cat) || [])
        .filter((p) => !usedIds.has(p.id))
      const protPick = pickRandomFromPool(proteinPool, usedCategories)
      if (protPick) {
        result[slot].push(protPick)
        usedIds.add(protPick.id)
        usedCategories.add(protPick.category || '')
        slotCal += protPick.calories || 0
      }
    }

    // 副菜
    if (result[slot].length < maxItems) {
      const sidePool = roles.side
        .flatMap((cat) => byCategory.get(cat) || [])
        .filter((p) => !usedIds.has(p.id))
      const sidePick = pickRandomFromPool(sidePool, usedCategories)
      if (sidePick) {
        result[slot].push(sidePick)
        usedIds.add(sidePick.id)
        slotCal += sidePick.calories || 0
      }
    }

    // 高カロリー目標の場合、追加で主食をもう1品（最大4品）
    if (result[slot].length < 4 && slotCal < slotCalTarget * 0.7 && slot !== 'snack') {
      const extraPool = roles.main
        .flatMap((cat) => byCategory.get(cat) || [])
        .filter((p) => !usedIds.has(p.id))
      const extraPick = pickRandomFromPool(extraPool, usedCategories)
      if (extraPick) {
        result[slot].push(extraPick)
        usedIds.add(extraPick.id)
        slotCal += extraPick.calories || 0
      }
    }
  }

  return result
}

// スワップ最適化: 1商品ずつ入れ替えてスコア改善を試みる
function optimizePlan(
  plan: Record<MealSlot, Product[]>,
  allProducts: Product[],
  targets: Targets
): Record<MealSlot, Product[]> {
  const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner', 'snack']
  let bestScore = scorePlan(plan, targets)
  let improved = true
  let iterations = 0
  const MAX_ITERATIONS = 150

  while (improved && iterations < MAX_ITERATIONS) {
    improved = false
    iterations++

    for (const slot of slots) {
      const items = plan[slot]
      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i]
        const roles = SLOT_ROLES[slot]
        const roleCategories = i === 0 ? roles.main : i === 1 ? roles.protein : [...roles.side, ...roles.main]

        // 使用中のID一覧（現在のアイテムを除く）
        const otherIds = new Set<string>()
        for (const s of slots) {
          for (const p of plan[s]) {
            if (p.id !== currentItem.id) otherIds.add(p.id)
          }
        }

        // 同じ役割の候補からスワップを試す
        const candidates = roleCategories
          .flatMap((cat) => allProducts.filter((p) => p.category === cat))
          .filter((p) => !otherIds.has(p.id))

        for (const candidate of candidates) {
          items[i] = candidate
          const newScore = scorePlan(plan, targets)
          if (newScore < bestScore) {
            bestScore = newScore
            improved = true
            break
          }
          items[i] = currentItem // revert
        }

        if (improved) break
      }
      if (improved) break
    }
  }

  return plan
}

function buildMealPlan(allProducts: Product[], targets: Targets): MealPlan {
  const NUM_CANDIDATES = 100

  let bestPlan: Record<MealSlot, Product[]> | null = null
  let bestScore = Infinity

  // フェーズ1: 複数のランダム候補を生成し、ベストを選ぶ
  for (let i = 0; i < NUM_CANDIDATES; i++) {
    const candidate = generateCandidate(allProducts, targets)
    const score = scorePlan(candidate, targets)
    if (score < bestScore) {
      bestScore = score
      bestPlan = candidate
    }
  }

  if (!bestPlan) {
    return {
      breakfast: [], lunch: [], dinner: [], snack: [],
      totals: { protein: 0, fat: 0, carbs: 0, calories: 0, fiber: 0, price: 0 },
    }
  }

  // フェーズ2: ベスト候補をスワップ最適化で磨き上げる
  bestPlan = optimizePlan(bestPlan, allProducts, targets)

  const allSelected = [...bestPlan.breakfast, ...bestPlan.lunch, ...bestPlan.dinner, ...bestPlan.snack]
  const totals = calcTotals(allSelected)

  return { ...bestPlan, totals }
}
