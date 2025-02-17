import express from 'express'
import { toUserCredentials } from '../utils'
const router = express.Router()

router.post('/create', (req, res) => {
    try {
        const { username, password } = toUserCredentials(req.body)
        res.json({ username, password })
    } catch (error) {
        res.status(400).send({ error: 'unknown error' })
        throw error
    }
})

export default router
