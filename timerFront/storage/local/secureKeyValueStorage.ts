import * as SecureStore from 'expo-secure-store'

export const setSecureKeyValuePair = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.error(`Failed to store key-value pair: ${error}`)
        throw error
    }
}

export const getSecureKeyValuePair = async (key: string) => {
    try {
        const value = await SecureStore.getItemAsync(key)
        return value
    } catch (error) {
        console.error('Failed to get value')
        throw error
    }
}

export const removeSecureKeyValuePair = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.error('Failed to remove value')
        throw error
    }
}
