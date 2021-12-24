try {
  require('dotenv').config()
} catch (e) {}

// supabase
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.SUPABASE_URL || 'https://okhohmckiacitbeyaztd.supabase.co',
  process.env.SUPABASE_KEY || '')

// database
import { db } from './database/models'
export const models = db

// schedule parsing
// @ts-ignore
import { scheduleJob } from 'node-schedule'
import { parseAll } from './parsers'
// @ts-ignore
if (process.env.AUTO_PARSE_NEWS === '1') {
  parseAll()
  scheduleJob('*/15 * * * *', parseAll)
}

// express
const express = require('express')
const app = express()

// router
import { Request, Response } from 'express'
import { v1Router } from './api/v1'
app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})
app.use('/v1', v1Router)

module.exports = {
  path: '/api',
  handler: app
}
