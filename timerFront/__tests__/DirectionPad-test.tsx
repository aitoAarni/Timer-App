import { render } from '@testing-library/react-native'
import {
    GestureHandlerRootView,
    PanGesture,
    State,
} from 'react-native-gesture-handler'
import {
    fireGestureHandler,
    getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils'
import DirectionPad from '@/components/DirectionPad'

const mockTest = jest.fn().mockImplementationOnce(() => {
    console.log('heyyyooooooooooo')
})

jest.mock('react-native-gesture-handler', () => {
    const GestureHandler = jest.requireActual(
        'react-native-gesture-handler/mock'
    )

    GestureHandler.Gesture = {
        Pan: () => ({
            onBegin: jest.fn().mockReturnThis(),
            onUpdate: mockTest,
            onEnd: jest.fn().mockReturnThis(),
            onFinalize: jest.fn().mockReturnThis(),
        }),
        Tap: () => ({
            onBegin: jest.fn().mockReturnThis(),
            onEnd: jest.fn().mockReturnThis(),
        }),
    }

    return GestureHandler
})

jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    Reanimated.runOnJS = (fn: (...args: any[]) => any) => fn

    return Reanimated
})

describe('DirectionPad', () => {
    it.only('triggers the onRight callback when swiped to the right', () => {
        const mockOnRight = jest.fn()
        console.log('lil sheeeshhhhhh')
        render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight} />
            </GestureHandlerRootView>
        )

        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN, translationX: 0 },
            { state: State.ACTIVE, translationX: 10 },
            { translationX: 20 },
            { translationX: 20 },
            { state: State.END, translationX: 30 },
        ])

        expect(mockOnRight).toHaveBeenCalledTimes(1)
    })
})
