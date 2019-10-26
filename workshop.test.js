const nock = require('nock')

const workshop = require('./workshop')

const workshopItem = {
  result: 1,
  publishedfileid: '123456789',
  title: 'Test Item',
  description: 'Test Description',
  file_size: 2497726343,
  preview_url: 'https://steamuserimages-a.akamaihd.net/ugc/771731350770260808/7F462B6A7E1105EA13B257AA74B1193B1318708D/',
  time_created: 1482801740,
  time_updated: 1571851301
}

describe('getWorkshopItems', () => {
  beforeAll(() => {
    nock('https://api.steampowered.com')
      .post('/ISteamRemoteStorage/GetPublishedFileDetails/v1/', 'format=json&itemcount=1&publishedfileids%5B0%5D=123456789')
      .reply(200, {
        response: {
          result: 1,
          resultcount: 1,
          publishedfiledetails: [
            workshopItem
          ]
        }
      })
  })

  afterAll(() => {
    nock.cleanAll()
    nock.restore()
  })

  test('return workshop item', () => {
    expect.assertions(1)
    return expect(workshop.getWorkshopItems([123456789])).resolves.toEqual([workshopItem])
  })
})
