import { checkMeduzaFeed } from './meduza/checkFeed'
import { checkCnnFeed } from './cnn/checkFeed'
import { checkAllEditionsNews } from './checkDatabase'
import { getAllNews } from './getAllNews'
import { EditionsNews } from './support/types'

export const parseAll = async () => {
  // eslint-disable-next-line no-console
  console.info('Starting checking news feed...')
  const editionsAllNews: EditionsNews = {
    meduza: await checkMeduzaFeed(),
    cnn: await checkCnnFeed()
  }
  // eslint-disable-next-line no-console
  console.info('News found in feed:')
  // eslint-disable-next-line no-console
  console.info(`    Meduza: ${editionsAllNews.meduza.length}`)
  // eslint-disable-next-line no-console
  console.info(`    CNN: ${editionsAllNews.cnn.length}`)
  const editionsFreshNews: EditionsNews = await checkAllEditionsNews(editionsAllNews)
  // eslint-disable-next-line no-console
  console.info('Fresh news:')
  // eslint-disable-next-line no-console
  console.info(`    Meduza: ${editionsFreshNews.meduza.length}`)
  // eslint-disable-next-line no-console
  console.info(`    CNN: ${editionsFreshNews.cnn.length}`)
  await getAllNews(editionsFreshNews)
  return editionsAllNews
}
