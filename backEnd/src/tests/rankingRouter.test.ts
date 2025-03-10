import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from '../app'
import TimeLog from '../models/timeLogModel'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

dotenv.config()

describe('Ranking Router', () => {
    let user1Id: string
    let user2Id: string
    let user2Token: string
    beforeAll(async () => {
        await TimeLog.deleteMany({})
        await User.deleteMany({})

        const userOne = await new User({
            username: 'testUser1',
            passwordHash: 'hashedPassword',
        }).save()
        const userTwo = await new User({
            username: 'testuser2',
            passwordHash: 'hashedPassword',
        }).save()
        user1Id = userOne._id.toString()
        user2Id = userTwo._id.toString()
        user2Token = `Bearer ${jwt.sign(
            { id: user2Id, username: userTwo.username },
            SECRET,
            { expiresIn: '1h' }
        )}`

        await TimeLog.insertMany([
            { created_at: '2025-03-10', duration: 5000, user_id: user1Id },
            { created_at: '2025-03-10', duration: 3000, user_id: user2Id },
        ])
    })

    afterAll(async () => {
        await TimeLog.deleteMany({})
        await User.deleteMany({})
        await mongoose.connection.close()
    })

    test('GET /api/ranking/:date/:user_id should return rankings for a given date and user', async () => {
        const response = await request(app)
            .get(`/api/ranking/2025-03-10/${user2Id.toString()}`)
            .set('Authorization', user2Token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('userRank')
        expect(response.body).toHaveProperty('nearbyUsers')
        expect(response.body.totalParticipants).toBeGreaterThan(0)
    })

    test('GET /api/ranking/:date/:user_id should return 404 for non-existing user', async () => {
        const nonExistentUser = new mongoose.Types.ObjectId()
        const response = await request(app)
            .get(`/api/ranking/2025-03-10/${nonExistentUser.toString()}`)
            .set('Authorization', user2Token)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('No ranking information for user')
    })

    test('GET /api/ranking/:date/:user_id should return 500 for date with no logs', async () => {
        const response = await request(app)
            .get(`/api/ranking/2026-01-01/${user1Id.toString()}`)
            .set('Authorization', user2Token)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('No ranking information for user')
    })
})
