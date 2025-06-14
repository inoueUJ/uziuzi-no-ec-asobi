import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* ロゴ部分 */}
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">
            Uzi no asobi
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/products" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            商品一覧
          </Link>
          <Link 
            href="/categories" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            カテゴリ
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            ショップについて
          </Link>
        </nav>

        {/* 右側のアクションボタン */}
        <div className="flex items-center space-x-2">
          {/* カートボタン */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">カート</span>
            </Link>
          </Button>

          {/* ログインボタン */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">ログイン</span>
            </Link>
          </Button>

          {/* ログインボタン（デスクトップ用テキスト） */}
          <div className="hidden md:block">
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}