import {
    setSecureKeyValuePair,
    getSecureKeyValuePair,
    removeSecureKeyValuePair,
} from '@/storage/local/secureKeyValueStorage'

let mockSetItemAsync = jest.fn()
let mockGetItemAsync = jest.fn()
let mockDeleteItemAsync = jest.fn()

jest.mock('expo-secure-store', () => ({
    setItemAsync: (...args: string[]) => {
        return mockSetItemAsync(...args)
    },
    getItemAsync: (...args: string[]) => {
        return mockGetItemAsync(...args)
    },
    deleteItemAsync: (...args: string[]) => {
        return mockDeleteItemAsync(...args)
    },
}))

describe('Secure Store Utility Functions', () => {
    const mockKey = 'testKey'
    const mockValue = 'testValue'

    beforeEach(() => {
        jest.clearAllMocks() 
    })

    test('setSecureKeyValuePair should store a key-value pair', async () => {
        await setSecureKeyValuePair(mockKey, mockValue)
        expect(mockSetItemAsync).toHaveBeenCalledWith(
            mockKey,
            mockValue
        )
    })

    test('getSecureKeyValuePair should retrieve a stored value', async () => {
        mockGetItemAsync.mockResolvedValue(mockValue)
        const result = await getSecureKeyValuePair(mockKey)
        expect(mockGetItemAsync).toHaveBeenCalledWith(mockKey)
        expect(result).toBe(mockValue)
    })

    test('removeSecureKeyValuePair should remove a stored key', async () => {
        await removeSecureKeyValuePair(mockKey)
        expect(mockDeleteItemAsync).toHaveBeenCalledWith(mockKey)
    })

    test('setSecureKeyValuePair should throw an error when SecureStore fails', async () => {
        mockSetItemAsync.mockRejectedValue(
            new Error('Storage failed')
        )

        await expect(setSecureKeyValuePair(mockKey, mockValue)).rejects.toThrow(
            'Storage failed'
        )
    })

    test('getSecureKeyValuePair should throw an error when SecureStore fails', async () => {

        mockGetItemAsync.mockRejectedValue(
            new Error('Retrieval failed')
        )

        await expect(getSecureKeyValuePair(mockKey)).rejects.toThrow(
            'Retrieval failed'
        )
    })

    test('removeSecureKeyValuePair should throw an error when SecureStore fails', async () => {
        mockDeleteItemAsync.mockRejectedValue(
            new Error('Deletion failed')
        )

        await expect(removeSecureKeyValuePair(mockKey)).rejects.toThrow(
            'Deletion failed'
        )
    })
})
