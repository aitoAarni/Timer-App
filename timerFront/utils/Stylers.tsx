import { Text, View } from 'react-native'

export const CustomLabel = (val: string) => {
    return (
        <View
            style={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>{val}</Text>
        </View>
    )
}

export const DataPointLabel = (val: string) => {
    return (
        <Text
            style={{
                color: 'gray',
                fontSize: 20,
                fontWeight: 'bold',
            }}
        >
            {val}
        </Text>
    )
}
