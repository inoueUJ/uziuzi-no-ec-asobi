// src/app/(shop)/products/[id]/page.tsx
'use client'

export const runtime = 'edge';

// 🌟 Next.js 15対応の型定義
interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 🌟 paramsを非同期で取得
  const { id } = await params;
  
  return (
    <div className="responsive-container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          商品詳細ページ
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">
            商品ID: <span className="font-mono text-blue-600">{id}</span>
          </p>
        </div>
      </div>
    </div>
  )
}