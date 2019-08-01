const steamWorkshopUrlMatch = /https?:\/\/steamcommunity.com\/sharedfiles\/filedetails\/?\d*\/?\??[^\s]*/ig

exports.parseSteamUrls = function (text) {
  const matches = text.match(steamWorkshopUrlMatch)

  if (matches && matches.length > 0) {
    return matches
  }

  return []
}

exports.parseSteamId = function (text) {
  const url = new URL(text)

  const queryId = url.searchParams.get('id')
  if (queryId) {
    return queryId
  }

  const idInPath = url.pathname.match(/\d+/g)
  if (idInPath && idInPath[0]) {
    return parseInt(idInPath[0], 10)
  }

  return undefined
}
