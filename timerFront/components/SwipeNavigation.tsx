import { ReactNode, useState } from 'react'
import { StyleSheet, View } from 'react-native'

interface SwipeNavigationProps {
    registerSwipe: boolean
    rightSwipeCallback: () => void | null
    leftSwipeCallback: () => void | null
    children: ReactNode
}

export default function SwipeNavigation({
    registerSwipe,
    rightSwipeCallback,
    leftSwipeCallback,
    children,
}: SwipeNavigationProps) {
    const [touchStartX, setTouchStartX] = useState(0)
    const [touchEndX, setTouchEndX] = useState(0)

    

    return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({ container: { flex: 1 } })
