import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { initializeDatabase } from '@/storage/local/db'
import { useEffect, useState } from 'react'

export default function StatisticsView() {
    const [data, setData] = useState<object[]>([])
    useEffect(() => {
        const getData = async () => {
            try {
                await initializeDatabase()
                const d = []
                setData(d)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        getData()
    }, [])
    console.log(data)
    return (
        <View>
            <Text>{}</Text>
            <Text>statimtiks</Text>
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
