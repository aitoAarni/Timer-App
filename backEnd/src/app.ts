import { DATABASE_URI } from './config'
import express, { NextFunction, Request, Response } from 'express'
import userRouter from './routes/userRouter'
import mongoose from 'mongoose'
import { errorHandler, unknownEndpoint } from './middleware'
import timeRouter from './routes/timeLogRouter'
import { toTimeLog } from './utils'
import rankingRouter from './routes/rankingRouter'

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
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request Method: ', req.method)
    console.log('Request URL: ', req.url)
    console.log('Request Body: ', req.body)
    console.log('Request Query Params: ', req.query)
    console.log('Request Headers: ', req.headers)
    next()
})

app.post(
    '/ping',
    /* async */ (_req, res, next) => {
        console.log('someone pinged here')
        const t = {
            created_at: '2025-03-02',
            duration: 10000,
            user_id: '67b628d7c22cdf7238ba76aa',
        }
        console.log(toTimeLog(t))
        res.send('pong')
        try {
            // const timelog = new TimeLog({
            //     created_at: '2025-03-02',
            //     duration: 10000,
            //     user_id: '67b628d7c22cdf7238ba76aa',
            // })
            // const saved = await timelog.save()
            // console.log(saved)
            // res.status(201).send(saved.toJSON())
        } catch (error) {
            next(error)
        }
    }
)

app.use('/api/user', userRouter)
app.use('/api/timelog', timeRouter)
app.use('/api/ranking', rankingRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
