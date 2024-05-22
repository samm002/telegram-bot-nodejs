// Regex rule for telegram bot commands
const prefix = '!'
const commands = {
  follow: new RegExp(`^${prefix}follow (.+)`),
  greeting: new RegExp(`^(${prefix}halo|${prefix}hi)$`),
  help: new RegExp(`^${prefix}help$`),
  gempa: new RegExp(`^${prefix}gempa$`),
  news: new RegExp(`^${prefix}news$`),
  quote: new RegExp(`^${prefix}quote$`),
}

module.exports = commands