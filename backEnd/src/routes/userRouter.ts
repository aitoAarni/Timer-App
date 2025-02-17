import express from 'express'
import { toUserCredentials } from '../utils'
import { z } from 'zod'
const router = express.Router()

router.post('/create', (req, res) => {
    try {
        const { username, password } = toUserCredentials(req.body)
        res.json({ username, password })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        }
        res.status(400).send({ error: 'unknown error' })
        throw error
    }
})

export default router
