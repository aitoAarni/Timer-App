import { Request, Response } from 'express'
import { AuthRequest, errorHandler, authMiddleware } from '../middleware'
import { ZodError } from 'zod'

let mockVerify: typeof jest.fn

jest.mock('jsonwebtoken', () => ({
    verify: (...args: any) => {
        return mockVerify(...args)
    },
}))

let mockFinById: typeof jest.fn
jest.mock('../models/userModel', () => ({
    findById: (...args: any) => {
        return mockFinById(...args)
    },
}))

describe('authMiddleware', () => {
    let mockReq: Partial<AuthRequest>
    let mockRes: Partial<Response>
    let mockNext: jest.Mock
    let token: string
    let decodedUser: {
        id: string
        username: string
    }

    beforeEach(() => {
        token = 'Bearer valid.jwt.token'
        decodedUser = {
            id: '123',
            username: 'testuser',
        }
        mockVerify = jest.fn().mockReturnValue(decodedUser)
        mockFinById = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue({
                _id: '123',
                username: 'testuser',
            }),
        })
        mockReq = { header: jest.fn().mockReturnValue(`Bearer ${token}`) }
        mockRes = {}
        mockNext = jest.fn()
    })

    it('Should allow request with a valid token', async () => {
        await authMiddleware(
            mockReq as AuthRequest,
            mockRes as Response,
            mockNext
        )
        expect(mockReq.user).toEqual(decodedUser)
        expect(mockNext).toHaveBeenCalledWith()
    })

    it('Should reject request when Authorization header is missing', async () => {
        mockReq.header = jest.fn().mockReturnValue(null)

        await authMiddleware(
            mockReq as AuthRequest,
            mockRes as Response,
            mockNext
        )

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
        expect(mockNext.mock.calls[0][0].message).toBe(
            'Token missing or invalid'
        )
    })

    it('Should reject request when Authorization header is malformed', async () => {
        mockReq.header = jest.fn().mockReturnValue('InvalidToken')

        await authMiddleware(
            mockReq as AuthRequest,
            mockRes as Response,
            mockNext
        )

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
        expect(mockNext.mock.calls[0][0].message).toBe(
            'Token missing or invalid'
        )
    })

    it('Should reject request when token is invalid', async () => {
        mockVerify = jest.fn().mockImplementation(() => {
            throw new Error('invalid token')
        })

        await authMiddleware(
            mockReq as AuthRequest,
            mockRes as Response,
            mockNext
        )

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
        expect(mockNext.mock.calls[0][0].message).toBe('invalid token')
    })

    it('Should reject request when user is not found', async () => {
        mockFinById = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        })

        await authMiddleware(
            mockReq as AuthRequest,
            mockRes as Response,
            mockNext
        )

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
        expect(mockNext.mock.calls[0][0].message).toBe('User not found')
    })
})
describe('errorHandler', () => {
    let mockReq: Partial<Request>
    let mockRes: Partial<Response>
    let mockNext: jest.Mock

    beforeEach(() => {
        mockReq = {}
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }
        mockNext = jest.fn()
    })

    it('Handles MongoDB duplicate key error', () => {
        const error = new Error('E11000 duplicate key error') as any
        error.name = 'MongoServerError'

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith(error)
        expect(mockNext).toHaveBeenCalledWith(error)
    })

    it('Handles Zod validation error', () => {
        const error = new ZodError([])

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith({
            error: "Request body isn't valid",
        })
        expect(mockNext).toHaveBeenCalledWith(error)
    })

    it('Handles incorrect credentials error', () => {
        const error = new Error('Credentials are incorrect')

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith({
            error: 'Credentials are incorrect',
        })
        expect(mockNext).toHaveBeenCalledWith(error)
    })

    it('Handles time log user authentication error', () => {
        const error = new Error(
            'Time log must be created by authenticated user'
        )

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith({
            error: 'Time log must be created by authenticated user',
        })
        expect(mockNext).toHaveBeenCalledWith(error)
    })

    it('Handles validation error', () => {
        const error = new Error('TimeLog validation failed')

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith({
            error: 'TimeLog validation failed',
        })
        expect(mockNext).toHaveBeenCalledWith(error)
    })

    it('Handles unknown errors', () => {
        const error = new Error('Some unexpected error')

        errorHandler(error, mockReq as Request, mockRes as Response, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith({
            error: 'unknown error on the server',
        })
        expect(mockNext).toHaveBeenCalledWith(error)
    })
})
