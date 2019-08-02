const { parseSteamId, parseSteamUrls } = require('./parser')

const urlWithPathId = 'https://steamcommunity.com/sharedfiles/filedetails/123456789'
const urlWithQueryId = 'https://steamcommunity.com/sharedfiles/filedetails/?id=123456789'

describe('parseSteamId', () => {
  test('return undefined for non url', () => {
    expect(parseSteamId('hello world!')).toStrictEqual(undefined)
  })

  test('return undefined for non matching url', () => {
    expect(parseSteamId('https://store.steampowered.com')).toStrictEqual(undefined)
  })

  test('return id in url with path id', () => {
    expect(parseSteamId(urlWithPathId)).toStrictEqual(123456789)
  })

  test('return id in url with path id', () => {
    expect(parseSteamId(urlWithQueryId)).toStrictEqual(123456789)
  })
})

describe('parseSteamUrls', () => {
  test('return empty array for non url', () => {
    expect(parseSteamUrls('hello world!')).toStrictEqual([])
  })

  test('return empty array for non matching url', () => {
    expect(parseSteamUrls('https://store.steampowered.com')).toStrictEqual([])
  })

  test('return array with url when entire message is the url with path id', () => {
    expect(parseSteamUrls(urlWithPathId)).toStrictEqual([urlWithPathId])
  })

  test('return array with url when entire message is the url with query id', () => {
    expect(parseSteamUrls(urlWithQueryId)).toStrictEqual([urlWithQueryId])
  })

  test('return array with urls when message is two paths with id', () => {
    expect(parseSteamUrls(`${urlWithPathId} and ${urlWithPathId}`)).toStrictEqual([urlWithPathId, urlWithPathId])
  })

  test('return array with urls when message is two queries with id', () => {
    expect(parseSteamUrls(`${urlWithQueryId} and ${urlWithQueryId}`)).toStrictEqual([urlWithQueryId, urlWithQueryId])
  })

  test('return array with urls when message is one path with id and one query with id', () => {
    expect(parseSteamUrls(`${urlWithPathId} and ${urlWithQueryId}`)).toStrictEqual([urlWithPathId, urlWithQueryId])
  })
})
