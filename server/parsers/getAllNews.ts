import { getMeduzaNews } from './meduza/getNews'
import { getCnnNews } from './cnn/getNews'
import { EditionsNews } from './support/types'

export const getAllNews = async (freshNews: EditionsNews) => {
  await Promise.all([getMeduzaNews(freshNews.meduza), getCnnNews(freshNews.cnn)])
}
