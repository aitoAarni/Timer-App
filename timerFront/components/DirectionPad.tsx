import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'

interface DirectionPadProps {
    children?: ReactNode
}

function DirectionPad({ children }: DirectionPadProps) {
    const offset = useSharedValue<number>(0)

    const pan = Gesture.Pan()
        .onUpdate(event => {
            offset.value = event.translationX
            console.log(event)
        })
        .onFinalize(event => {
            offset.value = withSpring(0)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: offset.value,
            },
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
    animatedStick: { justifyContent: 'center', alignItems: 'center' },
})

export default DirectionPad
