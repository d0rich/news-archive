import { checkMeduzaFeed } from './meduza/checkFeed'
import { checkCnnFeed } from './cnn/checkFeed'
import { checkAllEditionsNews } from './checkDatabase'
import { getAllNews } from './getAllNews'
import { EditionsNews } from './support/types'

export const parseAll = async () => {
  // eslint-disable-next-line no-console
  console.log('Staring checking news feed...')
  const editionsAllNews: EditionsNews = {
    meduza: await checkMeduzaFeed(),
    cnn: await checkCnnFeed()
  }
  let newsCount = editionsAllNews.meduza.length + editionsAllNews.cnn.length
  // eslint-disable-next-line no-console
  console.log(`News found in feed: ${newsCount}`)
  const editionsFreshNews: EditionsNews = await checkAllEditionsNews(editionsAllNews)
  newsCount = editionsFreshNews.meduza.length + editionsFreshNews.cnn.length
  // eslint-disable-next-line no-console
  console.log(`Fresh news: ${newsCount}`)
  await getAllNews(editionsFreshNews)
}
