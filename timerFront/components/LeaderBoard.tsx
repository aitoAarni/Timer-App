import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'
import { formatTime } from '@/utils/format'
import theme from '@/theme'

interface LeaderBoardProps {
    userId: string | null
}

export default function LeaderBoard({ userId }: LeaderBoardProps) {
    const rankPercentage = Math.round(
        (data.userRank / data.totalParticipants) * 100
    )
    const refreshData = () => {}
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Your rank ({data.userRank}/{data.totalParticipants}) top{' '}
                {rankPercentage}%
            </Text>
            <TouchableOpacity onPress={refreshData}>
                <Text fontSize={29}>refresh</Text>
            </TouchableOpacity>
            <FlatList
                data={data.nearbyUsers}
                renderItem={({ item }) => (
                    <Item item={item} currentUserId={userId} />
                )}
                keyExtractor={item => item.user_id}
            />
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

const data = {
    userRank: 4,
    userDuration: 5632,
    nearbyUsers: [
        {
            rank: 1,
            user_id: '67bf056ba68f3fc0c9f952c4',
            username: 'username',
            duration: 10056,
        },
        {
            rank: 2,
            user_id: '67bf05d3a68f3fc0c9f952cf',
            username: 'Lil killah',
            duration: 7340,
        },
        {
            rank: 3,
            user_id: '67b628d7c22cdf7238ba76aa',
            username: 'bro',
            duration: 5632,
        },
        {
            rank: 4,
            user_id: '67bf09c814b56599a177c9e9',
            username: 'bruh boi',
            duration: 2253,
        },
        {
            rank: 5,
            user_id: 'e67b628d7c22cdf7238ba76aa',
            username: 'bro5',
            duration: 632,
        },
        {
            rank: 6,
            user_id: '667b628d7c22cdf7238ba76aa',
            username: 'brosef',
            duration: 622,
        },
        {
            rank: 7,
            user_id: '67eb628d7c22cdf7238ba76aa',
            username: 'brosefssor',
            duration: 32,
        },
    ],
    totalParticipants: 7,
}
