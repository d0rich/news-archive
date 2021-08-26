import { checkMeduzaFeed } from './meduza/checkFeed'
import { checkDatabase } from './meduza/checkDatabase'
import { getNews } from './meduza/getNews'

export const parseAll = async () => {
  let meduzaNews = await checkMeduzaFeed()
  // eslint-disable-next-line no-console
  console.log('Check news. News found:', meduzaNews.length)
  meduzaNews = await checkDatabase(meduzaNews)
  // eslint-disable-next-line no-console
  console.log('Fresh news:', meduzaNews.length)
  await getNews(meduzaNews)
}
