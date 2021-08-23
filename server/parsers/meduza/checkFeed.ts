import axios from 'axios'
import { NewsToCheck } from '../types'

export const checkFeed = async () => {
  const feed: any = await axios.get('https://meduza.io/api/v3/search?chrono=news&locale=ru&page=0&per_page=24')
  const news: NewsToCheck[] = []
  for (const url in feed.data.documents) {
    const [type, year, month, day, titleUrl] = url.split('/')
    if (type === 'news') {
      news.push({
        publicationDate: new Date(`${year}-${month}-${day}`),
        titleUrl,
        editionId: 1,
        locale: 'ru'
      })
    }
  }
  return news
}
