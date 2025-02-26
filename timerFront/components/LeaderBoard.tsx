import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import Text from './Text'
import { formatTime } from '@/utils/format'
import theme from '@/theme'
import { getRankings } from '@/services/rankingServices'
import { useEffect, useRef, useState } from 'react'

interface LeaderBoardProps {
    userId: string | null
}

export default function LeaderBoard({ userId }: LeaderBoardProps) {
    if (!userId) return
    const [rankings, setRankings] = useState<Rankings | null>(null)

    const rankPercentage = rankings && Math.round(
        (rankings.userRank / rankings.totalParticipants) * 100
    )
    useEffect(() => {
            console.log('fetching rankings')
            refreshData()
        
    }, [])
    const refreshData = async () => {
        const fetchedRankings = await getRankings(userId, '2025-02-26')
        setRankings(fetchedRankings)
        console.log(rankings)
    }

    return rankings ? (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Your rank ({rankings.userRank}/{rankings.totalParticipants}) top{' '}
                {rankPercentage}%
            </Text>
            <TouchableOpacity onPress={refreshData}>
                <Text fontSize={29}>refresh</Text>
            </TouchableOpacity>
            {rankings && (
                <FlatList
                    data={rankings.nearbyUsers}
                    renderItem={({ item }) => (
                        <Item item={item} currentUserId={userId} />
                    )}
                    keyExtractor={item => item.user_id}
                />
            )}
        </View>
    ) : (
        <ActivityIndicator style={styles.container} />
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
    container: { flex: 1, marginTop: 30 },
    headerText: { fontSize: 24, marginBottom: 15 },
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

