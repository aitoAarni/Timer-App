import {
    TextInput,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Text from './Text'
import theme from '@/theme'
import ErrorBox from './ErrorBox'
import { useEffect, useState } from 'react'

interface Inputs {
    username: string
    password: string
}

const rules = {
    username: {
        required: 'Username is required',
        minLength: {
            value: 3,
            message: 'Username must be at least 3 characters long',
        },
        maxLength: {
            value: 20,
            message: 'Username cannot exceed 20 characters',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
        },
        maxLength: {
            value: 25,
            message: 'Password cannot exceed 25 characters',
        },
    },
}

const width = Dimensions.get('window').width

export default function SignInView() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    useEffect(() => {
        setErrorMessage('errorii nääs')
    }, [])
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }
    return (
        <View style={styles.container}>
            <ErrorBox
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <Text style={styles.header}>Create an account</Text>
            <Text style={styles.text}>Username:</Text>
            <Controller
                control={control}
                rules={rules.username}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        maxLength={20}
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="username"
                    />
                )}
            />
            <Text fontSize={12} color={theme.colors.error}>
                {errors.username?.message ?? ''}
            </Text>
            <Text style={styles.text}>Password:</Text>
            <Controller
                control={control}
                rules={rules.password}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        secureTextEntry
                        maxLength={25}
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="password"
                    />
                )}
            />
            {errors.password && (
                <Text fontSize={12} color={theme.colors.error}>
                    {errors.password.message}
                </Text>
            )}

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
    },
    text: { fontSize: 20, color: theme.colors.grayLight },
    button: { width: '100%', color: theme.colors.grayLight, fontSize: 30 },
})
