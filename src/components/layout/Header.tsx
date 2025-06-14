'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X,
  Search,
  Package,
  MessageCircle
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // 仮のカート商品数（後でZustandから取得）
  const cartItemCount = 2

  // アクティブリンクの判定
  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  // ナビゲーションリンクの設定
  const navigationLinks = [
    { href: '/', label: 'ホーム', icon: null },
    { href: '/products', label: '商品一覧', icon: Package },
    { href: '/contact', label: 'お問い合わせ', icon: MessageCircle },
  ]

  const NavLink = ({ 
    href, 
    label, 
    icon: Icon, 
    mobile = false, 
    onClick 
  }: { 
    href: string
    label: string
    icon?: any
    mobile?: boolean
    onClick?: () => void
  }) => {
    const active = isActiveLink(href)
    
    return (
      <Link 
        href={href}
        onClick={onClick}
        className={`
          ${mobile 
            ? 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors' 
            : 'text-sm font-medium transition-colors'
          }
          ${active 
            ? mobile 
              ? 'bg-primary text-primary-foreground' 
              : 'text-primary border-b-2 border-primary' 
            : mobile
              ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
              : 'text-muted-foreground hover:text-primary'
          }
        `}
      >
        {mobile && Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* ロゴ部分 */}
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">
            My Handmade Shop
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* 右側のアクションボタン */}
        <div className="flex items-center space-x-2">
          
          {/* 検索ボタン（将来実装） */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">検索</span>
          </Button>

          {/* カートボタン */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
              <span className="sr-only">カート ({cartItemCount})</span>
            </Link>
          </Button>

          {/* ログインボタン */}
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">ログイン</span>
            </Link>
          </Button>

          {/* ログインボタン（デスクトップ用テキスト） */}
          <div className="hidden lg:block">
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          </div>

          {/* モバイルメニュー */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                
                {/* モバイルメニューヘッダー */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-primary">
                      My Handmade Shop
                    </span>
                  </div>
                </div>

                {/* ナビゲーションリンク */}
                <nav className="flex flex-col space-y-2 py-6">
                  {navigationLinks.map((link) => (
                    <NavLink 
                      key={link.href} 
                      {...link} 
                      mobile={true}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  ))}
                </nav>

                {/* アクションボタン */}
                <div className="space-y-3 pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      カート
                      {cartItemCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {cartItemCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      ログイン
                    </Link>
                  </Button>

                  <Button size="sm" className="w-full" asChild>
                    <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                      <Package className="mr-2 h-4 w-4" />
                      商品を見る
                    </Link>
                  </Button>
                </div>

                {/* フッター情報 */}
                <div className="mt-auto pt-6 border-t">
                  <div className="text-center text-sm text-muted-foreground">
                    <p>心を込めたハンドメイド作品</p>
                    <p className="mt-1">© 2024 My Handmade Shop</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}