import { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '@/theme'


interface ErrorBoxProps {
    errorMessage: string | null
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

const ErrorBox = ({ errorMessage, setErrorMessage }: ErrorBoxProps) => {
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(null)
            }, 5_000)
        }
    }, [errorMessage, setErrorMessage])
    if (!errorMessage) {
        return null
    }
    return (
        <View style={styles.container}>
            <Text fontSize={20}>{errorMessage}</Text>
        </View>
    )
}

export default ErrorBox

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: theme.colors.error,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        zIndex: 999,
        elevation: 10,
        shadowColor: '#000',
    },
})
