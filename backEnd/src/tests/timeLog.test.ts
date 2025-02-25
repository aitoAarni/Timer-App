import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import TimeLog from '../models/timeLogModel'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

let userToken: string
let otherUserToken: string
let userId: string
let otherUserId: string

beforeAll(async () => {
    // Clear the database before tests
    await TimeLog.deleteMany({})
    await User.deleteMany({})

    // Create test users
    const user = await new User({
        username: 'testuser',
        passwordHash: 'hashedPassword',
    }).save()
    const otherUser = await new User({
        username: 'otheruser',
        passwordHash: 'hashedPassword',
    }).save()

    userId = user._id.toString()
    otherUserId = otherUser._id.toString()

    // Generate valid JWT tokens
    userToken = `Bearer ${jwt.sign(
        { id: userId, username: user.username },
        SECRET,
        { expiresIn: '1h' }
    )}`
    otherUserToken = `Bearer ${jwt.sign(
        { id: otherUserId, username: otherUser.username },
        SECRET,
        { expiresIn: '1h' }
    )}`
})

afterAll(async () => {
    // Cleanup
    await mongoose.connection.close()
})

describe('POST /api/timelog', () => {
    it('Successfully creates a new time log with valid data and token', async () => {
        const response = await request(app)
            .post('/api/timelog')
            .set('Authorization', userToken)
            .send({
                created_at: '2025-02-24',
                duration: 3600,
                user_id: userId,
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body.created_at).toBe('2025-02-24')
        expect(response.body.duration).toBe(3600)
    })

    it('Fails without authentication token', async () => {
        const response = await request(app).post('/api/timelog').send({
            created_at: '2025-02-24',
            duration: 3600,
            user_id: userId,
        })

        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
    })

    it('Fails when user tries to create a log for another user', async () => {
        const response = await request(app)
            .post('/api/timelog')
            .set('Authorization', otherUserToken) // Wrong user
            .send({
                created_at: '2025-02-24',
                duration: 3600,
                user_id: userId, // Trying to log for the first user
            })

        expect(response.status).toBe(400) // Or whatever your error handling returns
        expect(response.body.error).toBe(
            'Time log must be created by authenticated user'
        )
    })

    it('Fails if `created_at` is not a valid date format', async () => {
        const response = await request(app)
            .post('/api/timelog')
            .set('Authorization', userToken)
            .send({
                created_at: '2025-02-31',
                duration: 3600,
                user_id: userId,
            })

        expect(response.status).toBe(400)
        expect(response.body.error).toMatch(
            '2025-02-31 is not a valid timestamp! Must be in format YYYY-MM-DD'
        )
    })

    it('Fails if `duration` is missing', async () => {
        const response = await request(app)
            .post('/api/timelog')
            .set('Authorization', userToken)
            .send({
                created_at: '2025-02-24',
                user_id: userId,
            })

        expect(response.status).toBe(400)
        expect(response.body.error).toMatch("Request body isn't valid")
    })

    it(' Fails if `user_id` is missing', async () => {
        const response = await request(app)
            .post('/api/timelog')
            .set('Authorization', userToken)
            .send({
                created_at: '2025-02-24',
                duration: 3600,
            })

        expect(response.status).toBe(400)
        expect(response.body.error).toMatch("Request body isn't valid")
    })
})
