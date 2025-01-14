import { StyleSheet, View } from 'react-native'
import Text from './Text'
import {
    createTables,
    dropTimerDatabase,
    dropUsersDatabase,
    initializeDatabase,
} from '@/storage/local/db'
import { useEffect, useState } from 'react'
import { getUsers, insertUser } from '@/storage/local/userQueries'

export default function StatisticsView() {
    const [data, setData] = useState<object[]>([])
    useEffect(() => {
        const getData = async () => {
            try {
                const db = await initializeDatabase()
                await dropTimerDatabase(db)
                await dropUsersDatabase(db)
                await createTables(db)
                await insertUser(db, 'pekkispoika')
                const users = await getUsers(db)
                setData(users)
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
