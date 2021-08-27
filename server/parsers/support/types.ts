export type Language = 'ru' | 'en'

export type NewsToCheck = {
  publicationDate: Date,
  titleUrl: string,
  editionId: number,
  locale: Language,
  url: string | undefined
}

export type EditionsNews = {
  meduza: NewsToCheck[],
  cnn: NewsToCheck[]
}
