import express from 'express'
const router = express.Router()

router.post('/create', (req, res) => {
    const { username, password } = req.body
})

export default router
