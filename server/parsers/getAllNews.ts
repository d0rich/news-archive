import { getMeduzaNews } from './meduza/getNews'
import { EditionsNews } from './types'

export const getAllNews = async (freshNews: EditionsNews) => {
  await Promise.all([getMeduzaNews(freshNews.meduza)])
}
