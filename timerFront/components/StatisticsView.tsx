import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { querlyDb } from '@/storage/local/db'
import { SetStateAction, useEffect, useState } from 'react'

export default function StatisticsView() {
    const [data, setData] = useState<SetStateAction<object>[]>([])
    useEffect(() => {
        const getData = async () => {
            const d: object[] = await querlyDb()
            setData(d)
        }
        getData()
    })
    console.log(data)
    return (
        <View>
            <Text>{}</Text>
            <Text>statimtiks</Text>
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
