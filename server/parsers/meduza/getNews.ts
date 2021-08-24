import axios from 'axios'
import { NewsToCheck } from '../types'
import { models } from '../../server'
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

const to2Letters = (num: number) => {
  if (num < 10) { return `0${num}` }
  return `${num}`
}

export const getNews = (newsToParse: NewsToCheck[]) => {
  newsToParse.forEach(async (news: NewsToCheck) => {
    const response =
      await axios.get(`https://meduza.io/api/v3/news/${news.publicationDate.getFullYear()}` +
      `/${to2Letters(news.publicationDate.getMonth() + 1)}/` +
      `${to2Letters(news.publicationDate.getDate())}/${news.titleUrl}`)
    const meduzaNews: MeduzaNews = response.data.root
    await models.News.create({
      publicationDate: meduzaNews.pub_date,
      title: meduzaNews.title,
      content: convert(meduzaNews.content.body),
      html: meduzaNews.content.body,
      locale: news.locale,
      description: meduzaNews.description,
      editionId: news.editionId,
      titleUrl: news.titleUrl,
      sourceUrl: `https://meduza.io/${meduzaNews.url}`
    })
    // eslint-disable-next-line no-console
    console.log(`Fresh news from Meduza ${meduzaNews.title}: ${meduzaNews.description}`)
  })
}
