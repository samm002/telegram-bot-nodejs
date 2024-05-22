const helpMessage = 
`
PANDUAN PENGGUNAAN BOT TELEGRAM

Selamat datang di Bot Telegram! 
Bot ini dapat berinteraksi dengan menggunakan perintah berikut :

----------

!help  -> Menampilkan panduan penggunaan bot
!quote -> Menampilkan quotes / kutipan secara random
!news  -> Menampilkan berita terkini dari media
!gempa -> Menampilkan info berita terbaru dari BMKG
!follow (spasi) [pesan] -> Bot akan Menampilkan pesan yang kamu kirim
!halo / !hai    -> untuk menyapa bot dengan ramah

----------

Enjoy!
`

const invalidCommandMessage = (command) => `Mohon maaf command "${command}" tidak tersedia😔`

const earthQuakeInfoMessage = (info) => {
  const { Tanggal, Jam, Wilayah, Magnitude, Potensi, Kedalaman, Shakemap } = info;
  
  earthQuakeInfo = 
`
Info Gempa Bumi Terbaru

Tanggal : ${Tanggal}
Jam : ${Jam}
Wilayah: ${Wilayah}
Magnitudo: ${Magnitude}
Kedalaman: ${Kedalaman}
Potensi: ${Potensi}
`

  return earthQuakeInfo
} 
const globalErrorMessage = ''
const globalSuccessMessage = ''
const pollingErrorMessage = ''

module.exports = {
  helpMessage,
  invalidCommandMessage,
  earthQuakeInfoMessage
}