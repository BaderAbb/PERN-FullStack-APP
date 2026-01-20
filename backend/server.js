import express from 'express'
import pool from './db.js'

const port = 3000
const router = express.Router()

const app = express()
app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.post('/setup', (req, res) => {
  const { name, location } = req.body
  res.status(200).send(`Hello ${name} from ${location}`)
})

app.get('/setup', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `)
    res.status(200).send('Table created successfully')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/users', async (req, res) => {
  console.log('hitting users endpoint')
  try {
    const users = await pool.query('SELECT * FROM users')
    res.json(users.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    )
    res.status(200).send(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/users', async (req, res) => {
  try {
    await pool.query('DROP TABLE IF EXISTS users')
    res.status(200).send('Table dropped successfully')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
