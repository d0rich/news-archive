import { Request, Response } from 'express'
import { initDb } from './database/db_sync'

try {
  require('dotenv').config()
} catch (e) {}

const express = require('express')
const app = express()
export const models = initDb()

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})

module.exports = {
  path: '/api',
  handler: app
}
