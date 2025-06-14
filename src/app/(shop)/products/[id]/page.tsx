// app/products/[id]/page.tsx
'use client'

// 🌟 重要：この行を追加
export const runtime = 'edge';

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="responsive-container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          商品詳細ページ
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">
            商品ID: <span className="font-mono text-blue-600">{params.id}</span>
          </p>
          <div className="mt-4">
            <p className="text-gray-500">
              Phase 2でデータベース連携を実装予定
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}