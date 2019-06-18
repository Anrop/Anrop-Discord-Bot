const SteamWorkshop = require('steam-workshop')
const steamWorkshop = new SteamWorkshop()

exports.getWorkshopItems = function (ids) {
  return new Promise((resolve, reject) => {
    steamWorkshop.getPublishedFileDetails(ids, (err, files) => {
      if (err) {
        return reject(err)
      }

      return resolve(files)
    })
  })
}
