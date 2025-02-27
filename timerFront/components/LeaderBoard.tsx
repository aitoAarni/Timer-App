import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import Text from './Text'
import { formatTime } from '@/utils/format'
import theme from '@/theme'
import { getRankings } from '@/services/rankingServices'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { formStringDate } from '@/utils/dataHandlers'
import ErrorBox from './ErrorBox'

interface LeaderBoardProps {
    userId: string | null
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function LeaderBoard({
    userId,
    setErrorMessage,
}: LeaderBoardProps) {
    if (!userId) return
    const [rankings, setRankings] = useState<Rankings | null>(null)
    const [dataLoading, setDataLoading] = useState(true)
    const today = new Date()
    const [year, setYear] = useState(String(today.getFullYear()))
    const [month, setMonth] = useState(String(today.getMonth() + 1))
    const [day, setDay] = useState(String(today.getDate()))
    const rankPercentage =
        rankings &&
        Math.round((rankings.userRank / rankings.totalParticipants) * 100)
    useEffect(() => {
        console.log('fetching rankings')
        refreshData()
    }, [])
    const refreshData = async () => {
        const rankingDate = formStringDate(year, month, day)
        if (!rankingDate) {
            setErrorMessage('You set an invalid date')
            return
        }
        try {
            const fetchedRankings = await getRankings(userId, rankingDate)
            setDataLoading(false)
            if (fetchedRankings) {
                setRankings(fetchedRankings)
            } else {
                setRankings(null)
            }
        } catch (error) {
            setDataLoading(false)
            setRankings(null)
        }
        console.log(rankings)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {rankings &&
                    `Your rank (${rankings.userRank}/${rankings.totalParticipants}) top ${rankPercentage}%`}
            </Text>

            <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Year</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YYYY"
                        keyboardType="numeric"
                        maxLength={4}
                        value={year}
                        onChangeText={setYear}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Month</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="MM"
                        keyboardType="numeric"
                        maxLength={2}
                        value={month}
                        onChangeText={setMonth}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Day</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="DD"
                        keyboardType="numeric"
                        maxLength={2}
                        value={day}
                        onChangeText={setDay}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={refreshData}>
                    <AntDesign name="check" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {!dataLoading ? (
                rankings ? (
                    <FlatList
                        data={rankings.nearbyUsers}
                        renderItem={({ item }) => (
                            <Item item={item} currentUserId={userId} />
                        )}
                        keyExtractor={item => item.user_id}
                    />
                ) : (
                    <Text fontSize={20}>
                        You don't have a ranking for thisdate
                    </Text>
                )
            ) : (
                <ActivityIndicator style={styles.container} />
            )}
        </View>
    )
}

interface ItemProps {
    rank: number
    user_id: string
    username: string
    duration: number
}

const Item = ({
    item,
    currentUserId,
}: {
    item: ItemProps
    currentUserId: string | null
}) => {
    return (
        <View
            style={[
                styles.itemContainer,
                item.rank % 2 === 0
                    ? {
                          backgroundColor: theme.colors.grayDark,
                      }
                    : null,
            ]}
        >
            <Text
                style={[
                    styles.itemText,
                    item.user_id === currentUserId
                        ? {
                              color: theme.colors.highlight,
                          }
                        : null,
                ]}
            >
                {item.rank}
            </Text>
            <Text
                style={[
                    styles.itemText,
                    item.user_id === currentUserId
                        ? {
                              color: theme.colors.highlight,
                          }
                        : null,
                ]}
            >
                {formatTime(item.duration)}
            </Text>
            <Text
                style={[
                    styles.itemText,
                    item.user_id === currentUserId
                        ? {
                              color: theme.colors.highlight,
                          }
                        : null,
                ]}
            >
                {item.username}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, marginTop: 30 },

    headerText: { fontSize: 24, marginBottom: 1 },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBlock: 10,
    },
    inputGroup: { alignItems: 'center' },
    buttonContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(58, 58, 58)',
        width: 60,
        height: 30,
        borderRadius: 16,
        marginBottom: 10,
    },

    inputLabel: { fontSize: 14, marginBottom: 5, fontWeight: 'bold' },
    textInput: {
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.grayLight,
        borderRadius: 8,
        padding: 8,
        textAlign: 'center',
        fontSize: 18,
        width: 80,
        height: 40,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: { fontSize: 20, flex: 1, color: theme.colors.text },
})

interface NearbyUser {
    rank: number
    user_id: string
    username: string
    duration: number
}

interface Rankings {
    userRank: number
    userDuration: number
    totalParticipants: number
    nearbyUsers: NearbyUser[]
}
