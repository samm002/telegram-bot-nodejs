const TelegramBot = require('node-telegram-bot-api')
const commands = require('../libs/commands') // Command for Telegram Bot
const constants = require('../libs/constants') // Predefined Telegram Bot Message
const { helpMessage, invalidCommandMessage, earthQuakeInfoMessage } = require('../libs/constants')

class TeleBot extends TelegramBot {
  constructor(token, options) {
    super(token, options)
  }

  receiveMessage() {
    this.on('message', (data) => {
      const id = data.from.id
      const validCommand = Object.values(commands).some(keyword => keyword.test(data.text)) // check command is exist/valid
      
      if (!validCommand) {
        console.log(`Invalid command "${data.text}" by ${data.from.username}`)
        this.sendMessage(id, invalidCommandMessage(data.text), {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Panduan Pengguna',
                  callback_data: 'go_to_help'
                }
              ]
            ]
          }
        })
      }

      this.on('callback_query', (callback) => {
        const callbackType = callback.data
        if (callbackType == 'go_to_help') {
          this.sendMessage(callback.from.id, helpMessage)
        }
      })
    })
  }

  getHelp() {
    this.onText(commands.help, (data) => {
      const id = data.from.id
      console.log(`getHelp by ${data.from.username}`)
      this.sendMessage(id, helpMessage)
    })
  }

  // Not Working
  getSticker() {
    this.on('sticker', (data) => {
      const id = data.from.id
      console.log(`getSticker by ${data.from.username}`)
      this.sendMessage(id, data.sticker.emoji)
    })
  }

  getGreeting() {
    this.onText(commands.greeting, (data) => {
      const id = data.from.id
      const greet = data.text.replace('!','')
      console.log(`getGreeting by ${data.from.username}`)
      this.sendMessage(id, `${greet} juga ${data.from.username}!`)
    })
  }

  getUserMessage() {
    this.onText(commands.follow, (data, message) => {
      const id = data.from.id
      console.log(`getUserMessage by ${data.from.username}`)
      this.sendMessage(id, `kamu mengetikkan : ${message[1]}`)
    })
  }

  getQuotes() {
    this.onText(commands.quote, async (data) => {
      const id = data.from.id
      console.log(`getQuotes by ${data.from.username}`)

      const endpointRandomQuote = 'https://api.kanye.rest/'
      try {
        const apiCall = await fetch(endpointRandomQuote)
        const { quote } = await apiCall.json()
        this.sendMessage(id, quote)
      } catch (error) {
        console.error(error)
        this.sendMessage(id, 'maaf ada kesalahan dalam menampilkan quote, mohon ulangi kembali')
      }
    })
  }

  getNews() {
    this.onText(commands.news, async (data) => {
      const id = data.from.id
      console.log(`getNews by ${data.from.username}`)

      const endpointNews = "https://jakpost.vercel.app/api/category/indonesia"
      this.sendMessage(id, 'Mohon tunggu sebentar, sedang memuat berita...')
      try {
        const apiCall = await fetch(endpointNews)
        const response = await apiCall.json()
        const totalNews = 3

        for (let i = 0; i < totalNews; i++) {
          const news = response.posts[i]
          const { title, image, headline, link } = news
          const accesibleLink = link.replace('https://jakpost.vercel.app/api/detailpost', 'https://www.thejakartapost.com') + '.html'
          this.sendPhoto(id, image, { 
            caption: `${title}\n\n${headline}\n\nBaca Selengkapnya : ${accesibleLink}`
          })
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  getEarthQuakeInfo() {
    this.onText(commands.gempa, async (data) => {
      const id = data.from.id
      console.log(`getEarthQuakeInfo by ${data.from.username}`)
      
      const endpointEarthquakeBMKG = 'https://data.bmkg.go.id/DataMKG/TEWS/'
      const apiCall = await fetch(endpointEarthquakeBMKG + 'autogempa.json')
      const response = await apiCall.json()
      const { gempa } = response.Infogempa

      const imageGempa = endpointEarthquakeBMKG + gempa.Shakemap
      this.sendPhoto(id, imageGempa, {
        caption: earthQuakeInfoMessage(gempa)
      })
    })
  }
  
  initialize() {
    console.log('Initializing Telegram Bot...')
    this.receiveMessage()
    this.getHelp()
    this.getSticker()
    this.getGreeting()
    this.getUserMessage()
    this.getQuotes()
    this.getNews()
    this.getEarthQuakeInfo()
    console.log('Telegrom Bot is Ready to Use!')
  }
}

module.exports = TeleBot