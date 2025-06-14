'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star, Grid3X3, List, Filter } from 'lucide-react'
import { useState } from 'react'

// 仮の商品データ（後でデータベースから取得）
const sampleProducts = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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


  return (
    <div className="responsive-container py-8">
    詳細ページ</div>
   
  )
}