// サンプル商品データを投入するスクリプト
// 使用方法: npx ts-node scripts/seed-data.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleProducts = [
  // セブンイレブン
  {
    store: 'seven',
    name: 'サラダチキン プレーン',
    price: 238,
    protein: 26.0,
    fat: 1.5,
    carbs: 0.3,
    calories: 114,
    protein_per_100yen: 10.92,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'seven',
    name: 'サラダチキン スモーク',
    price: 238,
    protein: 25.0,
    fat: 2.0,
    carbs: 0.5,
    calories: 118,
    protein_per_100yen: 10.50,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'seven',
    name: 'たんぱく質が摂れる 鶏むね肉のサラダ',
    price: 430,
    protein: 27.5,
    fat: 8.2,
    carbs: 12.3,
    calories: 235,
    protein_per_100yen: 6.40,
    category: 'サラダ',
    is_active: true,
  },
  {
    store: 'seven',
    name: '味付き半熟ゆでたまご 2個入',
    price: 162,
    protein: 12.8,
    fat: 10.0,
    carbs: 0.6,
    calories: 142,
    protein_per_100yen: 7.90,
    category: 'ゆで卵',
    is_active: true,
  },
  {
    store: 'seven',
    name: 'inバー プロテイン ベイクドチョコ',
    price: 173,
    protein: 16.2,
    fat: 10.6,
    carbs: 12.1,
    calories: 211,
    protein_per_100yen: 9.36,
    category: 'プロテインバー',
    is_active: true,
  },
  // ローソン
  {
    store: 'lawson',
    name: 'サラダチキン ハーブ',
    price: 238,
    protein: 24.5,
    fat: 1.8,
    carbs: 0.8,
    calories: 116,
    protein_per_100yen: 10.29,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'lawson',
    name: 'たんぱく質が摂れるチキン&たまごサンド',
    price: 398,
    protein: 26.0,
    fat: 15.2,
    carbs: 28.5,
    calories: 358,
    protein_per_100yen: 6.53,
    category: 'サラダ',
    is_active: true,
  },
  {
    store: 'lawson',
    name: '味付たまご 2個入',
    price: 159,
    protein: 12.4,
    fat: 9.8,
    carbs: 0.4,
    calories: 138,
    protein_per_100yen: 7.80,
    category: 'ゆで卵',
    is_active: true,
  },
  {
    store: 'lawson',
    name: 'プロテインバー チョコレート',
    price: 180,
    protein: 15.0,
    fat: 8.5,
    carbs: 15.0,
    calories: 198,
    protein_per_100yen: 8.33,
    category: 'プロテインバー',
    is_active: true,
  },
  {
    store: 'lawson',
    name: 'ザバス ミルクプロテイン バニラ',
    price: 183,
    protein: 15.0,
    fat: 0,
    carbs: 10.5,
    calories: 102,
    protein_per_100yen: 8.20,
    category: 'その他',
    is_active: true,
  },
  // ファミリーマート
  {
    store: 'familymart',
    name: 'グリルチキン プレーン',
    price: 258,
    protein: 27.0,
    fat: 2.5,
    carbs: 0.5,
    calories: 132,
    protein_per_100yen: 10.47,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'familymart',
    name: 'グリルチキン タンドリー',
    price: 258,
    protein: 26.5,
    fat: 3.0,
    carbs: 1.2,
    calories: 138,
    protein_per_100yen: 10.27,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'familymart',
    name: '半熟ゆでたまご 2個入',
    price: 156,
    protein: 12.6,
    fat: 9.6,
    carbs: 0.6,
    calories: 138,
    protein_per_100yen: 8.08,
    category: 'ゆで卵',
    is_active: true,
  },
  {
    store: 'familymart',
    name: 'RIZAP サラダチキンバー',
    price: 170,
    protein: 14.0,
    fat: 1.5,
    carbs: 1.0,
    calories: 72,
    protein_per_100yen: 8.24,
    category: 'サラダチキン',
    is_active: true,
  },
  {
    store: 'familymart',
    name: '全粒粉サンド たんぱく質が摂れるチキン',
    price: 368,
    protein: 24.0,
    fat: 12.0,
    carbs: 32.0,
    calories: 332,
    protein_per_100yen: 6.52,
    category: 'サラダ',
    is_active: true,
  },
]

async function seedData() {
  console.log('Seeding sample products...')

  const { data, error } = await supabase
    .from('products')
    .upsert(sampleProducts, { onConflict: 'name,store' })
    .select()

  if (error) {
    console.error('Error seeding data:', error)
    return
  }

  console.log(`Successfully inserted ${data?.length || 0} products`)
}

seedData()
