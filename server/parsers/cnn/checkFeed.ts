import cheerio, { NodeWithChildren } from 'cheerio'
import { NewsToCheck } from '../types'
import { getDynamicPageHTML } from '../getPageHTML'

export const checkCnnFeed = async () => {
  const feedPage = await getDynamicPageHTML('https://edition.cnn.com/')
  const $ = cheerio.load(feedPage)
  let newsNodes: NodeWithChildren[] = []
  const parsedFeed = $('h3.cd__headline',
    '.zn__containers > .column > ul.cn > li > article > .cd__wrapper > .cd__content')
  for (const index in parsedFeed) {
    if (!isNaN(+index)) { newsNodes.push(parsedFeed[index]) }
  }
  newsNodes = newsNodes.filter((node) => {
    const href = $('a', node).attr('href')
    // @ts-ignore
    return !isNaN(+href?.split('/')[1]) && href?.split('/').length === 7
  })
  const news: NewsToCheck[] = newsNodes.map((node) => {
    const href = $('a', node).attr('href')
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_s, year, month, day, type, titleUrl, _index] = href?.split('/')
    return {
      publicationDate: new Date(`${year}-${month}-${day}`),
      titleUrl,
      editionId: 2,
      locale: 'en'
    }
  })
  return news
}