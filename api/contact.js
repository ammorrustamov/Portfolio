const getJsonBody = (request) => {
  if (!request.body) return null
  return typeof request.body === 'string' ? JSON.parse(request.body) : request.body
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = getJsonBody(request)
  } catch {
    return response.status(400).json({ error: 'Invalid request body' })
  }

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const telegramUsername = body?.telegramUsername?.trim()
  const message = body?.message?.trim()

  if (!name || name.length > 100 || !email || email.length > 254 || !telegramUsername || telegramUsername.length > 100 || !message || message.length > 3000) {
    return response.status(400).json({ error: 'Please provide valid contact details.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return response.status(503).json({ error: 'Contact service is not configured.' })
  }

  const telegramMessage = [
    'New portfolio message:',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Telegram: ${telegramUsername}`,
    `Message: ${message}`
  ].join('\n')

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: telegramMessage })
    })

    if (!telegramResponse.ok) {
      return response.status(502).json({ error: 'Message delivery failed.' })
    }

    return response.status(200).json({ success: true })
  } catch {
    return response.status(502).json({ error: 'Message delivery failed.' })
  }
}
