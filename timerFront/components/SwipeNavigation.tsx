import { ReactNode, useState } from 'react'
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'

interface SwipeNavigationProps {
    registerSwipe?: boolean
    rightSwipeCallback?: () => void | null
    leftSwipeCallback?: () => void | null
    children?: ReactNode
    swipeDelta?: number
    style?: StyleProp<ViewStyle>
}

export default function SwipeNavigation({
    rightSwipeCallback,
    leftSwipeCallback,
    children,
    style,
    registerSwipe = true,
    swipeDelta = 50,
}: SwipeNavigationProps) {
    const [touchStartX, setTouchStartX] = useState(0)

    const onTouchStart = (event: GestureResponderEvent) => {
        const startX = event.nativeEvent.pageX
        setTouchStartX(startX)
    }
    const onTouchEnd = (event: GestureResponderEvent) => {
        if (!registerSwipe) return
        const endX = event.nativeEvent.pageX
        const currentSwipeDelta = endX - touchStartX
        if (currentSwipeDelta > swipeDelta && leftSwipeCallback) {
            leftSwipeCallback()
            return
        }
        if (currentSwipeDelta < -swipeDelta && rightSwipeCallback) {
            rightSwipeCallback()
            return
        }
    }

    return (
        <View
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={[styles.container, style]}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({ container: { flex: 1 } })
