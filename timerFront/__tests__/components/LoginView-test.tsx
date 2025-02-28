import React from 'react'
import {
    render,
    fireEvent,
    waitFor,
    screen,
} from '@testing-library/react-native'
import LogInView from '@/components/LogInView'

let mockLogin: jest.Mock
let mockUseLogIn = jest.fn()
jest.mock('@/hooks/useLogIn', () => {
    return () => {
        return mockUseLogIn()
    }
})

let mockGetUsers: jest.Mock
jest.mock('@/storage/local/userQueries', () => ({
    getUsers: () => {
        return mockGetUsers()
    },
}))

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
describe('LogInView', () => {
    let mockRouter: { push: jest.Mock; back: jest.Mock; canGoBack: jest.Mock }
    let mockSetLogin: jest.Mock
    beforeEach(() => {
        mockLogin = jest.fn().mockResolvedValue(true)
        mockUseLogIn.mockReturnValue(mockLogin)
        mockGetUsers = jest
            .fn()
            .mockResolvedValue([
                { id: 1, username: 'testuser', password: 'password' },
            ])
        mockRouter = {
            push: jest.fn(),
            back: jest.fn(),
            canGoBack: jest.fn().mockReturnValue(false),
        }
        mockUseRouter.mockReturnValue(mockRouter)

        mockSetLogin = jest.fn()
    })

    it('renders correctly', async () => {
        render(<LogInView setLogin={mockSetLogin} />)

        expect(screen.getByText('Log In')).toBeTruthy()
        expect(screen.getByPlaceholderText('username')).toBeTruthy()
        expect(screen.getByPlaceholderText('password')).toBeTruthy()
        expect(screen.getByText('Login')).toBeTruthy()
        expect(screen.getByText('Create an account')).toBeTruthy()

        await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1))
    })

    it('shows validation errors when fields are empty', async () => {
        render(<LogInView setLogin={mockSetLogin} />)

        fireEvent.press(screen.getByText('Login'))
        await waitFor(() => {
            expect(screen.getAllByText('Required field')).toHaveLength(2)
        })
    })

    it('logs in successfully and navigates', async () => {
        render(<LogInView setLogin={mockSetLogin} />)

        fireEvent.changeText(
            screen.getByPlaceholderText('username'),
            'validUser'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('password'),
            'validPass'
        )
        fireEvent.press(screen.getByText('Login'))

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('validUser', 'validPass')
            expect(mockRouter.push).toHaveBeenCalledWith('/')
        })
    })

    it('shows an error message when login fails', async () => {
        mockLogin.mockResolvedValue(false)

        render(<LogInView setLogin={mockSetLogin} />)

        fireEvent.changeText(
            screen.getByPlaceholderText('username'),
            'invalidUser'
        )
        fireEvent.changeText(
            screen.getByPlaceholderText('password'),
            'wrongPass'
        )
        fireEvent.press(screen.getByText('Login'))

        await waitFor(() => {
            expect(screen.getByTestId('mock-error-box')).toBeTruthy()
        })
    })

    it('logs in an existing user from the FlatList', async () => {
        mockLogin.mockResolvedValue(true)

        const { getByText, findByText } = render(
            <LogInView setLogin={mockSetLogin} />
        )

        await waitFor(() => {
            fireEvent.press(getByText('testuser'))
        })

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('testuser', 'password')
            expect(mockRouter.push).toHaveBeenCalledWith('/')
        })
    })

    it('calls setLogin(false) when "Create an account" is pressed', () => {
        render(<LogInView setLogin={mockSetLogin} />)

        fireEvent.press(screen.getByText('Create an account'))

        expect(mockSetLogin).toHaveBeenCalledWith(false)
    })
})
