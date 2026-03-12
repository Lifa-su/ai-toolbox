import { NextResponse } from 'next/server'
import { callAI } from '@/lib/ai-config'

const LANG_MAP = {
  zh: '中文',
  en: '英文',
  ja: '日文',
  ko: '韩文',
}

export async function POST(req) {
  try {
    const { text, from, to } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入文本' }, { status: 400 })
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: '文本不能超过5000字' }, { status: 400 })
    }
    if (!to || !LANG_MAP[to]) {
      return NextResponse.json({ error: '请选择目标语言' }, { status: 400 })
    }

    const fromHint = from && LANG_MAP[from] ? `源语言是${LANG_MAP[from]}，` : '自动检测源语言，'
    const toName = LANG_MAP[to]

    const systemPrompt = `你是一个专业的翻译助手。${fromHint}请将用户提供的文本翻译为${toName}。要求：\n1. 翻译准确自然，符合目标语言的表达习惯\n2. 保持原文的语气和风格\n3. 专业术语翻译准确\n4. 只输出翻译结果，不要加任何解释说明`

    const { error, status, result } = await callAI(systemPrompt, text, { temperature: 0.3 })
    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json({ result })
  } catch (e) {
    console.error('Translate error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
