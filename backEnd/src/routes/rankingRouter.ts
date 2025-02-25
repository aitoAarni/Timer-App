import express from 'express'
import TimeLog from '../models/timeLogModel'
import { AuthRequest, authMiddleware } from '../middleware'
import mongoose from 'mongoose'

const rankingRouter = express.Router()

rankingRouter.get(
    '/:date/:user_id',
    authMiddleware,
    async (req: AuthRequest, res, next) => {
        try {
            console.log("halooooo")
            const { date, user_id } = req.params

            // 1️⃣ Fetch all time logs for the given date and sort them by duration (descending)
            const rankings = await TimeLog.find({ created_at: date })
                .populate<{
                    user_id: { _id: mongoose.Types.ObjectId; username: string }
                }>('user_id', 'username')
                .sort({ duration: -1 })
            console.log("ranking: ", rankings)
            if (rankings.length === 0) {
                throw new Error('No logs found for this date')
            }

            // 2️⃣ Find the user's ranking position
            const userIndex = rankings.findIndex(
                log => log.user_id._id.toString() === user_id
            )
            console.log("userIndex: ", userIndex)
            if (userIndex === -1) {
                throw new Error('User not found in ranking for this date')
            }

            // 3️⃣ Get up to 5 users above and 5 below the given user
            const start = Math.max(0, userIndex - 5)
            const end = Math.min(rankings.length, userIndex + 6) // +6 to include user

            const nearbyUsers = rankings
                .slice(start, end)
                .map((log, index) => ({
                    rank: start + index + 1, // 1-based ranking
                    user_id: log.user_id._id.toString(),
                    username: log.user_id.username,
                    duration: log.duration,
                }))

            // 4️⃣ Return the response
            res.json({
                userRank: userIndex + 1,
                userDuration: rankings[userIndex].duration,
                nearbyUsers,
            })
        } catch (error) {
            next(error)
        }
    }
)

export default rankingRouter
