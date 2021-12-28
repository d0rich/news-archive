import { Router, Request, Response } from 'express'
import { models } from '../../server'
import { parseAll } from '../../../server/parsers'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/news/all', async (req: Request, res: Response) => {
  try {
    const newNews = await parseAll()
    res.send({ news: newNews })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.send(e)
  }
})

export const parseRouter = router
