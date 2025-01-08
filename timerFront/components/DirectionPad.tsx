import { transform } from '@babel/core'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'

function DirectionPad({}) {
    const offset = useSharedValue<number>(0)

    const pan = Gesture.Pan()
        .onChange(event => {
            offset.value = event.changeX
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
