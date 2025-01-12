import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    clamp,
    runOnJS,
    withDelay,
    withTiming,
} from 'react-native-reanimated'

interface DirectionPadProps {
    children?: ReactNode
    onUp?: () => void
    onRight?: () => void
    onDown?: () => void
    onLeft?: () => void
}

function DirectionPad({
    children,
    onUp,
    onRight,
    onDown,
    onLeft,
}: DirectionPadProps) {
    const movementClamp = 100
    const offsetX = useSharedValue<number>(0)
    const offsetY = useSharedValue<number>(0)
    const pan = Gesture.Pan()
        .onBegin(event => {})
        .onUpdate(event => {
            offsetX.value = clamp(
                event.translationX,
                -movementClamp,
                movementClamp
            )

            offsetY.value = clamp(
                event.translationY,
                -movementClamp,
                movementClamp
            )
        })
        .onFinalize(event => {
            if (offsetX.value == movementClamp && onRight) {
                runOnJS(onRight)()
            } else if (offsetX.value == -movementClamp && onLeft) {
                runOnJS(onLeft)()
            }
            if (offsetY.value == movementClamp && onDown) {
                runOnJS(onDown)()
            } else if (offsetY.value == -movementClamp && onUp) {
                runOnJS(onUp)()
            }
            offsetX.value = withDelay(150, withTiming(0))
            offsetY.value = withDelay(150, withTiming(0))
        })

    pan.withTestId('pan')
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    }))
    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                testID="animated-view"
                style={[styles.animatedStick, animatedStyle]}
            >
                {children}
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    animatedStick: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default DirectionPad
