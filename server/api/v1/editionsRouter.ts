import { Router, Request, Response } from 'express'
import { models } from '../../server'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/all', async (req: Request, res: Response) => {
  try {
    const editions = await models.Editions.findAll()
    res.send({ _count: editions.length,  editions })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

router.get('/:editionId', async (req: Request, res: Response) => {
  try {
    const edition = await models.Editions.findOne({
      where: {
        id: +req.params.editionId
      }
    })
    res.send({ edition })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

export const editionsRouter = router
