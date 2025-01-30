import AsyncStorage from '@react-native-async-storage/async-storage'

export const getKeyValuePair = async function (key: string) {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {
        console.error('error in getKeyValuePair', error)
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
        console.error('error in setKeyValuePair', error)
        throw new Error(
            `Error setting data ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}
