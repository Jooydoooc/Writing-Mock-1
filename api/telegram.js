// api/telegram.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, studentName, teacherName } = req.body;

    // Validate required fields
    if (!message || !studentName || !teacherName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Get Telegram bot token and chat ID from environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Telegram bot not configured' 
      });
    }

    // Format the message for Telegram (escape special characters)
    const formattedMessage = message
      .replace(/\./g, '\\\.')
      .replace(/\-/g, '\\-')
      .replace(/\!/g, '\\!')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\#/g, '\\#')
      .replace(/\+/g, '\\+');

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formattedMessage,
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error('Telegram API error:', telegramResult);
      return res.status(500).json({ 
        success: false, 
        error: telegramResult.description || 'Failed to send message to Telegram' 
      });
    }

    // Also log to console for debugging
    console.log('Telegram message sent successfully:', {
      studentName,
      teacherName,
      timestamp: new Date().toISOString(),
      messageLength: message.length
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent to Telegram successfully',
      messageId: telegramResult.result.message_id
    });

  } catch (error) {
    console.error('Error in Telegram API:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}
