const Discord = require('discord.js')
const filesize = require('filesize')
const moment = require('moment')

const DESCRIPTION_LENGTH_LIMIT = 100
const DESCRIPTION_ELLIPSIZE = '...'

const formatDescription = (description) => {
  if (description.length <= DESCRIPTION_LENGTH_LIMIT + DESCRIPTION_ELLIPSIZE.length) {
    return description
  }

  return description.substring(0, DESCRIPTION_LENGTH_LIMIT) + DESCRIPTION_ELLIPSIZE
}

const formatTimestamp = (timestamp) => {
  return moment(timestamp * 1000).format('YYYY-MM-DD')
}

exports.workshopItem = (item) => {
  const {
    title,
    description,
    preview_url: thumbnail,
    publishedfileid: id,
    file_size: size,
    time_updated: updated
  } = item

  const url = `https://steamcommunity.com/sharedfiles/filedetails/${id}`
  const formattedSize = filesize(size)

  return new Discord.RichEmbed()
    .setTitle(title)
    .setURL(url)
    .setThumbnail(thumbnail)
    .setDescription(formatDescription(description))
    .addField('Size', formattedSize, true)
    .addField('Last Updated', formatTimestamp(updated), true)
}
