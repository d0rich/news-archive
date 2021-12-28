import { Router } from 'express'

const router = Router()

import { newsRouter } from './newsRouter'
import { typesRouter } from './typesRouter'
import { editionsRouter } from './editionsRouter'
import {parseRouter} from './parseRouter'

router.use('/news', newsRouter)
router.use('/editions', editionsRouter)
router.use('/types', typesRouter)
router.use('/parse', parseRouter)

export const v1Router = router
