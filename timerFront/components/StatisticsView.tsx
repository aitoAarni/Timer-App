import { StyleSheet, View } from 'react-native'
import Text from './Text'
import {
    createTables,
    dropTimerDatabase,
    dropUsersDatabase,
    initializeDatabase,
    logTableSchema,
} from '@/storage/local/db'
import { useEffect, useState } from 'react'
import { getUsers, insertUser } from '@/storage/local/userQueries'
import { getAllTimes, insertTime } from '@/storage/local/timerQueries'
import { TimeLogged } from '@/types'

export default function StatisticsView() {
    const [data, setData] = useState<TimeLogged[]>([])
    useEffect(() => {
        const getData = async () => {
            try {
                const db = await initializeDatabase()
                const users = await getUsers(db)
                console.log('users: ', users)
                const user_id = users[0]?.id
                console.log('user_id: ', user_id)
                await insertTime(db, 10000, 1, user_id)
                const times = await getAllTimes(db)
                setData(times)
            } catch (error) {
                console.log('helooo')
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
