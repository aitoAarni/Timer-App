import { transform } from '@babel/core'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'

function DirectionPad({}) {
    const offset = useSharedValue<{ x: number; y: number }>({ x: 0, y: 0 })

    const pan = Gesture.Pan()
        .onChange(event => {
            offset.value.x = event.translationX
            offset.value.y = event.translationY
            
        })
        .onFinalize(event => {
            offset.value.y = withSpring(0)
            offset.value.x = withSpring(0)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: offset.value.x,
            },
            { translateY: offset.value.y },
        ],
    }))
    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[styles.animatedStick, animatedStyle]}
            ></Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    animatedStick: { backgroundColor: 'green', width: 50, height: 50 },
})

export default DirectionPad
