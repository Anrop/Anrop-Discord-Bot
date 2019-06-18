// Read .env file
require('dotenv').config()

const Discord = require('discord.js')

const richEmbed = require('./richEmbed')
const parser = require('./parser')
const workshop = require('./workshop')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  // Ignore message created by the bot
  if (message.author.id === client.user.id) {
    return
  }

  const matches = parser.parseSteamUrls(message.content)

  if (!matches || !matches.length) {
    return
  }

  const ids = matches.map(match => parser.parseSteamId(match)).filter(id => id)

  if (!ids || !ids.length) {
    return
  }

  const uniqueIds = Array.from(new Set(ids))

  workshop.getWorkshopItems(uniqueIds)
    .then(workshopItems => workshopItems.filter(workshopItem => workshopItem))
    .then(workshopItems => {
      workshopItems.map(item => {
        const embed = richEmbed.workshopItem(item)
        message.channel.send(embed)
      })
    })
})

client.login(process.env.DISCORD_TOKEN)
