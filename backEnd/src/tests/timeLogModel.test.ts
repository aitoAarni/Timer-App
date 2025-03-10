import mongoose from 'mongoose'
import TimeLog from '../models/timeLogModel'

describe('TimeLog Model', () => {
    it('validates correct date format', () => {
        const log = new TimeLog({
            created_at: '2025-03-10',
            duration: 300,
            user_id: new mongoose.Types.ObjectId(),
        })
        expect(log.validateSync()).toBeUndefined()
    })

    it('rejects invalid date format', () => {
        const log = new TimeLog({
            created_at: 'invalid-date',
            duration: 60,
            user_id: new mongoose.Types.ObjectId(),
        })
        const error = log.validateSync()
        expect(error).toBeDefined()
        expect(error?.errors.created_at.message).toMatch(
            /invalid-date is not a valid timestamp/
        )
    })
})
