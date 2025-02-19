// @ts-nocheck
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/userModel'
import { getUserFromDb } from './test_helpers'

describe('test', () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const api = supertest(app)
    afterAll(async () => {
        await mongoose.connection.close()
        console.log('closing connection')
    })
    beforeEach(async () => {
        await User.deleteMany({})
    })
    it('should create a new user', async () => {
        const newUser = { username: 'testuser', password: 'password123' }
        const response = await api
            .post('/api/user/create')
            .send(newUser)
            .expect(201)
        const userInDb = await getUserFromDb(newUser.username)
        console.log('rsponse: ', response.body)
        console.log('useinDB: ', userInDb)
        expect(response.body).toEqual(userInDb)
    })
    it('should return 400 if username is missing', async () => {
        const response = await api
            .post('/api/user/create')
            .send({ password: 'password123' })
            .expect(400)
        console.log('response.body.error: ', response.body.error)
        expect(response.body.error[0].message).toEqual('Required')
    })

    it('should return 400 if password is missing', async () => {
        const response = await api
            .post('/api/user/create')
            .send({ username: 'testuser' })
            .expect(400)
        console.log('response.body.error: ', response.body.error)

        expect(response.body.error[0].message).toEqual('Required')
    })
})
