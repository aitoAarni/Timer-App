require('react-native-reanimated').setUpTests()
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    Reanimated.runOnJS = fn => fn

    Reanimated.withTiming = value => value
    Reanimated.withDelay = (delay, value) => value

    return Reanimated
})

// jest.mock('rect-native-gesture-handler', () => {
//     const GestureHandler = jest.requireActual('react-native-gesture-handler')
// })
