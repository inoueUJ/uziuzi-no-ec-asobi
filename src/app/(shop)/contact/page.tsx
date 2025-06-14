'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Heart,
  Instagram,
  Twitter,
  MessageCircle
} from 'lucide-react'

export const runtime = 'edge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }

    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください'
    } else if (formData.message.length < 10) {
      newErrors.message = 'お問い合わせ内容は10文字以上で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // 仮の送信処理（後でAPI実装）
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('お問い合わせ送信:', formData)
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      })
    } catch (error) {
      console.error('送信エラー:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ご質問、ご要望、カスタムオーダーなど、<br />
          お気軽にお問い合わせください。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* お問い合わせフォーム */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
              <CardDescription>
                以下のフォームに必要事項をご記入の上、送信してください。
                通常24時間以内にご返信いたします。
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    お問い合わせを受け付けました
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ご連絡いただきありがとうございます。<br />
                    24時間以内にご返信させていただきます。
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    新しいお問い合わせをする
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* お名前 */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        お名前 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="山田 太郎"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* メールアドレス */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        メールアドレス <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* お問い合わせ種別 */}
                    <div className="space-y-2">
                      <Label>
                        お問い合わせ種別 <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="種別を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">商品について</SelectItem>
                          <SelectItem value="order">注文について</SelectItem>
                          <SelectItem value="shipping">配送について</SelectItem>
                          <SelectItem value="custom">カスタムオーダー</SelectItem>
                          <SelectItem value="wholesale">卸売について</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category}</p>
                      )}
                    </div>

                    {/* 件名 */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">件名</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="お問い合わせの件名"
                      />
                    </div>
                  </div>

                  {/* お問い合わせ内容 */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="お問い合わせ内容を詳しくお書きください..."
                      className={`min-h-32 ${errors.message ? 'border-red-500' : ''}`}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{errors.message || '10文字以上でご記入ください'}</span>
                      <span>{formData.message.length}/1000</span>
                    </div>
                  </div>

                  {/* 注意事項 */}
                  <Alert>
                    <MessageCircle className="h-4 w-4" />
                    <AlertDescription>
                      個人情報は適切に管理し、お問い合わせへのご返信以外の目的では使用いたしません。
                    </AlertDescription>
                  </Alert>

                  {/* 送信ボタン */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>処理中...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        お問い合わせを送信
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* サイドバー情報 */}
        <div className="space-y-6">
          {/* 連絡先情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                連絡先情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">メール</div>
                  <div className="text-sm text-muted-foreground">
                    hello@myhandmade.shop
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">返信時間</div>
                  <div className="text-sm text-muted-foreground">
                    通常24時間以内<br />
                    営業日: 月〜金（祝日除く）
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">所在地</div>
                  <div className="text-sm text-muted-foreground">
                    日本国内<br />
                    （詳細はお問い合わせください）
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SNS */}
          <Card>
            <CardHeader>
              <CardTitle>SNSでもつながりましょう</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                制作過程や新作情報を随時更新しています
              </p>
            </CardContent>
          </Card>

          {/* よくある質問 */}
          <Card>
            <CardHeader>
              <CardTitle>よくある質問</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium text-sm">配送について</div>
                <div className="text-sm text-muted-foreground">
                  全国一律500円、5,000円以上で送料無料
                </div>
              </div>
              <Separator />
              <div>
                <div className="font-medium text-sm">返品・交換</div>
                <div className="text-sm text-muted-foreground">
                  商品到着後7日以内、未使用品のみ対応
                </div>
              </div>
              <Separator />
              <div>
                <div className="font-medium text-sm">カスタムオーダー</div>
                <div className="text-sm text-muted-foreground">
                  お気軽にご相談ください
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}