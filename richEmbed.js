const Discord = require('discord.js')
const filesize = require('filesize')
const moment = require('moment')

const formatTimestamp = (timestamp) => {
  return moment(timestamp * 1000).format('YYYY-MM-DD')
}

exports.workshopItem = (item) => {
  const {
    title,
    description,
    preview_url: thumbnail,
    publishedfileid: id,
    subscriptions,
    favorited,
    views,
    file_size: size,
    time_created: created,
    time_updated: updated
  } = item

  const url = `https://steamcommunity.com/sharedfiles/filedetails/${id}`
  const formattedSize = filesize(size)

  return new Discord.RichEmbed()
    .setTitle(title)
    .setURL(url)
    .setThumbnail(thumbnail)
    .setDescription(description)
    .addField('Size', formattedSize, true)
    .addField('Subscriptions', subscriptions, true)
    .addField('Favorited', favorited, true)
    .addField('Views', views, true)
    .addField('Initial Upload', formatTimestamp(created), true)
    .addField('Last Updated', formatTimestamp(updated), true)
}
