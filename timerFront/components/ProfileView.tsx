import { useSelector } from 'react-redux'
import Text from './Text'
import { RootState } from '@/redux/store'
import theme from '@/theme'
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'
import { useState } from 'react'

export default function ProfileView() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    console.log('user: ', user)
    if (!user) {
        return (
            <Text color={theme.colors.text} fontSize={25}>
                You must be logged in to see user profile
            </Text>
        )
    }
    const date = new Date(user.created_at)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.informationContainer}>
                <Field fieldName="Username" fieldValue={user.username} />
                <Field fieldName="Password" fieldValue={user.password} hide />
                <Field
                    fieldName="Created at"
                    fieldValue={date.toLocaleDateString()}
                />
            </View>
        </View>
    )
}

interface FieldProps {
    fieldName: string
    fieldValue: string
    hide?: boolean
    style?: StyleProp<ViewStyle>
}

const Field = ({ fieldName, fieldValue, hide = false, style }: FieldProps) => {
    const [hideValue, setHideValue] = useState(hide)
    const onPress = () => {
        if (!hide) return
        setHideValue(!hideValue)
    }
    return (
        <View style={[styles.field, style]}>
            <Text style={styles.fieldName}>{fieldName}</Text>
            <TouchableOpacity onPress={onPress}>
                {hideValue ? (
                    <Text style={styles.fieldValue}>Click to view</Text>
                ) : (
                    <Text style={styles.fieldValue}>{fieldValue}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: 20, justifyContent: 'center' },
    header: { fontSize: theme.fontSizes.header, color: theme.colors.text },
    informationContainer: { margin: 20 },
    fieldName: {
        fontSize: 20,
        color: theme.colors.text,
    },
    fieldValue: { fontSize: 20, color: theme.colors.text },
    field: {
        margin: 20,
    },
})
