import { Button } from '@/components/ui/button'
import { Heart, Star, ShoppingBag } from 'lucide-react'

export const runtime = "edge"

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* ヒーローセクション */}
      <section className="container mx-auto max-w-6xl px-4 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            心を込めた
            <span className="text-primary"> ハンドメイド </span>
            作品
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            一つ一つ丁寧に作られた特別な作品をお届けします。
            あなたの日常に、温かい彩りを添えませんか？
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              商品を見る
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              <Heart className="mr-2 h-5 w-5" />
              ショップについて
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">なぜ選ばれるのか</h2>
            <p className="text-muted-foreground">私たちのハンドメイド作品の特徴</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">心を込めて</h3>
              <p className="text-muted-foreground">
                一つ一つ手作業で丁寧に作られた、世界に一つだけの作品です。
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">高品質素材</h3>
              <p className="text-muted-foreground">
                厳選された素材のみを使用し、長くお使いいただけます。
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">安心サポート</h3>
              <p className="text-muted-foreground">
                ご購入後のサポートも充実。安心してお買い物いただけます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}