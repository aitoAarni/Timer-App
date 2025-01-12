import { render } from '@testing-library/react-native'
import {
    GestureHandlerRootView,
    PanGesture,
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
        const { toJSON } = render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight}>
                    <Text>00:04</Text>
                </DirectionPad>
            </GestureHandlerRootView>
        )
        console.log(toJSON())

        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { translationX: 100 },
        ])

        expect(mockOnRight).toHaveBeenCalledTimes(1)
    })
})
