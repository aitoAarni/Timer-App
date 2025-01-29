import { useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'
import React from 'react'
import theme from '@/theme'

export default function ModalView() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const 
    const onPress = () => {
        setShowModal(!showModal)
    }
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <Text fontSize={20}>open modal</Text>
            </TouchableOpacity>
            <Modal
                visible={showModal}
                transparent={true}
                presentationStyle="overFullScreen"
                // statusBarTranslucent
            >
                <View style={sytles.transparentContainer}></View>
                <View style={sytles.modalContainer}>
                    <Text color="green">jouuuuu</Text>

                    <TouchableOpacity onPress={onPress}>
                        <Text fontSize={20} color="purple">
                            close modal
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

const sytles = StyleSheet.create({
    transparentContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        opacity: 0.5,
    },
    modalContainer: { flex: 1, backgroundColor: theme.colors.grayLight },
})
