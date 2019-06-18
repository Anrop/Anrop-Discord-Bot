const Url = require('url')

const steamWorkshopUrlMatch = /https?:\/\/steamcommunity.com\/sharedfiles\/filedetails\/?\d*\/?\??[^\s]*/ig

exports.parseSteamUrls = function (text) {
  const matches = text.match(steamWorkshopUrlMatch)

  if (matches && matches.length > 0) {
    return matches
  }

  return []
}

exports.parseSteamId = function (text) {
  const url = Url.parse(text, true)

  if (url.query.id) {
    return parseInt(url.query.id)
  }

  const idInPath = url.pathname.match(/\d+/g)
  if (idInPath && idInPath[0]) {
    return parseInt(idInPath[0], 10)
  }

  return undefined
}
