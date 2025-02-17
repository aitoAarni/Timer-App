import express from 'express'
import userRouter from './routes/userRouter'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('someone pinged here')
    res.send('pong')
})

app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    console.log('http://localhost:3000/')
})
