import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')
    ) {
        res.status(400).send(error)
    } else if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues })
    } else if (error.message === 'Credentials are incorrect') {
        res.status(400).send({ error: error.message })
    } else {
        res.status(400).send({ error: 'unknown error on the server' })
    }
    next(error)
}
