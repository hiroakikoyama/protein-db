// マイバスケット（まいばすけっと）高タンパク商品データ投入スクリプト
// 使用方法: npx tsx scripts/seed-mybasket-products.ts
// 担当: CSO / 日付: 2026-04-01 / ステータス: 新規作成

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// マイバスケット（イオン系ミニスーパー）商品データ
// トップバリュPB商品を中心に、実在する商品情報をベースに作成
const mybasketProducts = [
  // ===========================================
  // サラダチキン
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ サラダチキン プレーン',
    price: 213,
    protein: 23.8,
    fat: 1.2,
    carbs: 0.5,
    calories: 108,
    fiber: 0,
    category: 'サラダチキン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ サラダチキン ハーブ',
    price: 213,
    protein: 23.0,
    fat: 1.5,
    carbs: 0.8,
    calories: 108,
    fiber: 0,
    category: 'サラダチキン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ サラダチキン スモークペッパー',
    price: 213,
    protein: 22.5,
    fat: 1.8,
    carbs: 1.0,
    calories: 110,
    fiber: 0,
    category: 'サラダチキン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ サラダチキン てりやき',
    price: 213,
    protein: 22.0,
    fat: 1.5,
    carbs: 3.5,
    calories: 116,
    fiber: 0,
    category: 'サラダチキン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ サラダチキンバー プレーン',
    price: 149,
    protein: 13.0,
    fat: 0.8,
    carbs: 0.5,
    calories: 61,
    fiber: 0,
    category: 'サラダチキン',
    is_available: true,
  },

  // ===========================================
  // プロテインドリンク
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'ザバス ミルクプロテイン ココア 200ml',
    price: 162,
    protein: 15.0,
    fat: 0,
    carbs: 10.4,
    calories: 102,
    fiber: 0,
    category: 'プロテインドリンク',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'ザバス ミルクプロテイン バニラ 200ml',
    price: 162,
    protein: 15.0,
    fat: 0,
    carbs: 10.5,
    calories: 102,
    fiber: 0,
    category: 'プロテインドリンク',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'ザバス ミルクプロテイン ストロベリー 200ml',
    price: 162,
    protein: 15.0,
    fat: 0,
    carbs: 10.5,
    calories: 102,
    fiber: 0,
    category: 'プロテインドリンク',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'inプロテイン ココア 240ml',
    price: 181,
    protein: 10.2,
    fat: 0.7,
    carbs: 17.5,
    calories: 118,
    fiber: 0,
    category: 'プロテインドリンク',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ プロテインウォーター レモン 500ml',
    price: 116,
    protein: 20.0,
    fat: 0,
    carbs: 0,
    calories: 80,
    fiber: 0,
    category: 'プロテインドリンク',
    is_available: true,
  },

  // ===========================================
  // プロテインバー
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'inバー プロテイン ベイクドチョコ',
    price: 173,
    protein: 16.2,
    fat: 10.6,
    carbs: 12.1,
    calories: 211,
    fiber: 0.9,
    category: 'プロテインバー',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'inバー プロテイン グラノーラ',
    price: 173,
    protein: 15.9,
    fat: 9.5,
    carbs: 14.8,
    calories: 210,
    fiber: 0.5,
    category: 'プロテインバー',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: '1本満足バー プロテインチョコ',
    price: 151,
    protein: 15.0,
    fat: 9.0,
    carbs: 11.0,
    calories: 185,
    fiber: 0.4,
    category: 'プロテインバー',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: '1本満足バー プロテインヨーグルト',
    price: 151,
    protein: 15.0,
    fat: 8.5,
    carbs: 12.0,
    calories: 183,
    fiber: 0.6,
    category: 'プロテインバー',
    is_available: true,
  },

  // ===========================================
  // ゆで卵
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 味付きたまご 2個入',
    price: 138,
    protein: 12.4,
    fat: 9.6,
    carbs: 0.6,
    calories: 136,
    fiber: 0,
    category: 'ゆで卵',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 半熟煮たまご 2個入',
    price: 149,
    protein: 12.0,
    fat: 9.2,
    carbs: 1.2,
    calories: 134,
    fiber: 0,
    category: 'ゆで卵',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 味付きゆでたまご 4個入',
    price: 213,
    protein: 24.8,
    fat: 19.2,
    carbs: 1.2,
    calories: 272,
    fiber: 0,
    category: 'ゆで卵',
    is_available: true,
  },

  // ===========================================
  // ヨーグルト
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ギリシャヨーグルト プレーン',
    price: 159,
    protein: 10.0,
    fat: 4.2,
    carbs: 4.5,
    calories: 96,
    fiber: 0,
    category: 'ヨーグルト',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ギリシャヨーグルト ブルーベリー',
    price: 159,
    protein: 9.5,
    fat: 3.8,
    carbs: 10.2,
    calories: 114,
    fiber: 0.3,
    category: 'ヨーグルト',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'オイコス 高タンパク質 プレーン 砂糖不使用',
    price: 181,
    protein: 10.1,
    fat: 0,
    carbs: 5.1,
    calories: 69,
    fiber: 0,
    category: 'ヨーグルト',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'オイコス 高タンパク質 ストロベリー',
    price: 181,
    protein: 10.0,
    fat: 0,
    carbs: 12.2,
    calories: 92,
    fiber: 0,
    category: 'ヨーグルト',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'パルテノ プレーン 砂糖不使用',
    price: 178,
    protein: 9.9,
    fat: 4.8,
    carbs: 4.2,
    calories: 100,
    fiber: 0,
    category: 'ヨーグルト',
    is_available: true,
  },

  // ===========================================
  // 豆腐
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 豆腐バー 和風だし',
    price: 105,
    protein: 10.5,
    fat: 4.0,
    carbs: 1.5,
    calories: 83,
    fiber: 0.2,
    category: '豆腐',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 豆腐バー 柚子胡椒',
    price: 105,
    protein: 10.2,
    fat: 4.2,
    carbs: 1.8,
    calories: 85,
    fiber: 0.2,
    category: '豆腐',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 豆腐バー バジル',
    price: 105,
    protein: 10.0,
    fat: 4.5,
    carbs: 2.0,
    calories: 88,
    fiber: 0.3,
    category: '豆腐',
    is_available: true,
  },

  // ===========================================
  // 魚
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 銀鮭の塩焼',
    price: 213,
    protein: 18.5,
    fat: 9.5,
    carbs: 0.2,
    calories: 160,
    fiber: 0,
    category: '魚',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ さばの塩焼',
    price: 213,
    protein: 20.0,
    fat: 16.5,
    carbs: 0.3,
    calories: 230,
    fiber: 0,
    category: '魚',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ さばの味噌煮',
    price: 213,
    protein: 18.5,
    fat: 14.0,
    carbs: 6.5,
    calories: 226,
    fiber: 0.1,
    category: '魚',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ほっけの塩焼',
    price: 267,
    protein: 21.0,
    fat: 12.0,
    carbs: 0.2,
    calories: 192,
    fiber: 0,
    category: '魚',
    is_available: true,
  },

  // ===========================================
  // 弁当
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ チキンステーキ弁当',
    price: 429,
    protein: 28.0,
    fat: 14.5,
    carbs: 62.0,
    calories: 495,
    fiber: 1.5,
    category: '弁当',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 鶏の照り焼き弁当',
    price: 397,
    protein: 25.0,
    fat: 12.0,
    carbs: 68.0,
    calories: 488,
    fiber: 1.2,
    category: '弁当',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ チキン南蛮弁当',
    price: 429,
    protein: 22.0,
    fat: 18.5,
    carbs: 72.0,
    calories: 548,
    fiber: 1.0,
    category: '弁当',
    is_available: true,
  },

  // ===========================================
  // おにぎり
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ おにぎり 鮭',
    price: 108,
    protein: 5.2,
    fat: 1.5,
    carbs: 36.0,
    calories: 178,
    fiber: 0.3,
    category: 'おにぎり',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ おにぎり ツナマヨ',
    price: 108,
    protein: 4.8,
    fat: 5.5,
    carbs: 35.0,
    calories: 210,
    fiber: 0.3,
    category: 'おにぎり',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ おにぎり 焼たらこ',
    price: 108,
    protein: 5.0,
    fat: 1.2,
    carbs: 36.5,
    calories: 177,
    fiber: 0.3,
    category: 'おにぎり',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 大きなおにぎり 鶏五目',
    price: 138,
    protein: 7.5,
    fat: 3.0,
    carbs: 48.0,
    calories: 250,
    fiber: 0.8,
    category: 'おにぎり',
    is_available: true,
  },

  // ===========================================
  // パン
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 糖質オフパン ブラン',
    price: 108,
    protein: 8.5,
    fat: 3.0,
    carbs: 7.2,
    calories: 96,
    fiber: 5.8,
    category: 'パン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ たんぱく質が摂れるチキンサンド',
    price: 298,
    protein: 22.0,
    fat: 12.5,
    carbs: 28.0,
    calories: 318,
    fiber: 1.2,
    category: 'パン',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 糖質オフ チョコクロワッサン',
    price: 118,
    protein: 5.5,
    fat: 9.5,
    carbs: 10.0,
    calories: 150,
    fiber: 4.2,
    category: 'パン',
    is_available: true,
  },

  // ===========================================
  // 惣菜
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 鶏むね肉のグリル',
    price: 321,
    protein: 24.0,
    fat: 5.5,
    carbs: 2.0,
    calories: 152,
    fiber: 0.1,
    category: '惣菜',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 肉だんご 黒酢あん',
    price: 213,
    protein: 12.0,
    fat: 10.5,
    carbs: 18.0,
    calories: 218,
    fiber: 0.3,
    category: '惣菜',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 鶏のから揚げ',
    price: 321,
    protein: 18.0,
    fat: 16.0,
    carbs: 10.0,
    calories: 258,
    fiber: 0.2,
    category: '惣菜',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ローストチキンレッグ',
    price: 429,
    protein: 26.5,
    fat: 12.0,
    carbs: 1.5,
    calories: 220,
    fiber: 0,
    category: '惣菜',
    is_available: true,
  },

  // ===========================================
  // ホットスナック
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ 若鶏もも唐揚げ 4個入',
    price: 213,
    protein: 15.5,
    fat: 14.0,
    carbs: 9.0,
    calories: 225,
    fiber: 0.2,
    category: 'ホットスナック',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ チキンナゲット 6個入',
    price: 192,
    protein: 12.0,
    fat: 12.5,
    carbs: 12.0,
    calories: 210,
    fiber: 0.3,
    category: 'ホットスナック',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ささみカツ',
    price: 149,
    protein: 16.0,
    fat: 8.5,
    carbs: 10.5,
    calories: 185,
    fiber: 0.4,
    category: 'ホットスナック',
    is_available: true,
  },

  // ===========================================
  // おつまみ
  // ===========================================
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ スモークささみ',
    price: 159,
    protein: 17.0,
    fat: 1.0,
    carbs: 0.5,
    calories: 79,
    fiber: 0,
    category: 'おつまみ',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ビーフジャーキー',
    price: 267,
    protein: 15.5,
    fat: 2.0,
    carbs: 7.5,
    calories: 110,
    fiber: 0,
    category: 'おつまみ',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ あたりめ',
    price: 267,
    protein: 52.0,
    fat: 3.5,
    carbs: 0.8,
    calories: 242,
    fiber: 0,
    category: 'おつまみ',
    is_available: true,
  },
  {
    store_name: 'mybasket',
    product_name: 'トップバリュ ほぐしチキン ブラックペッパー',
    price: 192,
    protein: 20.0,
    fat: 2.5,
    carbs: 1.0,
    calories: 106,
    fiber: 0,
    category: 'おつまみ',
    is_available: true,
  },
]

async function seedMybasketProducts() {
  console.log('=== マイバスケット商品データ投入開始 ===')
  console.log(`投入予定: ${mybasketProducts.length}件`)

  // insertのみ（既存データは削除しない）
  const { data, error } = await supabase
    .from('products')
    .insert(mybasketProducts)
    .select()

  if (error) {
    console.error('投入エラー:', error)
    return
  }

  console.log(`✅ ${data?.length || 0}件のマイバスケット商品を投入しました`)

  // カテゴリ別集計
  const categoryCounts: Record<string, number> = {}
  mybasketProducts.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
  })

  console.log('\n=== カテゴリ別商品数 ===')
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}件`)
    })

  // DB全体の店舗別集計
  const { data: allProducts } = await supabase
    .from('products')
    .select('store_name')
    .eq('is_available', true)

  if (allProducts) {
    const storeCounts: Record<string, number> = {}
    allProducts.forEach(p => {
      storeCounts[p.store_name] = (storeCounts[p.store_name] || 0) + 1
    })
    console.log('\n=== 全店舗 商品数 ===')
    Object.entries(storeCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([store, count]) => {
        console.log(`  ${store}: ${count}件`)
      })
    console.log(`\n合計: ${allProducts.length}件`)
  }
}

seedMybasketProducts()
