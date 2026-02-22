import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TranslateProcessor from '@/components/TranslateProcessor'

export const metadata = {
  title: 'AI翻译 - AI工具箱',
  description: '免费AI翻译工具，支持中英日韩互译，AI驱动更自然准确的翻译结果。',
}

export default function TranslatePage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-10">
        <TranslateProcessor />
      </main>
      <Footer />
    </>
  )
}
