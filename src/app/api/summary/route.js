import { NextResponse } from 'next/server'
import { callAI } from '@/lib/ai-config'

const SYSTEM_PROMPT = '你是一个专业的文本摘要助手。请对用户提供的长文生成精炼的摘要，要求：\n1. 提取核心观点和关键信息\n2. 摘要长度控制在原文的20%-30%\n3. 保持逻辑清晰，语言简洁\n4. 如果是中文就用中文回复，英文就用英文回复\n5. 只输出摘要内容，不要加"摘要："等前缀'

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入文本' }, { status: 400 })
    }
    if (text.length > 10000) {
      return NextResponse.json({ error: '文本不能超过10000字' }, { status: 400 })
    }

    const { error, status, result } = await callAI(SYSTEM_PROMPT, text, { temperature: 0.3 })
    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json({ result })
  } catch (e) {
    console.error('Summary error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
