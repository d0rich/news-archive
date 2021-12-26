import { Router, Request, Response } from 'express'
import { models } from '../../server'
import { Sequelize, Op } from 'sequelize'

const router = Router()

router.get('/all', async (req: Request, res: Response) => {
  try {
    const types = await models.NewsTypes.findAll()
    res.send({ types })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

router.get('/edition/:editionId', async (req: Request, res: Response) => {
  try {
    const news = await models.News.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('typeId')) ,'typeId'],
        'editionId'
      ],
      where: {
        editionId: +req.params.editionId
      }
    })
    //@ts-ignore
    const typeIds: number[] = news.map(n => n.dataValues.typeId)
    const types = await models.NewsTypes.findAll({
      where:{
        id: {
          [Op.in]: typeIds
        }
      },
      order: ['type']
    })
    res.send({ _count: types.length, types })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

export const typesRouter = router
