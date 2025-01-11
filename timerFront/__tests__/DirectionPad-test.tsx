import { render } from '@testing-library/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { fireGestureHandler } from 'react-native-gesture-handler/jest-utils'
import DirectionPad from '@/components/DirectionPad'
jest.mock('react-native-reanimated', () => {
    const Reanimated = jest.requireActual('react-native-reanimated/mock')

    Reanimated.runOnJS = (fn: (...args: any[]) => any) => fn

    return Reanimated
})

describe('DirectionPad', () => {
    it.only('renders correctly', () => {
        const { getByTestId } = render(
            <GestureHandlerRootView>
                <DirectionPad />
            </GestureHandlerRootView>
        )

        expect(getByTestId('direction-pad')).toBeTruthy()
    })
    it.only('triggers the onRight callback when swiped to the right', () => {
        const mockOnRight = jest.fn()

        const { getByTestId } = render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight} />
            </GestureHandlerRootView>
        )

        fireGestureHandler(getByTestId('direction-pad'), [
            { translationX: 0, state: 2 }, // BEGIN
            { translationX: 50, state: 4 }, // ACTIVE
            { translationX: 100, state: 5 }, // END
        ])

        expect(mockOnRight).toHaveBeenCalledTimes(1)
    })
})
