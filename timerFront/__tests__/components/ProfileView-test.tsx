import { render, screen, fireEvent } from '@testing-library/react-native'
import ProfileView from '@/components/ProfileView'
import theme from '@/theme'
import React from 'react'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    Provider: ({ children }: any) => children,
}))

jest.mock('redux-mock-store', () => () => () => ({
    getState: () => ({}),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
}))

const mockUser = {
    username: 'testuser',
    password: 'securepassword',
    created_at: '2024-02-28T12:00:00Z',
}

describe('ProfileView', () => {
    it('renders login message when no user is logged in', () => {
        render(<ProfileView />)
        expect(
            screen.getByText('You must be logged in to see user profile')
        ).toBeTruthy()
    })

    it('renders profile details when a user is logged in', () => {
        (require('react-redux').useSelector as jest.Mock).mockReturnValue(
            mockUser
        )
        render(<ProfileView />)
        expect(screen.getByText('Profile')).toBeTruthy()
        expect(screen.getByText('Username')).toBeTruthy()
        expect(screen.getByText('Created at')).toBeTruthy()
        expect(
            screen.getByText(new Date(mockUser.created_at).toLocaleDateString())
        ).toBeTruthy()
    })

    it('hides password initially and reveals it on press', () => {
        (require('react-redux').useSelector as jest.Mock).mockReturnValue(
            mockUser
        )
        render(<ProfileView />)
        const hiddenPassword = screen.getByText('Click to view')
        expect(hiddenPassword).toBeTruthy()
        fireEvent.press(hiddenPassword)
        expect(screen.getByText(mockUser.password)).toBeTruthy()
    })
})
