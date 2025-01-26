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
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage(null)
        }, 5_000)

        return () => clearTimeout(timer)
    }, [errorMessage, setErrorMessage])

    if (!errorMessage) return null
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
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
})
