import Link from 'next/link'
import { Heart, Mail, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      {/* メインフッターエリア */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* ショップ情報 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">My Handmade Shop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              一つ一つ心を込めて作った<br />
              ハンドメイド作品をお届けします。<br />
              あなたの日常に特別な彩りを。
            </p>
          </div>

          {/* ナビゲーションリンク */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">ショップ</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/products" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  商品一覧
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ショップについて
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート情報 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">サポート</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/shipping" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  配送について
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  返品・交換
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ・SNS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">つながる</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@myhandmade.shop</span>
              </div>
              
              {/* SNSリンク */}
              <div className="flex space-x-3">
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 My Handmade Shop. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made with <Heart className="inline h-3 w-3 text-red-500" /> in Japan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}