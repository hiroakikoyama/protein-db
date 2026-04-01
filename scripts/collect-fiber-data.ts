// 食物繊維データ収集スクリプト
// Claude APIを使用して既存商品の食物繊維量を推定・DBに書き込む
// 使用方法: npx tsx scripts/collect-fiber-data.ts
// 担当: CTO / 日付: 2026-04-01 / ステータス: 新規作成

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const anthropicApiKey = process.env.ANTHROPIC_API_KEY

if (!anthropicApiKey) {
  console.error('Error: ANTHROPIC_API_KEY is required')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const anthropic = new Anthropic({ apiKey: anthropicApiKey })

const BATCH_SIZE = 20

interface ProductForFiber {
  id: string
  store_name: string
  product_name: string
  category: string | null
  calories: number | null
  carbs: number | null
}

async function getProductsWithoutFiber(): Promise<ProductForFiber[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, store_name, product_name, category, calories, carbs')
    .eq('is_available', true)
    .is('fiber', null)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

async function estimateFiberForBatch(
  products: ProductForFiber[]
): Promise<Map<string, number>> {
  const storeNameJa: Record<string, string> = {
    seven: 'セブン-イレブン',
    lawson: 'ローソン',
    familymart: 'ファミリーマート',
  }

  const productList = products
    .map(
      (p, i) =>
        `${i + 1}. [${storeNameJa[p.store_name]}] ${p.product_name}（カテゴリ: ${p.category || '不明'}, ${p.calories ?? '?'}kcal, 炭水化物${p.carbs ?? '?'}g）`
    )
    .join('\n')

  const prompt = `あなたは日本のコンビニ商品の栄養成分に詳しい管理栄養士です。
以下の商品の食物繊維量（g）を推定してください。

商品パッケージの栄養成分表示や、類似商品のデータを参考に、できるだけ正確な値を出してください。
不明な場合でも、カテゴリ・カロリー・炭水化物量から合理的に推定してください。

商品リスト:
${productList}

出力形式（JSON配列のみ、説明文不要）:
[
  { "index": 1, "fiber": 推定値(小数点1桁) },
  ...
]

注意:
- サラダチキン・ゆで卵・魚などは食物繊維0〜0.5g程度
- サラダ・弁当・おにぎりは含有量にばらつきあり
- プロテインバーは商品による（1〜5g程度）
- 豆腐は0.3〜1g程度
- 必ず全商品分のデータを出力すること`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text =
      response.content[0].type === 'text' ? response.content[0].text : ''

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Failed to parse fiber data JSON')
      return new Map()
    }

    const results: { index: number; fiber: number }[] = JSON.parse(
      jsonMatch[0]
    )
    const fiberMap = new Map<string, number>()

    for (const r of results) {
      const product = products[r.index - 1]
      if (product) {
        fiberMap.set(product.id, Math.round(r.fiber * 10) / 10)
      }
    }

    return fiberMap
  } catch (error) {
    console.error('Error calling Claude API:', error)
    return new Map()
  }
}

async function updateFiberInDatabase(
  fiberMap: Map<string, number>
): Promise<number> {
  let updated = 0

  for (const [id, fiber] of fiberMap) {
    const { error } = await supabase
      .from('products')
      .update({ fiber })
      .eq('id', id)

    if (error) {
      console.error(`Error updating fiber for ${id}:`, error)
    } else {
      updated++
    }
  }

  return updated
}

async function main() {
  console.log('=== 食物繊維データ収集スクリプト ===\n')

  const products = await getProductsWithoutFiber()
  console.log(`食物繊維データ未取得の商品数: ${products.length}\n`)

  if (products.length === 0) {
    console.log('全商品の食物繊維データが揃っています。')
    return
  }

  let totalUpdated = 0

  // バッチ処理
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(products.length / BATCH_SIZE)

    console.log(
      `バッチ ${batchNum}/${totalBatches} (${batch.length}商品) を処理中...`
    )

    const fiberMap = await estimateFiberForBatch(batch)
    console.log(`  -> ${fiberMap.size}件の推定結果を取得`)

    const updated = await updateFiberInDatabase(fiberMap)
    console.log(`  -> ${updated}件をDB更新`)

    totalUpdated += updated

    // レート制限対策
    if (i + BATCH_SIZE < products.length) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
  }

  console.log(`\n=== 完了 ===`)
  console.log(`更新した商品数: ${totalUpdated}/${products.length}`)
}

main().catch(console.error)
