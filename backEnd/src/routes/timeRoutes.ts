import express from 'express'

const timerRouter = express.Router()

timerRouter.post('/:id', /* async */ (req, res, next) => {
    try {
        const body = req.body as unknown
        console.log(body)
        res.status(200).send(body)
        console.log()
    } catch (error) {
        next(error)
    }
})

export default timerRouter
