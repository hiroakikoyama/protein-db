// 自己改善AIシステム
// 週次でパフォーマンスを分析し、自動で最適化を行う

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

interface PerformanceMetrics {
  totalImpressions: number
  totalEngagements: number
  avgEngagementRate: number
  topPerformingPosts: Array<{
    content: string
    engagements: number
    impressions: number
  }>
  lowPerformingPosts: Array<{
    content: string
    engagements: number
    impressions: number
  }>
}

interface OptimizationAction {
  type: 'posting_time' | 'template' | 'hashtag' | 'content_style'
  previousValue: string
  newValue: string
  reasoning: string
}

// 過去7日間のパフォーマンスを取得
async function getWeeklyPerformance(): Promise<PerformanceMetrics> {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .gte('posted_at', oneWeekAgo.toISOString())
    .order('engagements', { ascending: false })

  if (error || !posts) {
    throw new Error('Failed to fetch posts')
  }

  const totalImpressions = posts.reduce((sum, p) => sum + (p.impressions || 0), 0)
  const totalEngagements = posts.reduce((sum, p) => sum + (p.engagements || 0), 0)
  const avgEngagementRate = totalImpressions > 0 ? (totalEngagements / totalImpressions) * 100 : 0

  return {
    totalImpressions,
    totalEngagements,
    avgEngagementRate,
    topPerformingPosts: posts.slice(0, 3).map((p) => ({
      content: p.content,
      engagements: p.engagements || 0,
      impressions: p.impressions || 0,
    })),
    lowPerformingPosts: posts.slice(-3).map((p) => ({
      content: p.content,
      engagements: p.engagements || 0,
      impressions: p.impressions || 0,
    })),
  }
}

// AIによる最適化提案を取得
async function getOptimizationSuggestions(
  metrics: PerformanceMetrics
): Promise<OptimizationAction[]> {
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `あなたはSNSマーケティングの専門家です。以下のTwitterアカウントのパフォーマンスデータを分析し、改善提案をJSON形式で出力してください。

## パフォーマンスデータ
- 総インプレッション: ${metrics.totalImpressions}
- 総エンゲージメント: ${metrics.totalEngagements}
- 平均エンゲージメント率: ${metrics.avgEngagementRate.toFixed(2)}%

## 高パフォーマンス投稿
${metrics.topPerformingPosts.map((p) => `- "${p.content.substring(0, 100)}..." (エンゲージメント: ${p.engagements})`).join('\n')}

## 低パフォーマンス投稿
${metrics.lowPerformingPosts.map((p) => `- "${p.content.substring(0, 100)}..." (エンゲージメント: ${p.engagements})`).join('\n')}

## 出力形式（JSON配列）
[
  {
    "type": "posting_time" | "template" | "hashtag" | "content_style",
    "previousValue": "現在の設定",
    "newValue": "推奨する新しい設定",
    "reasoning": "変更理由"
  }
]

1〜3個の具体的な改善アクションを提案してください。`,
      },
    ],
  })

  const text = (response.content[0] as { text: string }).text

  // JSONを抽出
  const jsonMatch = text.match(/\[[\s\S]*\]/)
  if (!jsonMatch) {
    console.log('No JSON found in response, returning empty array')
    return []
  }

  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    console.error('Failed to parse JSON:', jsonMatch[0])
    return []
  }
}

// 最適化アクションを記録
async function logOptimization(action: OptimizationAction) {
  const { error } = await supabase.from('optimization_log').insert({
    optimization_type: action.type,
    previous_value: { value: action.previousValue },
    new_value: { value: action.newValue },
    trigger_metric: 'weekly_analysis',
    reasoning: action.reasoning,
    auto_approved: true,
  })

  if (error) {
    console.error('Failed to log optimization:', error)
  }
}

// メトリクスをチェックして自動アクションを実行
async function checkThresholdsAndAct(metrics: PerformanceMetrics) {
  const thresholds = {
    minEngagementRate: 2.0, // 2%未満で警告
    criticalEngagementRate: 0.5, // 0.5%未満で緊急対応
  }

  if (metrics.avgEngagementRate < thresholds.criticalEngagementRate) {
    console.log('⚠️ CRITICAL: Engagement rate below 0.5%')
    // 緊急アクション: 投稿頻度を下げる、コンテンツ見直し
    await logOptimization({
      type: 'content_style',
      previousValue: 'current',
      newValue: 'review_needed',
      reasoning: `エンゲージメント率が${metrics.avgEngagementRate.toFixed(2)}%と危機的水準。コンテンツ戦略の見直しが必要。`,
    })
  } else if (metrics.avgEngagementRate < thresholds.minEngagementRate) {
    console.log('⚠️ WARNING: Engagement rate below 2%')
    // 警告アクション
    await logOptimization({
      type: 'template',
      previousValue: 'current',
      newValue: 'optimize_templates',
      reasoning: `エンゲージメント率が${metrics.avgEngagementRate.toFixed(2)}%。テンプレートの最適化を推奨。`,
    })
  }
}

async function main() {
  console.log('🤖 Starting weekly AI optimization...')
  console.log('='.repeat(50))

  // 1. パフォーマンスデータを取得
  console.log('\n📊 Fetching weekly performance...')
  const metrics = await getWeeklyPerformance()
  console.log(`Total Impressions: ${metrics.totalImpressions}`)
  console.log(`Total Engagements: ${metrics.totalEngagements}`)
  console.log(`Avg Engagement Rate: ${metrics.avgEngagementRate.toFixed(2)}%`)

  // 2. 閾値チェック
  console.log('\n🔍 Checking thresholds...')
  await checkThresholdsAndAct(metrics)

  // 3. AI最適化提案を取得
  console.log('\n🧠 Getting AI optimization suggestions...')
  const suggestions = await getOptimizationSuggestions(metrics)
  console.log(`Got ${suggestions.length} suggestions`)

  // 4. 提案を記録
  for (const suggestion of suggestions) {
    console.log(`\n📝 Logging optimization: ${suggestion.type}`)
    console.log(`  - Previous: ${suggestion.previousValue}`)
    console.log(`  - New: ${suggestion.newValue}`)
    console.log(`  - Reason: ${suggestion.reasoning}`)
    await logOptimization(suggestion)
  }

  console.log('\n✅ Weekly optimization complete!')
}

main().catch(console.error)
