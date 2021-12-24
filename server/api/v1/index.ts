import { Router } from 'express'

const router = Router()

import { newsRouter } from './newsRouter'
import { editionsRouter } from './editionsRouter'

router.use('/news', newsRouter)
router.use('/editions', editionsRouter)

export const v1Router = router
