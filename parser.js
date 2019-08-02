const steamWorkshopUrlMatch = /https?:\/\/steamcommunity.com\/sharedfiles\/filedetails\/?\d*\/?\??[^\s]*/ig

exports.parseSteamUrls = function (text) {
  const matches = text.match(steamWorkshopUrlMatch)

  if (matches && matches.length > 0) {
    return matches
  }

  return []
}

exports.parseSteamId = function (text) {
  try {
    const url = new URL(text)

    const queryId = url.searchParams.get('id')
    if (queryId) {
      return parseInt(queryId, 10)
    }

    const idInPath = url.pathname.match(/\d+/g)
    if (idInPath && idInPath[0]) {
      return parseInt(idInPath[0], 10)
    }
  } catch (err) {
    console.log(`Tried to parse steam id from non url text: ${text}`)
  }

  return undefined
}
