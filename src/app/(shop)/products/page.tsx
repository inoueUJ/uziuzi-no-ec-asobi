'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star, Grid3X3, List, Filter } from 'lucide-react'
import { useState } from 'react'

// 仮の商品データ（後でデータベースから取得）
const sampleProducts = [
  {
    id: 1,
    name: '手作りアクセサリー A',
    price: 3000,
    originalPrice: null,
    image: '/api/placeholder/300/300',
    category: 'アクセサリー',
    rating: 4.8,
    reviews: 24,
    isNew: true,
    stock: 3
  },
  {
    id: 2,
    name: 'ハンドメイド雑貨 B',
    price: 2500,
    originalPrice: 3000,
    image: '/api/placeholder/300/300',
    category: '雑貨',
    rating: 4.6,
    reviews: 18,
    isNew: false,
    stock: 1
  },
  {
    id: 3,
    name: 'オリジナル小物 C',
    price: 4200,
    originalPrice: null,
    image: '/api/placeholder/300/300',
    category: 'インテリア',
    rating: 5.0,
    reviews: 12,
    isNew: true,
    stock: 0
  },
  {
    id: 4,
    name: '天然石ブレスレット',
    price: 3800,
    originalPrice: null,
    image: '/api/placeholder/300/300',
    category: 'アクセサリー',
    rating: 4.9,
    reviews: 31,
    isNew: false,
    stock: 5
  },
  {
    id: 5,
    name: '木製キーホルダー',
    price: 1500,
    originalPrice: null,
    image: '/api/placeholder/300/300',
    category: '雑貨',
    rating: 4.7,
    reviews: 15,
    isNew: false,
    stock: 8
  },
  {
    id: 6,
    name: 'フェルト小物セット',
    price: 2800,
    originalPrice: 3200,
    image: '/api/placeholder/300/300',
    category: 'インテリア',
    rating: 4.5,
    reviews: 9,
    isNew: true,
    stock: 2
  }
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて')

  const categories = ['すべて', 'アクセサリー', '雑貨', 'インテリア']
  
  // カテゴリフィルタリング
  const filteredProducts = selectedCategory === 'すべて' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === selectedCategory)

  return (
    <div className="responsive-container py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
          商品一覧
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          心を込めて作ったハンドメイド作品をご覧ください
        </p>
      </div>

      {/* コントロールバー（フィルター・表示切替） */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`
                cursor-pointer btn-responsive text-xs lg:text-sm transition-all
                ${selectedCategory === category 
                  ? 'bg-[--color-handmade-primary] hover:bg-[--color-handmade-primary]/90 text-white border-[--color-handmade-primary]' 
                  : 'hover:bg-[--color-handmade-neutral] hover:border-[--color-handmade-primary] text-foreground'
                }
              `}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* 表示モード切替（PC のみ表示） */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">表示:</span>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="p-2"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setViewMode('list')}
            className="p-2"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 商品表示数 */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filteredProducts.length}件の商品が見つかりました
      </div>

      {/* 商品グリッド/リスト */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'product-grid' 
          : 'flex flex-col gap-4'
        }
      `}>
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`
              product-card group
              ${viewMode === 'list' ? 'flex-row p-4' : ''}
            `}
          >
            {/* 商品画像エリア */}
            <CardHeader className={`${viewMode === 'list' ? 'w-32 h-32 p-0 mr-4' : 'p-0'}`}>
              <div className="relative overflow-hidden rounded-lg">
                <div className={`
                  bg-[--color-handmade-neutral] flex items-center justify-center
                  ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'}
                `}>
                  <span className="text-muted-foreground text-sm">商品画像</span>
                </div>
                
                {/* バッジ */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-[--color-handmade-accent] hover:bg-[--color-handmade-accent]/90 text-xs">
                      NEW
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-[--color-handmade-danger] hover:bg-[--color-handmade-danger]/90 text-xs">
                      SALE
                    </Badge>
                  )}
                </div>

                {/* お気に入りボタン */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="
                    absolute top-2 right-2 w-8 h-8
                    opacity-0 group-hover:opacity-100 transition-opacity 
                    bg-white/90 hover:bg-white
                    lg:opacity-0 lg:group-hover:opacity-100
                  "
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* 在庫状況オーバーレイ */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                    <Badge variant="destructive" className="text-sm font-medium">
                      売り切れ
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            
            {/* 商品情報エリア */}
            <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
              <CardContent className={`${viewMode === 'list' ? 'p-0 pb-4' : 'p-4'}`}>
                <div className="space-y-2">
                  <CardTitle className="product-title text-foreground hover:text-[--color-handmade-primary] cursor-pointer transition-colors">
                    {product.name}
                  </CardTitle>
                  
                  <div className="text-sm text-muted-foreground">
                    {product.category}
                  </div>
                  
                  {/* 評価 */}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[--color-handmade-accent] text-[--color-handmade-accent]" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  {/* 価格 */}
                  <div className="flex items-center gap-2">
                    <span className="price-display">
                      ¥{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-muted-foreground">
                        ¥{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* 在庫表示 */}
                  {product.stock > 0 && product.stock <= 3 && (
                    <div className="text-sm font-medium" style={{ color: 'var(--color-handmade-warning)' }}>
                      残り{product.stock}個
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* ボタンエリア */}
              <CardFooter className={`${viewMode === 'list' ? 'p-0' : 'p-4 pt-0'}`}>
                <Button 
                  className={`
                    btn-responsive transition-all
                    ${viewMode === 'list' ? 'w-auto px-6' : 'w-full'}
                    ${product.stock === 0 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-[--color-handmade-primary] hover:bg-[--color-handmade-primary]/90 text-white'
                    }
                  `}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? (
                    "売り切れ"
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      カートに追加
                    </>
                  )}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      {/* 商品がない場合のメッセージ */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            選択されたカテゴリに商品がありません
          </div>
          <Button 
            variant="outline"
            onClick={() => setSelectedCategory('すべて')}
            className="border-[--color-handmade-primary] text-[--color-handmade-primary] hover:bg-[--color-handmade-primary]/10"
          >
            すべての商品を表示
          </Button>
        </div>
      )}

      {/* ページ下部の商品情報 */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          すべての商品は心を込めて手作りしています。<br className="sm:hidden" />
          在庫や配送についてご質問がございましたら、お気軽にお問い合わせください。
        </div>
      </div>
    </div>
  )
}