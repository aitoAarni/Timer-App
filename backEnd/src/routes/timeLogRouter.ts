import express from 'express'
import { toTimeLog } from '../utils'
import TimeLog from '../models/timeLogModel'
import { AuthRequest, authMiddleware } from '../middleware'

const timerRouter = express.Router()

timerRouter.post('/', authMiddleware, async (req: AuthRequest, res, next) => {
    try {
        req.user = req.user as { username: string; id: string }
        const { created_at, duration, user_id } = toTimeLog(req.body)
        if (req.user.id !== user_id) {
            throw new Error('Time log must be created by authenticated user')
        }
        const updatedTimeLog = await TimeLog.findOneAndUpdate(
            { created_at, user_id },
            { $inc: { duration } },
            { new: true, upsert: true }
        )
        const savedTimeLogJson = updatedTimeLog.toJSON()
        res.status(200).send(savedTimeLogJson)
    } catch (error) {
        next(error)
    }
})

export default timerRouter
