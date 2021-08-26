export type Language = 'ru' | 'en'

export type NewsToCheck = {
  publicationDate: Date,
  titleUrl: string,
  editionId: number,
  locale: Language
}

export type EditionsNews = {
  meduza: NewsToCheck[],
  cnn: NewsToCheck[]
}
