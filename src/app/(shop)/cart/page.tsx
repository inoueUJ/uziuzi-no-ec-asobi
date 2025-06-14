'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft,
  ShoppingBag,
  AlertCircle,
  Truck
} from 'lucide-react'

export const runtime = 'edge';

// 仮のカートデータ（後でZustandで管理）
interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  quantity: number
  maxStock: number
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: '手作りアクセサリー A',
    price: 3000,
    image: '/api/placeholder/100/100',
    category: 'アクセサリー',
    quantity: 2,
    maxStock: 3
  },
  {
    id: 2,
    name: 'ハンドメイド雑貨 B',
    price: 2500,
    originalPrice: 3000,
    image: '/api/placeholder/100/100',
    category: '雑貨',
    quantity: 1,
    maxStock: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  // 数量更新
  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(id)
    // 仮の処理時間
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxStock) } : item
      )
    )
    setIsUpdating(null)
  }

  // 商品削除
  const removeItem = async (id: number) => {
    setIsUpdating(id)
    await new Promise(resolve => setTimeout(resolve, 300))
    setCartItems(items => items.filter(item => item.id !== id))
    setIsUpdating(null)
  }

  // 合計計算
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 5000 ? 0 : 500
  const total = subtotal + shipping

  // 空のカート
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">カートは空です</h1>
          <p className="text-muted-foreground mb-6">
            素敵な商品を見つけて、カートに追加してみませんか？
          </p>
          <Button size="lg" asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              商品を見る
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              買い物を続ける
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">ショッピングカート</h1>
        <p className="text-muted-foreground">
          {cartItems.length}個の商品がカートに入っています
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* カート商品一覧 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 送料無料まであと... */}
          {shipping > 0 && (
            <Alert>
              <Truck className="h-4 w-4" />
              <AlertDescription>
                あと<strong>¥{(5000 - subtotal).toLocaleString()}</strong>で送料無料になります
              </AlertDescription>
            </Alert>
          )}

          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* 商品画像 */}
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">商品画像</span>
                  </div>

                  {/* 商品情報 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      
                      {/* 削除ボタン */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={isUpdating === item.id}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* 価格 */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">
                        ¥{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <>
                          <span className="text-sm line-through text-muted-foreground">
                            ¥{item.originalPrice.toLocaleString()}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            SALE
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* 数量コントロール & 小計 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">数量:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <div className="w-12 text-center">
                            {isUpdating === item.id ? (
                              <div className="text-sm">...</div>
                            ) : (
                              <span className="font-medium">{item.quantity}</span>
                            )}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock || isUpdating === item.id}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {item.quantity >= item.maxStock && (
                          <span className="text-xs text-orange-600">
                            在庫上限
                          </span>
                        )}
                      </div>

                      {/* 小計 */}
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 注文サマリー */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>注文内容</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>商品小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  送料
                  {shipping === 0 && (
                    <Badge variant="secondary" className="text-xs">
                      無料
                    </Badge>
                  )}
                </span>
                <span>¥{shipping.toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>合計</span>
                <span className="text-primary">¥{total.toLocaleString()}</span>
              </div>
              
              {shipping === 0 && (
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  送料無料
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  レジに進む
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/products">
                  買い物を続ける
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}