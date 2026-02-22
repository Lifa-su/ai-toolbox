import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MarkdownProcessor from '@/components/MarkdownProcessor'

export const metadata = {
  title: 'Markdown转公众号排版 - AI工具箱',
  description: '免费Markdown转微信公众号排版工具，一键生成带样式的公众号文章格式。',
}

export default function MarkdownPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-10">
        <MarkdownProcessor />
      </main>
      <Footer />
    </>
  )
}
