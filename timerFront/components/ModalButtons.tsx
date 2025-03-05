import { useRouter } from 'expo-router'
import { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'
import theme from '@/theme'
import logout from '@/services/logoutService'

const ModalButton = ({ children }: { children: ReactNode }) => {
    return <View style={styles.modalButton}>{children}</View>
}

interface ModalButtonProps {
    closeModal: () => void
}

export function LoginButton({ closeModal }: ModalButtonProps) {
    const router = useRouter()
    const onPress = () => {
        closeModal()
        router.push('/login')
    }
    return (
        <ModalButton>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </ModalButton>
    )
}

export function LogoutButton() {
    const onPress = () => {
        logout()
    }
    return (
        <ModalButton>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ModalButton>
    )
}

export function ProfileButton({ closeModal }: ModalButtonProps) {
    const router = useRouter()
    const onPress = () => {
        closeModal()
        router.push('/profile')
    }
    return (
        <ModalButton>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
        </ModalButton>
    )
}

const styles = StyleSheet.create({
    modalButton: {
        width: '100%',
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    buttonText: { fontSize: 22, color: theme.colors.grayLight },
    touchableOpacity: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
    },
})
