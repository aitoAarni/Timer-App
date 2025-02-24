import express from 'express'
import { toTimeLog } from '../utils'
import TimeLog from '../models/timeLogModel'

const timerRouter = express.Router()

timerRouter.post('/:UserId', async (req, res, next) => {
    try {
        const { created_at, duration, user_id } = toTimeLog(req.body)
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
