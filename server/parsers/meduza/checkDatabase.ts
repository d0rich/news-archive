import { NewsToCheck } from '../types'
import { models } from '../../server'

export const checkDatabase = async (newsToCheck: NewsToCheck[]) => {
  const filters = await Promise.all(newsToCheck.map(async (news) => {
    const id = await models.News.findOne({
      where: {
        publicationDate: news.publicationDate,
        titleUrl: news.titleUrl,
        editionId: news.editionId
      },
      attributes: ['editionId']
    })
    return !id
  }))

  return newsToCheck.filter((_v, index) => filters[index])
}
