import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import User from './models/userModel'
import { SECRET } from './config'

export interface AuthRequest extends Request {
    user?: { id: string; username: string }
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Token missing or invalid')
        }

        const token = authHeader.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, SECRET)

        if (typeof decodedToken === 'string' || !decodedToken.id) {
            throw new Error('Invalid token')
        }
        const user = await User.findById(decodedToken.id).exec()
        if (!user) {
            throw new Error('User not found')
        }
        req.user = { id: user._id.toString(), username: user.username }
        next()
    } catch (error) {
        next(error)
    }
}

export const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error)
    if (
        error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')
    ) {
        res.status(400).send(error)
    } else if (error instanceof z.ZodError) {
        res.status(400).send({ error: "Request body isn't valid" })
    } else if (error.message === 'Credentials are incorrect') {
        res.status(400).send({ error: error.message })
    } else if (
        error.message === 'Time log must be created by authenticated user'
    ) {
        res.status(400).send({ error: error.message })
    } else if (error.message.includes('TimeLog validation failed')) {
        res.status(400).send({ error: error.message })
    } else {
        res.status(400).send({ error: 'unknown error on the server' })
    }
    next(error)
}
