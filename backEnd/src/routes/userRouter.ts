import express from 'express'
import bcrypt from 'bcrypt'
import { toUserCredentials } from '../utils'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const router = express.Router()

router.post('/create', async (req, res, next) => {
    try {
        const { username, password } = toUserCredentials(req.body)

        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS) || 5
        )
        const user = new User({ username, passwordHash })
        const savedUser = await user.save()
        const savedUserJSON = savedUser.toJSON()
        res.status(201).json(savedUserJSON)
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = toUserCredentials(req.body)

        const user = await User.findOne({ username }).exec()
        const passwordCorrect =
            typeof user?.passwordHash === 'string'
                ? bcrypt.compare(password, user.passwordHash)
                : false
        if (!passwordCorrect || !user) {
            res.status(400).send({ error: 'credentials are incorrect' })
        } else {
            const userForToken = { id: user._id, username }
            const secret = process.env.SECRET
            if (!secret) {
                throw new Error('SECRET environment variable is not set')
            }
            const token = jwt.sign(userForToken, secret, { expiresIn: '14d' })
            const response = { ...user.toJSON(), token }
            res.status(201).send(response)
        }
    } catch (error) {
        next(error)
    }
})

export default router
