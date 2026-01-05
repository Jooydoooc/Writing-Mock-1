# IELTS Writing Test Platform

A secure, anti-cheating IELTS Writing Test platform with Telegram integration for automatic submission notifications.

## Features

- Secure test environment with anti-cheating measures
- Real-time timer and violation tracking
- Automatic Telegram notifications
- PDF download of submissions
- Teacher/student management
- Tab switching detection
- Typing pattern monitoring

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow instructions
3. Save the bot token you receive

### 2. Get Your Chat ID

1. Start a chat with your bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for `"chat":{"id":<YOUR_CHAT_ID>}` in the response

### 3. Deploy to Vercel

**Option A: Deploy with Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
