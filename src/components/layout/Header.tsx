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
            ? 'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]' 
            : 'text-sm font-medium transition-colors px-2 py-1 rounded-md'
          }
          ${active 
            ? mobile 
              ? 'bg-[--color-handmade-primary] text-white' 
              : 'text-[--color-handmade-primary] bg-[--color-handmade-neutral]' 
            : mobile
              ? 'text-muted-foreground hover:text-foreground hover:bg-[--color-handmade-neutral]'
              : 'text-muted-foreground hover:text-[--color-handmade-primary] hover:bg-[--color-handmade-neutral]'
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
      <div className="responsive-container flex h-16 items-center justify-between">
        
        {/* ロゴ部分 */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Heart className="h-6 w-6" style={{ color: 'var(--color-handmade-primary)' }} />
          <span className="text-lg lg:text-xl font-bold" style={{ color: 'var(--color-handmade-primary)' }}>
            My Handmade Shop
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* 右側のアクションボタン */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          
          {/* 検索ボタン（将来実装） */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex btn-responsive hover:bg-[--color-handmade-neutral]"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">検索</span>
          </Button>

          {/* カートボタン - モバイルで常時表示強化 */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="relative btn-responsive hover:bg-[--color-handmade-neutral] transition-colors"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs font-bold border-2 border-background"
                  style={{ 
                    backgroundColor: 'var(--color-handmade-accent)', 
                    color: 'white'
                  }}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
              <span className="sr-only">カート ({cartItemCount})</span>
            </Link>
          </Button>

          {/* モバイル用カート金額表示 */}
          <div className="sm:hidden text-xs text-muted-foreground">
            {cartItemCount > 0 && (
              <div className="text-center">
                <div className="font-medium" style={{ color: 'var(--color-handmade-primary)' }}>
                  ¥8,500
                </div>
              </div>
            )}
          </div>

          {/* ログインボタン */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hidden sm:flex btn-responsive hover:bg-[--color-handmade-neutral]"
          >
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">ログイン</span>
            </Link>
          </Button>

          {/* ログインボタン（デスクトップ用テキスト） */}
          <div className="hidden lg:block">
            <Button 
              variant="outline" 
              asChild
              className="border-[--color-handmade-primary] text-[--color-handmade-primary] hover:bg-[--color-handmade-primary] hover:text-white transition-colors"
            >
              <Link href="/login">ログイン</Link>
            </Button>
          </div>

          {/* モバイルメニュー */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden btn-responsive hover:bg-[--color-handmade-neutral]"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-80 sm:w-96">
              <div className="flex flex-col h-full">
                
                {/* モバイルメニューヘッダー */}
                <div className="flex items-center justify-between pb-6 border-b">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-6 w-6" style={{ color: 'var(--color-handmade-primary)' }} />
                    <span className="text-lg font-bold" style={{ color: 'var(--color-handmade-primary)' }}>
                      My Handmade Shop
                    </span>
                  </div>
                </div>

                {/* カート情報表示（モバイルメニュー内） */}
                {cartItemCount > 0 && (
                  <div className="py-4 px-4 rounded-lg bg-[--color-handmade-neutral] mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" style={{ color: 'var(--color-handmade-primary)' }} />
                        <span className="text-sm font-medium">カート内商品</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ color: 'var(--color-handmade-primary)' }}>
                          {cartItemCount}点
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ¥8,500
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start btn-responsive border-[--color-handmade-primary] text-[--color-handmade-primary] hover:bg-[--color-handmade-primary] hover:text-white" 
                    asChild
                  >
                    <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      カート
                      {cartItemCount > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto"
                          style={{ backgroundColor: 'var(--color-handmade-accent)', color: 'white' }}
                        >
                          {cartItemCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start btn-responsive border-[--color-handmade-secondary] text-[--color-handmade-secondary] hover:bg-[--color-handmade-secondary] hover:text-white" 
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      ログイン
                    </Link>
                  </Button>

                  <Button 
                    size="sm" 
                    className="w-full btn-responsive text-white" 
                    style={{ backgroundColor: 'var(--color-handmade-primary)' }}
                    asChild
                  >
                    <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                      <Package className="mr-2 h-4 w-4" />
                      商品を見る
                    </Link>
                  </Button>
                </div>

                {/* フッター情報 */}
                <div className="mt-auto pt-6 border-t">
                  <div className="text-center text-sm text-muted-foreground">
                    <p className="font-medium" style={{ color: 'var(--color-handmade-primary)' }}>
                      心を込めたハンドメイド作品
                    </p>
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