
jest.mock('react-native-gesture-handler', () => {
    const mockGestureHandler = {
        GestureHandlerRootView: ({ children }) => children,
        GestureDetector: ({ children }) => children,
        Gesture: {
            Pan: jest.fn().mockImplementation(() => ({
                onBegin: jest.fn(),
                onUpdate: jest.fn(),
                onEnd: jest.fn(),
                onFinalize: jest.fn(),
            })),
        },
        State: {
            UNDETERMINED: 0,
            FAILED: 1,
            BEGAN: 2,
            CANCELLED: 3,
            ACTIVE: 4,
            END: 5,
        },
        Directions: {
            RIGHT: 1,
            LEFT: 2,
            UP: 3,
            DOWN: 4,
        },
    }

    return mockGestureHandler
})

jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    Reanimated.runOnJS = fn => fn

    return Reanimated
})
