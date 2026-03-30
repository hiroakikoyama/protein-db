// Twitter自動投稿スクリプト
// GitHub Actionsから定期実行される

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { TwitterApi } from 'twitter-api-v2'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

const twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
})

const templates = [
  {
    name: 'daily_ranking',
    template: `【今日の高タンパクおすすめ】

{{product_name}}（{{store}}）

💪 タンパク質: {{protein}}g
💰 価格: ¥{{price}}
📊 100円あたり: {{protein_per_100yen}}g

筋トレ・ダイエットに最適！

#筋トレ飯 #高タンパク #コンビニ飯 #ダイエット
`,
  },
  {
    name: 'cost_performance',
    template: `【コスパ最強】100円で摂れるタンパク質量ランキング！

1位: {{product1}} ({{pp1}}g)
2位: {{product2}} ({{pp2}}g)
3位: {{product3}} ({{pp3}}g)

お財布に優しく筋肉にも優しい💪

詳しくは → protein-conveni.com

#筋トレ #プロテイン #コスパ
`,
  },
  {
    name: 'new_product',
    template: `【新着】{{store}}の新商品！

{{product_name}}

✅ {{protein}}gのタンパク質
✅ {{calories}}kcal
✅ ¥{{price}}

詳細はプロフィールのリンクから🔗

#コンビニ新商品 #高タンパク #筋トレ飯
`,
  },
]

const storeNames: Record<string, string> = {
  seven: 'セブン',
  lawson: 'ローソン',
  familymart: 'ファミマ',
}

async function getRandomProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('protein_per_100yen', { ascending: false })
    .limit(10)

  if (error || !data || data.length === 0) {
    throw new Error('No products found')
  }

  return data[Math.floor(Math.random() * data.length)]
}

async function getTopProducts(limit: number = 3) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('protein_per_100yen', { ascending: false })
    .limit(limit)

  if (error || !data) {
    throw new Error('Failed to fetch products')
  }

  return data
}

async function generateTweet(): Promise<string> {
  const hour = new Date().getUTCHours()
  const jstHour = (hour + 9) % 24

  let tweetContent: string

  // 時間帯によってテンプレートを変える
  if (jstHour === 8) {
    // 朝：コスパランキング
    const products = await getTopProducts(3)
    const template = templates.find((t) => t.name === 'cost_performance')!
    tweetContent = template.template
      .replace('{{product1}}', products[0].name)
      .replace('{{pp1}}', products[0].protein_per_100yen.toFixed(1))
      .replace('{{product2}}', products[1].name)
      .replace('{{pp2}}', products[1].protein_per_100yen.toFixed(1))
      .replace('{{product3}}', products[2].name)
      .replace('{{pp3}}', products[2].protein_per_100yen.toFixed(1))
  } else if (jstHour === 12) {
    // 昼：おすすめ商品
    const product = await getRandomProduct()
    const template = templates.find((t) => t.name === 'daily_ranking')!
    tweetContent = template.template
      .replace('{{product_name}}', product.name)
      .replace('{{store}}', storeNames[product.store])
      .replace('{{protein}}', product.protein.toString())
      .replace('{{price}}', product.price.toString())
      .replace('{{protein_per_100yen}}', product.protein_per_100yen.toFixed(1))
  } else {
    // 夜：AI生成のバリエーション
    const product = await getRandomProduct()
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 280,
      messages: [
        {
          role: 'user',
          content: `以下の商品についてTwitter投稿を作成してください。280文字以内で、絵文字を適度に使い、ハッシュタグを3-5個つけてください。

商品名: ${product.name}
店舗: ${storeNames[product.store]}
タンパク質: ${product.protein}g
価格: ¥${product.price}
カロリー: ${product.calories}kcal
100円あたりタンパク質: ${product.protein_per_100yen.toFixed(1)}g

サイトURL: protein-conveni.com`,
        },
      ],
    })
    tweetContent = (response.content[0] as { text: string }).text
  }

  return tweetContent
}

async function postTweet(content: string) {
  try {
    const tweet = await twitter.v2.tweet(content)
    console.log('Tweet posted:', tweet.data.id)

    // 投稿をDBに記録
    await supabase.from('posts').insert({
      platform: 'twitter',
      content: content,
      posted_at: new Date().toISOString(),
      impressions: 0,
      engagements: 0,
      clicks: 0,
    })

    return tweet
  } catch (error) {
    console.error('Failed to post tweet:', error)
    throw error
  }
}

async function main() {
  console.log('Generating tweet...')
  const content = await generateTweet()
  console.log('Tweet content:', content)

  console.log('Posting to Twitter...')
  await postTweet(content)
  console.log('Done!')
}

main().catch(console.error)
