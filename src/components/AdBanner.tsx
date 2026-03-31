'use client'

type AdBannerProps = {
  slot: 'header' | 'sidebar' | 'inline' | 'footer'
  className?: string
}

// アクセストレードの広告コードをここに設定
// 提携承認後、管理画面からリンクコードを取得して設定してください
const AD_CODES: Record<string, string> = {
  // プロテイン・サプリ系の広告（例：マイプロテイン等）
  header: '',
  sidebar: '',
  inline: '',
  footer: '',
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  const adCode = AD_CODES[slot]

  // 広告コードが設定されていない場合はおすすめ商品を表示
  if (!adCode) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">おすすめ</p>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            本格的にタンパク質を摂るなら
          </p>
          <p className="text-lg font-bold text-blue-600 mb-2">
            プロテインがコスパ最強
          </p>
          <p className="text-xs text-gray-500">
            コンビニ商品と比べてタンパク質1gあたり約1/3の価格
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`ad-banner ${className}`}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  )
}
