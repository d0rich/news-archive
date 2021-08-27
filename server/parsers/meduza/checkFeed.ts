import axios from 'axios'
import { NewsToCheck, Language } from '../support/types'

const checkFeedWithConfig = async (locale: Language, page: number = 0, perPage: number = 24) => {
  const feed: any = await axios
    .get(`https://meduza.io/api/v3/search?chrono=news&locale=${locale}&page=${page}&per_page=${perPage}`)
  const news: NewsToCheck[] = []
  for (const url in feed.data.documents) {
    let type, year, month, day, titleUrl
    if (locale === 'ru') {
      [type, year, month, day, titleUrl] = url.split('/')
    } else {
      let _l
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [_l, type, year, month, day, titleUrl] = url.split('/')
    }
    if (type === 'news') {
      news.push({
        publicationDate: new Date(`${year}-${month}-${day}`),
        titleUrl,
        editionId: 1,
        locale,
        url: undefined
      })
    }
  }
  return news
}

export const checkMeduzaFeed = async () => {
  console.log('Check meduza news...')
  const ruNews = checkFeedWithConfig('ru')
  const enNews = checkFeedWithConfig('en')
  const [fetchedRuNews, fetchedEnNews] = await Promise.all([ruNews, enNews])
  console.log('Meduza news checked')
  return [...fetchedRuNews, ...fetchedEnNews]
}
