import express from 'express'
import bcrypt from 'bcrypt'
import { toUserCredentials } from '../utils'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { SECRET, SALT_ROUNDS } from '../config'

const router = express.Router()

router.post('/create', async (req, res, next) => {
    try {
        const { username, password } = toUserCredentials(req.body)

        const passwordHash = await bcrypt.hash(password, Number(SALT_ROUNDS))
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
                ? await bcrypt.compare(password, user.passwordHash)
                : false
        if (!passwordCorrect || !user) {
            throw new Error('Credentials are incorrect')
        }
        const userForToken = { id: user._id, username }

        const token = jwt.sign(userForToken, SECRET, { expiresIn: '14d' })
        const response = { ...user.toJSON(), token }
        res.status(201).send(response)
    } catch (error) {
        next(error)
    }
})

export default router
