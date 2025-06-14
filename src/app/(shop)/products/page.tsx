import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'

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
  }
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">商品一覧</h1>
        <p className="text-muted-foreground">
          心を込めて作ったハンドメイド作品をご覧ください
        </p>
      </div>

      {/* カテゴリフィルター */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="cursor-pointer">
            すべて
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            アクセサリー
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            雑貨
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            インテリア
          </Badge>
        </div>
      </div>

      {/* 商品グリッド */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">商品画像</span>
                </div>
                
                {/* バッジ */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-red-500 hover:bg-red-600">NEW</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive">SALE</Badge>
                  )}
                </div>

                {/* お気に入りボタン */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* 在庫状況オーバーレイ */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">
                      売り切れ
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight hover:text-primary cursor-pointer">
                  {product.name}
                </CardTitle>
                
                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>
                
                {/* 評価 */}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                
                {/* 価格 */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
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
                  <div className="text-sm text-orange-600">
                    残り{product.stock}個
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                disabled={product.stock === 0}
                variant={product.stock === 0 ? "secondary" : "default"}
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
          </Card>
        ))}
      </div>

      {/* 商品がない場合のメッセージ */}
      {sampleProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            現在表示できる商品がありません
          </div>
          <Button variant="outline">商品を追加する</Button>
        </div>
      )}
    </div>
  )
}