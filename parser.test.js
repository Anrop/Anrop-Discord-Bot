const { parseSteamId, parseSteamUrls } = require('./parser')

const sharedFilesUrlWithPathId = 'https://steamcommunity.com/sharedfiles/filedetails/123456789'
const sharedFilesUrlWithQueryId = 'https://steamcommunity.com/sharedfiles/filedetails/?id=123456789'
const workshopUrlWithPathId = 'https://steamcommunity.com/workshop/filedetails/123456789'
const workshopUrlWithQueryId = 'https://steamcommunity.com/workshop/filedetails/?id=123456789'

describe('parseSteamId', () => {
  test('return undefined for non url', () => {
    expect(parseSteamId('hello world!')).toStrictEqual(undefined)
  })

  test('return undefined for non matching url', () => {
    expect(parseSteamId('https://store.steampowered.com')).toStrictEqual(undefined)
  })

  test('return id in url with path id', () => {
    expect(parseSteamId(sharedFilesUrlWithPathId)).toStrictEqual(123456789)
  })

  test('return id in url with path id', () => {
    expect(parseSteamId(sharedFilesUrlWithQueryId)).toStrictEqual(123456789)
  })
})

describe('parseSteamUrls', () => {
  test('return empty array for non url', () => {
    expect(parseSteamUrls('hello world!')).toStrictEqual([])
  })

  test('return empty array for non matching url', () => {
    expect(parseSteamUrls('https://store.steampowered.com')).toStrictEqual([])
  })

  test('return array with url when entire message is the shared files url with path id', () => {
    expect(parseSteamUrls(sharedFilesUrlWithPathId)).toStrictEqual([sharedFilesUrlWithPathId])
  })

  test('return array with url when entire message is the shared files url with query id', () => {
    expect(parseSteamUrls(sharedFilesUrlWithQueryId)).toStrictEqual([sharedFilesUrlWithQueryId])
  })

  test('return array with url when entire message is the workshop url with path id', () => {
    expect(parseSteamUrls(workshopUrlWithPathId)).toStrictEqual([workshopUrlWithPathId])
  })

  test('return array with url when entire message is the workshop url with query id', () => {
    expect(parseSteamUrls(workshopUrlWithQueryId)).toStrictEqual([workshopUrlWithQueryId])
  })

  test('return array with urls when message is two paths with id', () => {
    expect(parseSteamUrls(`${sharedFilesUrlWithPathId} and ${sharedFilesUrlWithPathId}`)).toStrictEqual([sharedFilesUrlWithPathId, sharedFilesUrlWithPathId])
  })

  test('return array with urls when message is two queries with id', () => {
    expect(parseSteamUrls(`${sharedFilesUrlWithQueryId} and ${sharedFilesUrlWithQueryId}`)).toStrictEqual([sharedFilesUrlWithQueryId, sharedFilesUrlWithQueryId])
  })

  test('return array with urls when message is one path with id and one query with id', () => {
    expect(parseSteamUrls(`${sharedFilesUrlWithPathId} and ${sharedFilesUrlWithQueryId}`)).toStrictEqual([sharedFilesUrlWithPathId, sharedFilesUrlWithQueryId])
  })
})
