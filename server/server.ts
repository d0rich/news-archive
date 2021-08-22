import { Request, Response } from 'express'
const express = require('express')
const app = express()

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})

module.exports = {
  path: '/api',
  handler: app
}
