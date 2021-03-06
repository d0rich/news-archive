import { models } from '../server'
import { EditionsNews, NewsToCheck } from './support/types'

export const checkDatabase = async (newsToCheck: NewsToCheck[]) => {
  const filters = await Promise.all(newsToCheck.map(async (news) => {
    try {
      const id = await models.News.findOne({
        where: {
          publicationDate: news.publicationDate,
          titleUrl: news.titleUrl,
          editionId: news.editionId
        },
        attributes: ['editionId']
      })
      return !id
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to check news: ', news)
      return false
    }
  }))

  return newsToCheck.filter((_v, index) => filters[index])
}

export const checkAllEditionsNews = async (newsToCheck: EditionsNews) => {
  return {
    meduza: await checkDatabase(newsToCheck.meduza),
    cnn: await checkDatabase(newsToCheck.cnn)
  }
}
