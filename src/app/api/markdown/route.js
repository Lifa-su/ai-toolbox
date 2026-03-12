import { NextResponse } from 'next/server'
import { callAI } from '@/lib/ai-config'

const SYSTEM_PROMPT = `你是一个Markdown转微信公众号排版的专家。请将用户提供的Markdown内容转换为适合微信公众号编辑器的HTML，要求：
1. 所有样式必须使用内联style，不能用class（微信编辑器不支持）
2. 整体字体使用 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
3. 正文字号15px，行高1.8，颜色#333
4. 标题使用渐变色或醒目颜色，h1用22px加粗，h2用18px加粗，h3用16px加粗
5. 代码块使用浅灰背景(#f6f8fa)，圆角，等宽字体，padding: 12px 16px
6. 行内代码用浅红背景(#fff5f5)，红色文字(#c7254e)，圆角
7. 引用块左边框用蓝色(#4285f4)，背景浅灰(#f8f9fa)
8. 列表项间距适当，有序列表和无序列表都要处理
9. 链接用蓝色(#576b95)，这是微信链接的标准色
10. 图片设置max-width:100%
11. 加粗文字用深色(#1a1a1a)
12. 段落间距用margin: 16px 0
13. 只输出HTML代码，不要包含\`\`\`html标记，不要加任何解释`

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入Markdown内容' }, { status: 400 })
    }
    if (text.length > 20000) {
      return NextResponse.json({ error: '内容不能超过20000字' }, { status: 400 })
    }

    const { error, status, result } = await callAI(SYSTEM_PROMPT, text, { temperature: 0.2, maxTokens: 4000 })
    if (error) {
      return NextResponse.json({ error }, { status })
    }

    // Strip markdown code fences if AI included them
    const cleaned = result.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '')

    return NextResponse.json({ result: cleaned })
  } catch (e) {
    console.error('Markdown error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
