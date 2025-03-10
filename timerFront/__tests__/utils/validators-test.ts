// @ts-nocheck
import {
    toRemoteLoggedInUser,
    toStorageUser,
    toRankings,
    toDisplayTimeLog,
} from '@/utils/validators'
import { z} from 'zod'

describe('validators', () => {
    describe('toRemoteLoggedInUser', () => {
        let user
        beforeEach(() => {
            user = {
                id: 'e3e32wfd2r',
                username: 'username',
                token: 'mockToken1343',
            }
        })
        it('should parse correct user', () => {
            const validatedUser = toRemoteLoggedInUser(user)
            expect(validatedUser).toEqual(user)
        })
        it('should throw an error for invalid id', () => {
            user.id = 2
            expect(() => toRemoteLoggedInUser(user)).toThrow()
        })
        it('should throw an error for too short username', () => {
            user.username = 'Sh'
            expect(() => toRemoteLoggedInUser(user)).toThrow()
        })
        it('should throw an error for invalid token', () => {
            user.token = 234
            expect(() => toRemoteLoggedInUser(user)).toThrow()
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
        it('should throw and error for invalid id', () => {
            user.id = '1'
            expect(() => toStorageUser(user)).toThrow()
        })
        it('should throw and error for too short username', () => {
            user.username = 'Sh'
            expect(() => toStorageUser(user)).toThrow()
        })
        it('should throw and error for too short', () => {
            user.password = 'short'
            expect(() => toStorageUser(user)).toThrow()
        })
        it('should throw and error for invalid server_id', () => {
            user.server_id = 23
            expect(() => toStorageUser(user)).toThrow()
        })
        it('should throw and error for invalid created_at', () => {
            user.created_at = new Date()
            expect(() => toStorageUser(user)).toThrow()
        })
        it('should throw and error for invalid token', () => {
            user.token = 3241
            expect(() => toStorageUser(user)).toThrow()
        })
    })

    describe('toRankings Type Guard', () => {
        let validData
        beforeEach(() => {
            validData = {
                userRank: 1,
                userDuration: 120,
                totalParticipants: 10,
                nearbyUsers: [
                    {
                        rank: 2,
                        user_id: 'user123',
                        username: 'Alice',
                        duration: 300,
                    },
                ],
            }
        })
        it('should parse valid rankings data', () => {
            expect(() => toRankings(validData)).not.toThrow()
            expect(toRankings(validData)).toMatchObject(validData)
        })

        it('should throw an error for missing fields', () => {
            const invalidData = { ...validData }
            delete invalidData.userRank

            expect(() => toRankings(invalidData)).toThrow(z.ZodError)
        })

        it('should throw an error for negative userRank', () => {
            const invalidData = { ...validData, userRank: -1 }

            expect(() => toRankings(invalidData)).toThrow(z.ZodError)
        })

        it('should throw an error for invalid user_id (empty string)', () => {
            const invalidData = {
                ...validData,
                nearbyUsers: [{ ...validData.nearbyUsers[0], user_id: '' }],
            }

            expect(() => toRankings(invalidData)).toThrow(z.ZodError)
        })

        it('should throw an error if nearbyUsers contains an invalid user', () => {
            const invalidData = {
                ...validData,
                nearbyUsers: [
                    {
                        rank: 2,
                        user_id: 'validUser',
                        username: 'Bob',
                        duration: -100,
                    },
                ],
            }

            expect(() => toRankings(invalidData)).toThrow(z.ZodError)
        })
    })

describe("toDisplayTimeLog Validation", () => {
    test("Valid time log array should pass", () => {
        const validData = [
            { total_duration: 120, date: "2025-03-04T12:00:00.000Z" },
            { total_duration: 45, date: "2025-03-04T13:30:00.000Z" },
        ];

        expect(() => toDisplayTimeLog(validData)).not.toThrow();
    });

    test("Invalid time log (negative duration) should throw", () => {
        const invalidData = [
            { total_duration: -5, date: "2025-03-04T12:00:00.000Z" },
        ];

        expect(() => toDisplayTimeLog(invalidData)).toThrow(z.ZodError);
    });

    test("Invalid time log (missing date) should throw", () => {
        const invalidData = [{ total_duration: 120 }];

        expect(() => toDisplayTimeLog(invalidData)).toThrow(z.ZodError);
    });

    test("Invalid time log (empty array) should pass", () => {
        const emptyData: unknown = [];
        expect(() => toDisplayTimeLog(emptyData)).not.toThrow();
    });

    test("Completely invalid data type (string instead of array) should throw", () => {
        const invalidData: unknown = "invalid data";

        expect(() => toDisplayTimeLog(invalidData)).toThrow(z.ZodError);
    });
});

})
