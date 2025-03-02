import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import ModalView from '@/components/ModalView'
import useLoggedIn from '@/hooks/useLoggedIn'

jest.mock('@/hooks/useLoggedIn', () => jest.fn())

jest.mock('@expo/vector-icons/Feather', () => 'Feather')

jest.mock('@/components/ModalButtons', () => ({
    LoginButton: jest.fn(({ closeModal }) => {
        const { TouchableOpacity } = require('react-native')
        return (
            <TouchableOpacity testID="login-button" onPress={closeModal}>
                Login
            </TouchableOpacity>
        )
    }),
    LogoutButton: jest.fn(() => {
        const { TouchableOpacity } = require('react-native')

        return (
            <TouchableOpacity testID="logout-button">Logout</TouchableOpacity>
        )
    }),
    ProfileButton: jest.fn(({ closeModal }) => {
        const { TouchableOpacity } = require('react-native')

        return (
            <TouchableOpacity testID="profile-button" onPress={closeModal}>
                Profile
            </TouchableOpacity>
        )
    }),
}))

import { TouchableOpacity } from 'react-native'

describe('ModalView', () => {
    it('renders the modal view', () => {
        const { getByTestId } = render(<ModalView />)
        expect(getByTestId('modal-view')).toBeTruthy()
    })

    it('opens modal when menu button is pressed', () => {
        const { getByTestId } = render(<ModalView />)

        const menuButton =
            getByTestId('modal-view').findByType(TouchableOpacity)
        fireEvent.press(menuButton)

        expect(getByTestId('modal-view')).toBeTruthy()
    })

    it('shows login button when user is not logged in', async () => {
        ;(useLoggedIn as jest.Mock).mockReturnValue(false)
        const { getByTestId } = render(<ModalView />)

        const menuButton =
            getByTestId('modal-view').findByType(TouchableOpacity)
        fireEvent.press(menuButton)

        await waitFor(() => expect(getByTestId('login-button')).toBeTruthy())
    })

    it('shows profile and logout buttons when user is logged in', async () => {
        ;(useLoggedIn as jest.Mock).mockReturnValue(true)
        const { getByTestId } = render(<ModalView />)

        const menuButton =
            getByTestId('modal-view').findByType(TouchableOpacity)
        fireEvent.press(menuButton)

        await waitFor(() => {
            expect(getByTestId('profile-button')).toBeTruthy()
            expect(getByTestId('logout-button')).toBeTruthy()
        })
    })

    it('closes modal when pressing outside', async () => {
        ;(useLoggedIn as jest.Mock).mockReturnValue(true)
        const { getByTestId, queryByTestId } = render(<ModalView />)

        const menuButton =
            getByTestId('modal-view').findByType(TouchableOpacity)
        fireEvent.press(menuButton)

        await waitFor(() => expect(getByTestId('profile-button')).toBeTruthy())

        const outsideTouchable = getByTestId('outside-modal')
        fireEvent.press(outsideTouchable)

        await waitFor(
            () => expect(queryByTestId('profile-button')).toBeNull(),
            { timeout: 1000 }
        )
    })
})
