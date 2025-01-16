import { Text } from 'react-native'

export const DataPointLabel = (val: string) => {
    return (
        <Text
            style={{
                flexGrow: 1,
                color: 'gray',
                fontSize: 20,
                fontWeight: 'bold',
            }}
        >
            {val}
        </Text>
    )
}
