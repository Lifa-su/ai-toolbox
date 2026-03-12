import { NextResponse } from 'next/server'
import { callAI } from '@/lib/ai-config'

const SYSTEM_PROMPT = '你是一个专业的文本改写助手。请对用户提供的文本进行改写润色，要求：\n1. 保持原意不变\n2. 优化表达，使语言更流畅、更专业\n3. 修正语法错误\n4. 如果是中文就用中文回复，英文就用英文回复\n5. 只输出改写后的文本，不要加任何解释说明'

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入文本' }, { status: 400 })
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: '文本不能超过5000字' }, { status: 400 })
    }

    const { error, status, result } = await callAI(SYSTEM_PROMPT, text)
    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json({ result })
  } catch (e) {
    console.error('Rewrite error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
