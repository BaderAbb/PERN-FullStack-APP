import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js' // Recuerda el .js
import imagesRoutes from './routes/imagesRoutes.js'
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('uploads', express.static('public/uploads'))

app.use('/api/users', userRoutes)
app.use('/api/images', imagesRoutes)

app.get('/', (req, res) => {
  res.send('API de Car Social Network funcionando 🚗')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('¡Algo salió mal en el servidor!')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
