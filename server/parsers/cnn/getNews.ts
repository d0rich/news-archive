import cheerio from 'cheerio'
import { NewsToCheck } from '../support/types'
import { models } from '../../server'
import { getStaticPageHTML } from '../getPageHTML'
import { to2Letters } from '../support/functions'
const { convert } = require('html-to-text')

export const getCnnNews = async (newsToParse: NewsToCheck[]) => {
  const promises = newsToParse.map(async (news: NewsToCheck) => {
    const newsPage = await getStaticPageHTML('https://edition.cnn.com/' + news.url)
    const $ = cheerio.load(newsPage)
    const title = $('h1.pg-headline', '.l-container').text()
    // @ts-ignore
    const content: string = $('section#body-text', 'article > .l-container > div > div > div').html()
    await models.News.create({
      publicationDate:
        `${news.publicationDate.getFullYear()}` +
        `-${to2Letters(news.publicationDate.getMonth())}` +
        `-${to2Letters(news.publicationDate.getDate())}`,
      title,
      content: convert(content),
      html: content,
      locale: news.locale,
      description: `${convert(content).slice(0, 50)}...`,
      editionId: news.editionId,
      titleUrl: news.titleUrl,
      sourceUrl: news.url
    })
    // eslint-disable-next-line no-console
    console.log(`Fresh news from CNN:\n   ${title}:\n   ${convert(content).slice(0, 100)}...`)
  })
  await Promise.all(promises)
}
