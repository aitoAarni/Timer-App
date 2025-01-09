import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    clamp,
} from 'react-native-reanimated'

interface DirectionPadProps {
    children?: ReactNode
}

function DirectionPad({ children }: DirectionPadProps) {
    const movementClamp = 100
    const offsetX = useSharedValue<number>(0)
    const offsetY = useSharedValue<number>(0)

    const pan = Gesture.Pan()
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
            if (offsetX.value == movementClamp) {
                console.log('oikee')
            } else if (offsetX.value == -movementClamp) {
                console.log('vasen')
            }
            if (offsetY.value == movementClamp) {
                console.log('ala')
            } else if (offsetY.value == -movementClamp) {
                console.log('ykä')
            }
            offsetX.value = withSpring(0)
            offsetY.value = withSpring(0)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    }))
    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.animatedStick, animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    animatedStick: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default DirectionPad
