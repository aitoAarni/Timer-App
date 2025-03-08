export const isTest = function () {
    const isTestString = process.env.EXPO_PUBLIC_TESTING
    return isTestString === 'true' ? true : false
}

export const BACK_END_URL =
    process.env.EXPO_PUBLIC_BACK_END_URL || 'http://192.168.1.120:3000'
