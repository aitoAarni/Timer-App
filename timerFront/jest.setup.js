require('react-native-reanimated').setUpTests()
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    Reanimated.runOnJS = fn => fn
    ;(Reanimated.clamp = (value, leftClamp, rightClamp) => {
        if (value > rightClamp) return rightClamp
        if (value < leftClamp) return leftClamp
        return value
    }),
        (Reanimated.withTiming = value => value)
    Reanimated.withDelay = (delay, value) => value

    return Reanimated
})
