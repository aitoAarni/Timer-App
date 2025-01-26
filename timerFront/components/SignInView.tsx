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
import { useState } from 'react'
import * as yup from 'yup'

interface Inputs {
    username: string
    password: string
    verifyPassword: string
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Must be at least 3 characters long')
        .max(20, 'Cannot exceed 20 characters')
        .required('Required field'),
    password: yup
        .string()
        .min(8, 'Must be at least 8 characters long')
        .max(25, 'Cannot exceed 20 characters')
        .required('Required field'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords don't match")
        .required('Required field'),
})

export default function SignInView() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(validationSchema), // Use yupResolver with the validation schema

        defaultValues: {
            username: '',
            password: '',
            verifyPassword: '',
        },
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

            <Text style={styles.text}>Verify password:</Text>
            <Controller
                control={control}
                name="verifyPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        secureTextEntry
                        maxLength={25}
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="verify password"
                    />
                )}
            />
            {errors.verifyPassword && (
                <Text fontSize={12} color={theme.colors.error}>
                    {errors.verifyPassword.message}
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
    header: {
        fontSize: 30,
        marginBottom: 50,
        marginTop: 10,
        alignSelf: 'center',
    },
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
function yupResolver(
    validationSchema: yup.ObjectSchema<
        { username: string; password: string; confirmPassword: string },
        yup.AnyObject,
        {
            username: undefined
            password: undefined
            confirmPassword: undefined
        },
        ''
    >
): import('react-hook-form').Resolver<Inputs, any> | undefined {
    throw new Error('Function not implemented.')
}
