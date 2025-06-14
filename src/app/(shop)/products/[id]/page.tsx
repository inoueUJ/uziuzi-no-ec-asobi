export const runtime = 'edge';

export default function ProductPage() {
  return (
    <div className="responsive-container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          商品詳細ページ
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">
            Phase 2で商品データを表示予定
          </p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              ✅ Phase 1: Edge Runtime設定完了<br/>
              🔄 Phase 2: 実際の商品ID表示機能を実装予定
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}