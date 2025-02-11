import theme from '@/theme'
import { ReactNode, useState } from 'react'
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'
import {
    Directions,
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'

interface SwipeNavigationProps {
    registerSwipe?: boolean
    rightSwipeCallback?: () => void | undefined
    leftSwipeCallback?: () => void | undefined
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

function SwipeNavigation({
    rightSwipeCallback,
    leftSwipeCallback,
    children,
    style,
    registerSwipe = true,
}: SwipeNavigationProps) {
    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(_ => {
            if (leftSwipeCallback && registerSwipe) {
                runOnJS(leftSwipeCallback)()
            }
        })
    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(_ => {
            if (rightSwipeCallback && registerSwipe) {
                runOnJS(rightSwipeCallback)()
            }
        })
    const composed = Gesture.Race(flingLeft, flingRight)

    return (
        <GestureDetector gesture={composed}>
            <View style={[styles.container, style]}>{children}</View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
})

export default SwipeNavigation
