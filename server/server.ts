import { Request, Response } from 'express'
// @ts-ignore
import { scheduleJob } from 'node-schedule'
import { initDb } from './database/db_sync'
import { parseAll } from './parsers'
try {
  require('dotenv').config()
} catch (e) {}

const express = require('express')
const app = express()
export const models = initDb()

parseAll()
scheduleJob('/15 * * * *', parseAll)

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})

module.exports = {
  path: '/api',
  handler: app
}
