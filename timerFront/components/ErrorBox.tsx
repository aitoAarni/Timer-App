import { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '@/theme'

const screenWidth = Dimensions.get('window').width

interface ErrorBoxProps {
    errorMessage: string | null
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

const ErrorBox = ({ errorMessage, setErrorMessage }: ErrorBoxProps) => {
    if (errorMessage === null) return null
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5_000)
    }, [errorMessage])

    return (
        <View style={styles.container}>
            <Text fontSize={20}>{errorMessage}</Text>
        </View>
    )
}

export default ErrorBox

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.error,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
})
