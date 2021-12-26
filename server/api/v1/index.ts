import { Router } from 'express'

const router = Router()

import { newsRouter } from './newsRouter'
import { typesRouter } from './typesRouter'
import { editionsRouter } from './editionsRouter'

router.use('/news', newsRouter)
router.use('/editions', editionsRouter)
router.use('/types', typesRouter)

export const v1Router = router
