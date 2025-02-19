import { Request, Response, NextFunction } from 'express'

export const unknownEndpoint = (req: Request, res: Response) => {
    console.log('in unknown endpoint')
    res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('in error handler')
    console.log(error?.message, error?.name)
    if (
        error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')
    ) {
        res.status(400).send(error)
    }
    res.status(400).send(error)
    next(error)
}
