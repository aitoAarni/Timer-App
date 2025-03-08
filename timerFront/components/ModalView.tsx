import { useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '@/theme'
import { LoginButton, LogoutButton, ProfileButton } from './ModalButtons'
import useLoggedIn from '@/hooks/useLoggedIn'
import Feather from '@expo/vector-icons/Feather'


export default function ModalView() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const loggedIn = useLoggedIn()
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <View testID="modal-view">
            <TouchableOpacity
                style={sytles.openModalButton}
                onPress={openModal}
            >
                <Feather name="menu" size={35} color={theme.colors.text} />
            </TouchableOpacity>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                presentationStyle="overFullScreen"
                onRequestClose={closeModal}
            >
                <View style={sytles.transparentContainer}>
                    <TouchableOpacity
                        testID="outside-modal"
                        style={sytles.transparentPressable}
                        onPress={closeModal}
                    ></TouchableOpacity>
                </View>
                <View style={sytles.modalContainer}>
                    {loggedIn && <ProfileButton closeModal={closeModal} />}
                    {loggedIn ? (
                        <LogoutButton />
                    ) : (
                        <LoginButton closeModal={closeModal} />
                    )}
                </View>
            </Modal>
        </View>
    )
}

const sytles = StyleSheet.create({
    transparentContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        opacity: 0.5,
    },
    transparentPressable: { flex: 1 },
    modalContainer: { backgroundColor: '#222', paddingVertical: 20 },
    openModalButton: { marginLeft: 20, marginBottom: 20 },
})
