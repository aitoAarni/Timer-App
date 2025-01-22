export const isTest = function () {
    const isTestString = process.env.EXPO_PUBLIC_TESTING
    return isTestString === 'true' ? true : false
}
