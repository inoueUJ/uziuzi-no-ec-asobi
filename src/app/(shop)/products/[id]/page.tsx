// app/products/[id]/page.tsx
'use client'

// 🌟 この1行を追加！
export const runtime = 'edge';

export default function ProductsPage() {
  return (
    <div className="responsive-container py-8">
      詳細ページ
    </div>
  )
}