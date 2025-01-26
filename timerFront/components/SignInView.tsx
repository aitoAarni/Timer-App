import {
    TextInput,
    View,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Text from './Text'
import theme from '@/theme'

interface Inputs {
    username: string
    password: string
    email?: string
}

const width = Dimensions.get('window').width

export default function SignInView() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create an account</Text>
            <Text style={styles.text}>Username:</Text>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="username"
                    />
                )}
            />
            <Text style={styles.text}>Password:</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="password"
                    />
                )}
            />
            <Text style={styles.text}>Email:</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="email"
                    />
                )}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    header: { fontSize: 30, marginBottom: 15, marginTop: 10 },
    input: {
        color: 'white',
        width: '100%',
        fontSize: 30,
        borderWidth: 1,
        borderColor: theme.colors.grayLight,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 15,
    },
    text: { fontSize: 20, color: theme.colors.grayLight },
    button: { width: '100%', color: theme.colors.grayLight, fontSize: 30 },
})
