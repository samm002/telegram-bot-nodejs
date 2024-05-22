const TelegramBot = require('node-telegram-bot-api')
const commands = require('../libs/commands') // Command for Telegram Bot
const constants = require('../libs/constant') // Predefined Telegram Bot Message

const teleBot = new TelegramBot(token, options)
const prefix = '!'
const regexMessage = new RegExp(`^${prefix}gempa$`)

/*
teleBot.on('message', (callback) => {
  const id = callback.from.id
  // teleBot.sendPhoto(id, "https://i.ytimg.com/vi/n52WeEpC8A8/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDn29LeVPygGvzTRZRlz7thDmJjIQ")
  teleBot.sendMessage(id, callback.text) // send our message back
})
*/

teleBot.onText(regexMessage, async (callback) => {
  const id = callback.from.id
  const ENDPOINT_GEMPA_TERBARU = 'https://data.bmkg.go.id/DataMKG/TEWS/'
  
  const apiCall = await fetch(ENDPOINT_GEMPA_TERBARU + 'autogempa.json')
  const { 
    Infogempa: { 
        gempa: {
          Tanggal, Jam, Wilayah, Magnitude, Potensi, Kedalaman, Shakemap
      } 
    } 
  } = await apiCall.json()

  const imageGempa = ENDPOINT_GEMPA_TERBARU + Shakemap
  const resultText = `
Waktu: ${Tanggal} | ${Jam}
Wilayah: ${Wilayah}
Magnitudo: ${Magnitude}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
`
  teleBot.sendPhoto(id, imageGempa, {
    caption: resultText
  })
})