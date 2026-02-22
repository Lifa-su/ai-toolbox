import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TextProcessor from '@/components/TextProcessor'

export const metadata = {
  title: 'AI文本改写润色 - AI工具箱',
  description: '免费AI文本改写工具，智能润色你的中英文文本，让表达更专业、更流畅。',
}

export default function RewritePage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-10">
        <TextProcessor
          title="✍️ AI文本改写 / 润色"
          placeholder="在这里粘贴你想改写或润色的文本...&#10;&#10;支持中文和英文，AI会帮你优化表达、提升文采。"
          apiPath="/api/rewrite"
          buttonText="开始改写"
          resultLabel="改写结果"
        />
      </main>
      <Footer />
    </>
  )
}
