import {DATABASE_URI} from './config'
import express from 'express'
import userRouter from './routes/userRouter'
import mongoose from 'mongoose'
import { errorHandler, unknownEndpoint } from './middleware'

if (!DATABASE_URI) {
    throw new Error('MONGODB_URI environmental variable is not set')
}

mongoose
    .connect(DATABASE_URI)
    .then(() => console.log('connected to db'))
    .catch(error => {
        console.error(
            'error connecting to db',
            error instanceof Error ? error.message : String(error)
        )
    })

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('someone pinged here')
    res.send('pong')
})

app.use('/api/user', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    console.log('http://localhost:3000/')
})
