import express from 'express'
import { toTimeLog } from '../utils'
import TimeLog from '../models/timeLogModel'
import authMiddleware, { AuthRequest } from '../middleware'

const timerRouter = express.Router()

timerRouter.post('/', authMiddleware, async (req: AuthRequest, res, next) => {
    try {
        req.user = req.user as { username: string; id: string }
        console.log('in timeLogRouter req.body: ', req.body)
        console.log('req.user: ', req.user)
        const { created_at, duration, user_id } = toTimeLog(req.body)
        console.log("req.user.id !== user_id: ", req.user.id !== user_id)
        if (req.user.id !== user_id) {
            throw new Error('Time log must be created by authenticated user')
        }
        const time = new TimeLog({ created_at, duration, user_id })
        const savedTimeLog = await time.save()
        const savedTimeLogJson = savedTimeLog.toJSON()
        console.log('saveTimeLogJson: ', savedTimeLogJson)
        res.status(200).send(savedTimeLogJson)
    } catch (error) {
        next(error)
    }
})

export default timerRouter
