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
import Text from '@/components/Text'

describe('DirectionPad', () => {
    it.only('triggers the onRight callback when swiped to the right', () => {
        const mockOnRight = jest.fn()
        const { debug } = render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight}>
                    <Text>00:04</Text>
                </DirectionPad>
            </GestureHandlerRootView>
        )
        debug()
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationX: 100 },
            { state: State.END },
        ])

        expect(mockOnRight).toHaveBeenCalledTimes(1)
    })
})
