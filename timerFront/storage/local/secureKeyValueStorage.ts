import { setItemAsync, getItemAsync, deleteItemAsync    } from 'expo-secure-store'

export const setSecureKeyValuePair = async (key: string, value: string) => {
    try {
        await setItemAsync(key, value)
    } catch (error) {
        console.error(`Failed to store key-value pair: ${error}`)
        throw error
    }
}

export const getSecureKeyValuePair = async (key: string) => {
    try {
        const value = await getItemAsync(key)
        return value
    } catch (error) {
        console.error('Failed to get value')
        throw error
    }
}

export const removeSecureKeyValuePair = async (key: string) => {
    try {
        await deleteItemAsync(key)
    } catch (error) {
        console.error('Failed to remove value')
        throw error
    }
}
