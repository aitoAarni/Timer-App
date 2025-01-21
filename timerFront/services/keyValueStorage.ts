import AsyncStorage from '@react-native-async-storage/async-storage'

export const getKeyValuePair = async function (key: string) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
        throw new Error(`The key '${key}' doesn't have any value stored `)
    } catch (error) {
        throw new Error(
            `Error fetching data: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export const setKeyValuePair = async function (key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        throw new Error(
            `Error setting data ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}
