require('dotenv').config()
const TeleBot = require('./app/TeleBot')

const token = process.env.TELEGRAM_BOT_TOKEN
const option = {
  polling: true
}

const teleBot = new TeleBot(token, option)

teleBot.initialize()