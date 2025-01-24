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
    if ((errorMessage = null)) return null
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5_000)
    }, [errorMessage])

    return (
        <View style={styles.container}>
            <Text>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.error,
        width: screenWidth,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
