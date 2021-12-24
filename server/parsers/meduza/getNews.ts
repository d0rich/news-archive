import axios from 'axios'
import { NewsToCheck } from '../support/types'
import { models } from '../../server'
import { to2Letters } from '../support/functions'
const { convert } = require('html-to-text')

type MeduzaNews = {
  url: string,
  content: {
    body: string
  },
  description: string,
  title: string,
  // eslint-disable-next-line camelcase
  pub_date: string
}

export const getMeduzaNews = async (newsToParse: NewsToCheck[]) => {
  const promises = newsToParse.map(async (news: NewsToCheck) => {
    const response =
      await axios.get(`https://meduza.io/api/v3/${news.locale === 'ru' ? '' : news.locale + '/'}news/` +
      `${news.publicationDate.getFullYear()}` +
      `/${to2Letters(news.publicationDate.getMonth() + 1)}/` +
      `${to2Letters(news.publicationDate.getDate())}/${news.titleUrl}`)
    const meduzaNews: MeduzaNews = response.data.root
    const type = (await models.NewsTypes.findOrCreate({ where: { type: 'news' } }))[0]
    await models.News.create({
      publicationDate: meduzaNews.pub_date,
      title: meduzaNews.title,
      content: convert(meduzaNews.content.body),
      html: meduzaNews.content.body,
      locale: news.locale,
      description: meduzaNews.description,
      editionId: news.editionId,
      titleUrl: news.titleUrl,
      sourceUrl: `https://meduza.io/${meduzaNews.url}`,
      // @ts-ignore
      typeId: type.dataValues.id
    })
    // eslint-disable-next-line no-console
    console.log(`Fresh news from Meduza:\n   ${meduzaNews.title}:\n   ${meduzaNews.description}`)
  })
  await Promise.all(promises)
}
