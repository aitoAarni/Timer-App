import { StyleSheet, View } from 'react-native'
import Text from './Text'

import { useEffect, useState } from 'react'
import { getUsers } from '@/storage/local/userQueries'
import { getAllTimes, insertTime } from '@/storage/local/timerQueries'
import { TimeLogged } from '@/types'
import { useDatabase } from '@/contexts/DatabaseContext'

export default function StatisticsView() {
    const [data, setData] = useState<TimeLogged[]>([])
    const db = useDatabase()
    useEffect(() => {
        const getData = async () => {
            try {
                const users = await getUsers(db)
                console.log('users: ', users)
                const user_id = users[0].id
                await insertTime(db, 10000, 1, user_id)
                const times = await getAllTimes(db)
                setData(times)
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
