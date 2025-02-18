import express from 'express'
import bcrypt from 'bcrypt'
import { toUserCredentials } from '../utils'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { username, password } = toUserCredentials(req.body)
        const saltRounds = 5
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({ username, passwordHash })
        console.log(user.toJSON())
        const savedUser = await user.save()
        console.log(savedUser)
        res.status(201).json({ username, password })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        }
        res.status(400).send({ error: 'unknown error' })
        throw error
    }
})

router.post('/login', (req, res) => {
    try {
        const { username, password } = toUserCredentials(req.body)
        console.log(password) // TODO: confirm that user exists
        const id = 1
        const userForToken = { id, username }
        console.log('SECRET: ', process.env.SECRET)
        const secret = process.env.SECRET
        if (!secret) {
            throw new Error('SECRET environment variable is not set')
        }
        const token = jwt.sign(userForToken, secret, { expiresIn: '14d' })
        res.status(201).send({ token, username, id })
    } catch (error) {
        res.status(400).send({ error: 'unknown error' })
        throw error
    }
})

export default router
