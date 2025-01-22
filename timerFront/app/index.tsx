import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import TimerView from '@/components/TimerView'
import theme from '@/theme'
import {
    Dispatch,
    SetStateAction,
    useContext,
    useState,
    useRef,
    useEffect,
} from 'react'
import { SettingsContext } from '@/contexts/SettingsContext'
import { Settings } from '@/types'
import { useDatabase } from '@/contexts/DatabaseContext'
import { getUserId } from '@/services/user'
import Timer from '@/utils/timers'
import TimeLogger from '@/utils/logger'

export default function HomePage() {
 

    return (
        <View style={styles.container}>
            <TimerView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
