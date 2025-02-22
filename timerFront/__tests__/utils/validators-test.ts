// @ts-nocheck
import { toRemoteUser, toStorageUser } from '@/utils/validators'

describe('validators', () => {
    describe('toRemoteUser', () => {
        let user
        beforeEach(() => {
            user = {
                id: 'e3e32wfd2r',
                username: 'username',
                token: 'mockToken1343',
                times: ['fakeId'],
            }
        })
        it('should parse correct user', () => {
            const validatedUser = toRemoteUser(user)
            expect(validatedUser).toEqual(user)
        })
        it('should throw an error for invalid id', () => {
            user.id = 2
            expect(() => toRemoteUser(user)).toThrow()
        })
        it('should throw an error for too short username', () => {
            user.username = 'Sh'
            expect(() => toRemoteUser(user)).toThrow()
        })
        it('should throw an error for invalid token', () => {
            user.token = 234
            expect(() => toRemoteUser(user)).toThrow()
        })
        it('should throw an error for invalid times', () => {
            user.times = 'times'
            expect(() => toRemoteUser(user)).toThrow()
        })
    })
    describe('toStorageUser', () => {
        let user
        beforeEach(() => {
            user = {
                id: 1,
                username: 'tester',
                password: 'securepassword',
                server_id: 'server1',
                created_at: '2024-02-22T10:00:00Z',
                token: 'xyz123',
            }
        })
        it('should parse a valid user', () => {
            expect(toStorageUser(user)).toEqual(user)
        })
        it('should parse a valid user with null token and server_id', () => {
            user.token = null
            user.server_id = null
            expect(toStorageUser(user)).toEqual(user)
        })
        it("should throw and error for invalid id", () => {
            user.id = "1"
            expect(() => toStorageUser(user)).toThrow()
        })
        it("should throw and error for too short username", () => {
            user.username = "Sh"
            expect(() => toStorageUser(user)).toThrow()
        })
        it("should throw and error for too short", () => {
            user.password = "short"
            expect(() => toStorageUser(user)).toThrow()
        })
        it("should throw and error for invalid server_id", () => {
            user.server_id = 23
            expect(() => toStorageUser(user)).toThrow()
        })
        it("should throw and error for invalid created_at", () => {
            user.created_at = new Date()
            expect(() => toStorageUser(user)).toThrow()
        })
        it("should throw and error for invalid token", () => {
            user.token = 3241
            expect(() => toStorageUser(user)).toThrow()
        })
    })
})
