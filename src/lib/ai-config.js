// AI Provider config - supports any OpenAI-compatible API
// Priority: specific provider vars > generic vars > defaults

export function getAIConfig() {
  // Generic OpenAI-compatible config (recommended)
  const apiKey = process.env.AI_API_KEY || process.env.DASHSCOPE_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY
  const baseUrl = process.env.AI_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  const model = process.env.AI_MODEL || 'qwen-plus'

  return { apiKey, baseUrl, model }
}

export async function callAI(systemPrompt, userContent, options = {}) {
  const { apiKey, baseUrl, model } = getAIConfig()

  if (!apiKey) {
    return { error: 'AI服务未配置，请设置API密钥', status: 503 }
  }

  const res = await fetch(baseUrl + '/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 2000,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('AI API error:', err)
    return { error: 'AI服务暂时不可用，请稍后重试', status: 502 }
  }

  const data = await res.json()
  const result = data.choices?.[0]?.message?.content?.trim()
  if (!result) {
    return { error: 'AI返回结果为空', status: 500 }
  }

  return { result }
}
