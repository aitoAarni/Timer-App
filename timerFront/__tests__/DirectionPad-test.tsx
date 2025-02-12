import { render, userEvent } from '@testing-library/react-native'
import {
    Gesture,
    GestureHandlerRootView,
    PanGesture,
    State,
    TapGesture,
} from 'react-native-gesture-handler'
import {
    fireGestureHandler,
    getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils'
import DirectionPad from '@/components/DirectionPad'

describe('DirectionPad', () => {
    it('triggers the onRight callback when swiped right', () => {
        const mockOnRight = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationX: 100 },
            { state: State.END },
        ])
        expect(mockOnRight).toHaveBeenCalledTimes(1)
    })
    it('triggers the onUp callback when swiped up', () => {
        const mockOnUp = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onUp={mockOnUp}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationY: -103 },
            { state: State.END },
        ])
        expect(mockOnUp).toHaveBeenCalledTimes(1)
    })
    it('triggers the onLeft callback when swiped left', () => {
        const mockOnLeft = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onLeft={mockOnLeft}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationX: -111 },
            { state: State.END },
        ])
        expect(mockOnLeft).toHaveBeenCalledTimes(1)
    })
    it('triggers the onDown callback when swiped down', () => {
        const mockOnDown = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onDown={mockOnDown}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.ACTIVE },
            { translationY: 200 },
            { state: State.END },
        ])
        expect(mockOnDown).toHaveBeenCalledTimes(1)
    })

    it('triggers the onTap callback when tapped', () => {
        const mockOnTap = jest.fn()

        render(
            <GestureHandlerRootView>
                <DirectionPad onTap={mockOnTap}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<TapGesture>(getByGestureTestId('tap'), [
            { state: State.ACTIVE },
            { state: State.END },
        ])
        expect(mockOnTap).toHaveBeenCalledTimes(1)
    })

    it('does not triggers the onRight callback when half swiped right', () => {
        const mockOnRight = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onRight={mockOnRight}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationX: 75 },
            { state: State.END },
        ])
        expect(mockOnRight).toHaveBeenCalledTimes(0)
    })
    it('does not triggers the onUp callback when half swiped up', () => {
        const mockOnUp = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onUp={mockOnUp}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationY: -52 },
            { state: State.END },
        ])
        expect(mockOnUp).toHaveBeenCalledTimes(0)
    })
    it('does not triggers the onLeft callback when half swiped left', () => {
        const mockOnLeft = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onLeft={mockOnLeft}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationX: -79 },
            { state: State.END },
        ])
        expect(mockOnLeft).toHaveBeenCalledTimes(0)
    })
    it('does not triggers the onDown callback when half swiped down', () => {
        const mockOnDown = jest.fn()
        render(
            <GestureHandlerRootView>
                <DirectionPad onDown={mockOnDown}></DirectionPad>
            </GestureHandlerRootView>
        )
        fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
            { state: State.BEGAN },
            { state: State.ACTIVE },
            { translationY: 79 },
            { state: State.END },
        ])
        expect(mockOnDown).toHaveBeenCalledTimes(0)
    })
})
