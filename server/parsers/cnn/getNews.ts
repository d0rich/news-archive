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
    const title = $('h1.pg-headline').text()
    // @ts-ignore
    const content: string = $('section#body-text').html()
    try {
      const type = (await models.NewsTypes.findOrCreate({ where: { type: news.url?.split('/')[3] } }))[0]
      await models.News.create({
        publicationDate:
          `${news.publicationDate.getFullYear()}` +
          `-${to2Letters(news.publicationDate.getMonth() + 1)}` +
          `-${to2Letters(news.publicationDate.getDate())}`,
        title,
        content: convert(content),
        html: content,
        locale: news.locale,
        description: `${convert(content).slice(0, 50)}...`,
        editionId: news.editionId,
        titleUrl: news.titleUrl,
        sourceUrl: 'https://edition.cnn.com/' + news.url,
        // @ts-ignore
        typeId: type.dataValues.id
      })
      // eslint-disable-next-line no-console
      console.log(`Fresh news from CNN:\n   ${title}:\n   ${convert(content).slice(0, 100)}...`)
    } catch (e) {
      console.error(`Failed to save CNN news (${e}):`, {
        publicationDate:
          `${news.publicationDate.getFullYear()}` +
          `-${to2Letters(news.publicationDate.getMonth() + 1)}` +
          `-${to2Letters(news.publicationDate.getDate())}`,
        title,
        editionId: news.editionId,
        sourceUrl: news.url
      })
    }
  })
  await Promise.all(promises)
}
