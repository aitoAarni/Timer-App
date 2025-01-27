import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import theme from '@/theme'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import ErrorBox from './ErrorBox'

const validationSchema = yup.object().shape({
    username: yup.string().required('Required field'),
    password: yup.string().required('Required field'),
})

interface Inputs {
    username: string
    password: string
}

export default function LogInView() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        delayError: 1,
        resolver: yupResolver(validationSchema),
        defaultValues: { username: '', password: '' },
    })
    const onSubmit = async () => {}

    return (
        <View style={styles.container}>
            <ErrorBox
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
            />
            <Text style={styles.header}>Log In</Text>
            <Text style={styles.text}>Username:</Text>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="username"
                        maxLength={20}
                        placeholderTextColor={theme.colors.grayLight}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Text fontSize={15} color={theme.colors.error}>
                {errors.username?.message ?? ''}
            </Text>
            <Text style={styles.text}>Password:</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        maxLength={25}
                        placeholder="Password"
                        placeholderTextColor={theme.colors.grayLight}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                    />
                )}
            />
            <Text fontSize={15} color={theme.colors.error}>
                {errors.password?.message ?? ''}
            </Text>
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
