import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import Text from './Text'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import theme from '@/theme'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import ErrorBox from './ErrorBox'
import useLogIn from '@/useLogIn'
import { useRouter } from 'expo-router'
import { User } from '@/types'
import { useDatabase } from '@/hooks/useDatabase'
import { getUsers } from '@/storage/local/userQueries'

const validationSchema = yup.object().shape({
    username: yup.string().required('Required field'),
    password: yup.string().required('Required field'),
})

interface Inputs {
    username: string
    password: string
}

interface LogInViewProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogInView({ setLogin }: LogInViewProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [users, setUsers] = useState<User[] | null>(null)
    const login = useLogIn()
    const db = useDatabase()
    const router = useRouter()
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

    const logUserIn = async (user: { username: string; password: string }) => {
        try {
            const loggedUser = await login(user.username, user.password)
            if (loggedUser) {
                if (router.canGoBack()) {
                    router.back()
                } else {
                    router.push('/')
                }
            } else {
                setErrorMessage("Username and password don't match")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage('Internal error logging in')
        }
    }
    const onSubmit: SubmitHandler<Inputs> = async values => {
        await logUserIn(values)
    }

    useEffect(() => {
        const getUsersFromDb = async () => {
            const usrs = await getUsers(db)
            setUsers(usrs)
        }
        getUsersFromDb()
    }, [])

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
                        secureTextEntry
                        maxLength={25}
                        placeholder="password"
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
                <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => {
                    setLogin(false)
                }}
            >
                <Text style={styles.button}>Create an account</Text>
            </TouchableOpacity>
            {users && users.length && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    ItemSeparatorComponent={ItemSeparator}
                    data={users}
                    ListHeaderComponent={
                        <Text style={styles.listHeader}>
                            Use and existing account
                        </Text>
                    }
                    renderItem={user => (
                        <Item user={user.item} logUserIn={logUserIn} />
                    )}
                    keyExtractor={user => String(user.id)}
                />
            )}
        </View>
    )
}

interface ItemProps {
    user: User
    logUserIn: (user: { username: string; password: string }) => Promise<void>
}

const Item = ({ user, logUserIn }: ItemProps) => {
    return (
        <TouchableOpacity
            style={styles.listContainer}
            onPress={() => {
                logUserIn(user)
            }}
        >
            <Text style={styles.listText}>{user.username}</Text>
        </TouchableOpacity>
    )
}

const ItemSeparator = () => {
    return <View style={styles.separator}></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    header: {
        fontSize: theme.fontSizes.header,
        marginBottom: 20,
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
    listHeader: {
        fontSize: 24,
        color: theme.colors.grayLight,
        marginBottom: 20,
    },
    separator: { height: 20 },
    listContainer: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.grayLight,
    },
    listText: { fontSize: 30, color: theme.colors.grayLight },
    flatList: { alignSelf: 'center', marginTop: 30 },
})
