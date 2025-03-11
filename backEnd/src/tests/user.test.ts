// @ts-nocheck
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/userModel'
import { getAllUsersFromDb, getUserFromDb } from './test_helpers'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

describe('test user creation and login', () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const api = supertest(app)
    afterAll(async () => {
        await mongoose.connection.close()
    })
    beforeEach(async () => {
        await User.deleteMany({})
    })
    describe('User creation', () => {
        it('should create a new user', async () => {
            const newUser = { username: 'testuser', password: 'password123' }
            const response = await api
                .post('/api/user/create')
                .send(newUser)
                .expect(201)
            const userInDb = await getUserFromDb(newUser.username)
            expect(response.body).toEqual(userInDb)
        })
        it('should return 400 if username is missing', async () => {
            const response = await api
                .post('/api/user/create')
                .send({ password: 'password123' })
                .expect(400)
            expect(response.body.error).toEqual("Request body isn't valid")
        })

        it('should return 400 if password is missing', async () => {
            const response = await api
                .post('/api/user/create')
                .send({ username: 'testuser' })
                .expect(400)

            expect(response.body.error).toEqual("Request body isn't valid")
        })
        it('should not allow duplicate usernames', async () => {
            const newUser = { username: 'testuser', password: 'password123' }

            await api.post('/api/user/create').send(newUser).expect(201)
            const response = await api
                .post('/api/user/create')
                .send(newUser)
                .expect(400)
            const usersInDb = await getAllUsersFromDb()
            expect(response.body.errorResponse.errmsg).toContain(
                'E11000 duplicate key error'
            )
            expect(usersInDb).toHaveLength(1)
        })
    })
    describe('User login', () => {
        it('should log in an existing user with correct credentials', async () => {
            const newUser = { username: 'testuser', password: 'password123' }
            await api.post('/api/user/create').send(newUser).expect(201)

            const response = await api
                .post('/api/user/login')
                .send(newUser)
                .expect(201)
            const { username, id } = jwt.verify(response.body.token, SECRET)

            expect({ username, id }).toEqual({
                username: response.body?.username,
                id: response.body?.id,
            })
        })

        it('should return 401 for incorrect credentials', async () => {
            await api
                .post('/api/user/create')
                .send({ username: 'testuser', password: 'password123' })

            const response = await api
                .post('/api/user/login')
                .send({ username: 'testuser', password: 'wrongpassword' })
                .expect(400)
            expect(response.body.error).toContain('Credentials are incorrect')
        })
    })
})
