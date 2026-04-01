// 商品データ自動追加スクリプト
// Claude APIを使用して新しい高タンパク商品データを生成・追加
// 使用方法: ANTHROPIC_API_KEY=xxx npx tsx scripts/auto-add-products.ts

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

const STORES = ['seven', 'lawson', 'familymart', 'mybasket'] as const
const CATEGORIES = [
  'サラダチキン', '弁当', 'プロテインドリンク', 'おにぎり', '魚',
  'ホットスナック', 'プロテインバー', 'サンドイッチ', '麺', '豆腐',
  'ヨーグルト', 'パン', 'ゆで卵', 'おつまみ', 'サラダ', '惣菜'
]

interface Product {
  store_name: string
  product_name: string
  price: number
  protein: number
  fat: number
  carbs: number
  calories: number
  category: string
  is_available: boolean
}

async function getExistingProductNames(): Promise<Set<string>> {
  const { data } = await supabase
    .from('products')
    .select('product_name, store_name')

  const names = new Set<string>()
  data?.forEach(p => names.add(`${p.store_name}:${p.product_name}`))
  return names
}

async function generateProducts(store: string, category: string, count: number = 5): Promise<Product[]> {
  const storeNameJa = {
    seven: 'セブン-イレブン',
    lawson: 'ローソン',
    familymart: 'ファミリーマート',
    mybasket: 'まいばすけっと'
  }[store]

  const prompt = `あなたは日本のコンビニエンスストアの商品データベースを作成するアシスタントです。

${storeNameJa}で実際に販売されている（または販売されていた）${category}カテゴリの高タンパク商品を${count}個、JSON形式で出力してください。

要件:
- 実在する商品名を使用（架空の商品名は不可）
- タンパク質が比較的多い商品を選ぶ（${category}カテゴリの中で）
- 価格は税込み（円）
- 栄養成分は1パッケージあたりの値
- 重複を避けるためユニークな商品を選ぶ

出力形式（JSON配列のみ、説明文不要）:
[
  {
    "product_name": "商品名",
    "price": 価格,
    "protein": タンパク質g,
    "fat": 脂質g,
    "carbs": 炭水化物g,
    "calories": カロリーkcal
  }
]`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // JSON部分を抽出
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error(`Failed to parse JSON for ${store}/${category}`)
      return []
    }

    const products = JSON.parse(jsonMatch[0])
    return products.map((p: any) => ({
      store_name: store,
      product_name: p.product_name,
      price: p.price,
      protein: p.protein,
      fat: p.fat,
      carbs: p.carbs,
      calories: p.calories,
      category: category,
      is_available: true
    }))
  } catch (error) {
    console.error(`Error generating products for ${store}/${category}:`, error)
    return []
  }
}

async function addProductsToDatabase(products: Product[], existingNames: Set<string>): Promise<number> {
  // 重複を除外
  const newProducts = products.filter(p =>
    !existingNames.has(`${p.store_name}:${p.product_name}`)
  )

  if (newProducts.length === 0) {
    return 0
  }

  const { data, error } = await supabase
    .from('products')
    .insert(newProducts)
    .select()

  if (error) {
    console.error('Error inserting products:', error)
    return 0
  }

  // 追加した商品名をセットに追加
  newProducts.forEach(p => existingNames.add(`${p.store_name}:${p.product_name}`))

  return data?.length || 0
}

async function main() {
  console.log('=== 商品データ自動追加スクリプト ===\n')

  // 既存の商品名を取得
  const existingNames = await getExistingProductNames()
  console.log(`既存商品数: ${existingNames.size}\n`)

  let totalAdded = 0

  // 各店舗・カテゴリで商品を生成
  for (const store of STORES) {
    for (const category of CATEGORIES) {
      console.log(`Generating: ${store} / ${category}...`)

      const products = await generateProducts(store, category, 3)
      const added = await addProductsToDatabase(products, existingNames)

      console.log(`  -> Added ${added} new products`)
      totalAdded += added

      // レート制限対策
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  console.log(`\n=== 完了 ===`)
  console.log(`追加した商品数: ${totalAdded}`)
  console.log(`総商品数: ${existingNames.size}`)
}

main().catch(console.error)
