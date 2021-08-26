export type Language = 'ru' | 'en'

export type NewsToCheck = {
  publicationDate: Date,
  titleUrl: string,
  editionId: number,
  locale: Language
}
