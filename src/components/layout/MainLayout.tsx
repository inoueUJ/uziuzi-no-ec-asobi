import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <Header />
      
      {/* メインコンテンツエリア */}
      <main className="flex-1 w-full">
        {children}
      </main>
      
      {/* フッター */}
      <Footer />
    </div>
  )
}