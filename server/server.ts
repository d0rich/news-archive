import { Request, Response } from 'express'
// @ts-ignore
import { scheduleJob } from 'node-schedule'
import { db } from './database/models'
import { parseAll } from './parsers'
// import router
import { newsRouter } from './api/newsRouter'
import { editionsRouter } from './api/editionsRouter'

try {
  require('dotenv').config()
} catch (e) {}

const express = require('express')
const app = express()
export const models = db

// @ts-ignore
if (process.env.AUTO_PARSE_NEWS === '1') {
  parseAll()
  scheduleJob('*/15 * * * *', parseAll)
}

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})
app.use('/news', newsRouter)
app.use('/editions', editionsRouter)

module.exports = {
  path: '/api',
  handler: app
}
