import {
    getKeyValuePair,
    setKeyValuePair,
    removeKeyValuePair,
} from '@/storage/local/keyValueStorage'

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
const mockRemoveItem = jest.fn()

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        getItem: (...args: string[]) => {
            return mockGetItem(...args)
        },
        setItem: (...args: string[]) => {
            return mockSetItem(...args)
        },
        removeItem: (...args: string[]) => {
            return mockRemoveItem(...args)
        },
    }
})

describe('Key Value Storage API', () => {
    let mockKey = 'mockKey'
    let mockValue = 'mockValue'

    beforeEach(() => {
        jest.clearAllMocks()
        mockGetItem.mockResolvedValue(mockValue)
    })
    test('getKeyValuePair should return a value', async () => {
        const value = await getKeyValuePair(mockKey)
        expect(mockGetItem).toHaveBeenCalledWith(mockKey)
        expect(value).toEqual(mockValue)
    })
    test('setKeyValuePair should store a key value pair', async () => {
        await setKeyValuePair(mockKey, mockValue)
        expect(mockSetItem).toHaveBeenCalledWith(mockKey, mockValue)
    })
    test('removeKeyValuePair should remove a key value pair', async () => {
        await removeKeyValuePair(mockKey)
        expect(mockRemoveItem).toHaveBeenCalledWith(mockKey)
    })
    test('getKeyValuePair should throw an error when getItem fails', async () => {
        mockGetItem.mockRejectedValue(new Error('Failed to get the value'))
        await expect(getKeyValuePair(mockKey)).rejects.toThrow(
            'Error fetching data: Failed to get the value'
        )
    })
    test('setKeyValuePair should throw an error when setItem fails', async () => {
        mockSetItem.mockRejectedValue(
            new Error('failed to set the key value pair')
        )
        await expect(setKeyValuePair(mockKey, mockValue)).rejects.toThrow(
            'Error setting data failed to set the key value pair'
        )
    })
    test('removeKeyValuePair should throw an error when removeItem fails', async () => {
        mockRemoveItem.mockRejectedValue(
            new Error('failed to remove the key value pair')
        )

        await expect(removeKeyValuePair(mockKey)).rejects.toThrow(
            'rror removing data: Error: failed to remove the key value pair'
        )
    })
})
