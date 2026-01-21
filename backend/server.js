import express from 'express'
import { query } from './config/db.js'

const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
