require('react-native-reanimated').setUpTests()
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    // Mock `runOnJS` to execute the function directly
    Reanimated.runOnJS = fn => fn

    // Mock `withTiming` and `withDelay` to avoid async calls
    Reanimated.withTiming = value => value
    Reanimated.withDelay = (delay, value) => value

    return Reanimated
})
