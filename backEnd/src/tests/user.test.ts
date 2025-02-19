// @ts-nocheck
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

describe('test', () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const api = supertest(app)
    afterAll(async () => {
        await mongoose.connection.close()
        console.log('closing connection')
    })
    it('should create a new user', async () => {
        const newUser = { username: 'testuser2', password: 'password123' }
        console.log('run api request')
        await api
            .post('/api/user/create')
            .send(newUser)
            .expect(res => {
                console.log(res.body)
            })
        console.log('api request done')
    })
})
