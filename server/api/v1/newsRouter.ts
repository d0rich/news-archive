import { Router, Request, Response } from 'express'
import { Op, literal } from 'sequelize'
import { models } from '../../server'
import { to2Letters } from '../../parsers/support/functions'

const router = Router()

router.get('/edition/:edition/year/:year/month/:month/day/:day/title/:title', async (req: Request, res: Response) => {
  try {
    const year = +req.params.year
    const month = +req.params.month
    const day = +req.params.day
    const news = await models.News.findOne({
      include: [
        { model: models.NewsTypes, as: 'type', attributes: ['id', 'type'] },
        { model: models.Editions, as: 'edition', attributes: ['id', 'name'] }
      ],
      where: {
        editionId: req.params.edition,
        publicationDate: `${year}-${to2Letters(month)}-${to2Letters(day)}`,
        titleUrl: req.params.title
      }
    })
    res.send({ news })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

router.get('/year/:year/month/:month', async (req: Request, res: Response) => {
  try {
    // getting params
    const year = +req.params.year
    const month = +req.params.month
    const daysInMonth = 33 - new Date(year, month - 1, 33).getDate()
    // getting 5 random news for each day in month
    const dailyNewsPromises: Promise<any[]>[] = []
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${to2Letters(month)}-${to2Letters(day)}`
      const dailyNewsPromise = models.News.findAll({
        where: { publicationDate: { [Op.eq]: date } },
        include: [
          { model: models.NewsTypes, as: 'type', attributes: ['id', 'type'] },
          { model: models.Editions, as: 'edition', attributes: ['id', 'name'] }
        ],
        attributes: ['publicationDate', 'title', 'description'],
        limit: 5,
        order: literal('random()')
      })
      dailyNewsPromises.push(dailyNewsPromise)
    }
    const news = (await Promise.all(dailyNewsPromises))
      .filter(dailyNews => dailyNews.length > 0)
      .map((dailyNews) => {
        return {
          date: dailyNews[0].dataValues.publicationDate,
          news: dailyNews
        }
      })
    // counting all news in month
    const newsCount = await models.News.count({
      where: {
        publicationDate: {
          [Op.gte]: `${year}-${to2Letters(month)}-01`,
          [Op.lte]: `${year}-${to2Letters(month)}-${to2Letters(daysInMonth)}`
        }
      }
    })
    res.send({ _found: newsCount, news })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

router.get('/year/:year/month/:month/day/:day', async (req: Request, res: Response) => {
  try {
    const year = +req.params.year
    const month = +req.params.month
    const day = +req.params.day
    const filters: any = {}
    if (req.query.edition){filters.editionId = +req.query.edition}
    if (req.query.type){filters.typeId = +req.query.type}
    const news = await models.News.findAll({
      attributes: ['publicationDate', 'title', 'description', 'titleUrl'],
      include: [
        { model: models.NewsTypes, as: 'type', attributes: ['id', 'type'] },
        { model: models.Editions, as: 'edition', attributes: ['id', 'name'] }
      ],
      where: {
        ...filters,
        publicationDate: `${year}-${to2Letters(month)}-${to2Letters(day)}`,
      },
      order: [['publicationDate', 'DESC']]
    })
    res.send({ _count: news.length, news })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

router.get('/last/:lastNewsNumber', async (req: Request, res: Response) => {
  try {
    const filters: any = {}
    if (req.query.edition){filters.editionId = +req.query.edition}
    if (req.query.type){filters.typeId = +req.query.type}
    const news = await models.News.findAll({
      limit: +req.params.lastNewsNumber,
      include: [
        { model: models.NewsTypes, as: 'type', attributes: ['id', 'type'] },
        { model: models.Editions, as: 'edition', attributes: ['id', 'name'] }
      ],
      attributes: ['publicationDate', 'title', 'description', 'titleUrl'],
      where: filters,
      order: [['createdAt', 'DESC']]
    })
    res.send({ _count: +req.params.lastNewsNumber, news })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

export const newsRouter = router
