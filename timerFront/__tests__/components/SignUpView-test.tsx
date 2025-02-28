import React from 'react'
import {
    render,
    fireEvent,
    waitFor,
    screen,
} from '@testing-library/react-native'
import SignInView from '@/components/SignUpView'

let mockCreateUser = jest.fn()
jest.mock('@/services/userServices', () => {
    return (...args) => mockCreateUser(...args)
})

let mockUseLogIn = jest.fn()
jest.mock('@/hooks/useLogIn', () => {
    return () => mockUseLogIn
})

let mockUseRouter = jest.fn()
jest.mock('expo-router', () => ({
    useRouter: (...args) => {
        return mockUseRouter(...args)
    },
}))

jest.mock('@/components/ErrorBox', () => {
    const { Text } = require('react-native')
    return ({ errorMessage }: { errorMessage: string | null }) => {
        return errorMessage ? (
            <Text testID="mock-error-box">{errorMessage}</Text>
        ) : null
    }
})

describe('SignInView', () => {
    let mockRouter: { push: jest.Mock; back: jest.Mock; canGoBack: jest.Mock }
    let mockSetLogin: jest.Mock
    beforeEach(() => {
        mockCreateUser.mockReset()
        mockUseLogIn.mockReset()

        mockRouter = {
            push: jest.fn(),
            back: jest.fn(),
            canGoBack: jest.fn().mockReturnValue(false),
        }
        mockUseRouter.mockReturnValue(mockRouter)
        mockSetLogin = jest.fn()
    })

    it('renders correctly', () => {
        render(<SignInView setLogin={mockSetLogin} />)
        expect(screen.getByText('Create an account')).toBeTruthy()
        expect(screen.getByPlaceholderText('username')).toBeTruthy()
        expect(screen.getByPlaceholderText('password')).toBeTruthy()
        expect(screen.getByPlaceholderText('verify password')).toBeTruthy()
    })

    it('shows validation errors when fields are empty', async () => {
        render(<SignInView setLogin={mockSetLogin} />)
        fireEvent.press(screen.getByText('Create'))
        await waitFor(() => {
            expect(screen.getByText('Required field')).toBeTruthy()
            expect(screen.getAllByText(/Must be at least/)).toHaveLength(2)
        })
    })

    it('shows an error message if passwords do not match', async () => {
        render(<SignInView setLogin={mockSetLogin} />)
        fireEvent.changeText(
            screen.getByPlaceholderText('username'),
            'testuser'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('password'),
            'password123'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('verify password'),
            'password456'
        )
        fireEvent.press(screen.getByText('Create'))
        await waitFor(() => {
            expect(screen.getByText("Passwords don't match")).toBeTruthy()
        })
    })

    it('creates a user and logs in successfully', async () => {
        mockCreateUser.mockResolvedValue(true)
        mockUseLogIn.mockResolvedValue(true)

        render(<SignInView setLogin={mockSetLogin} />)
        fireEvent.changeText(
            screen.getByPlaceholderText('username'),
            'testuser'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('password'),
            'password123'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('verify password'),
            'password123'
        )
        fireEvent.press(screen.getByText('Create'))

        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledWith(
                'testuser',
                'password123'
            )
            expect(mockUseLogIn).toHaveBeenCalledWith('testuser', 'password123')
            expect(mockRouter.push).toHaveBeenCalledWith('/')
        })
    })

    it('shows an error when createUser fails', async () => {
        mockCreateUser.mockRejectedValue(new Error('Username must be unique'))

        render(<SignInView setLogin={mockSetLogin} />)
        fireEvent.changeText(
            screen.getByPlaceholderText('username'),
            'testuser'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('password'),
            'password123'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('verify password'),
            'password123'
        )
        fireEvent.press(screen.getByText('Create'))

        await waitFor(() => {
            expect(screen.getByTestId('mock-error-box')).toBeTruthy()
            expect(screen.getByText('Username must be unique')).toBeTruthy()
        })
    })

    it('navigates to login when "Go to login" is pressed', () => {
        render(<SignInView setLogin={mockSetLogin} />)
        fireEvent.press(screen.getByText('Go to login'))
        expect(mockSetLogin).toHaveBeenCalledWith(true)
    })
})
