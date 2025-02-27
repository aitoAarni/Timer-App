import React from 'react'
import { render, screen, waitFor } from '@testing-library/react-native'
import ErrorBox from '@/components/ErrorBox'

describe('ErrorBox', () => {
    it('should not render when errorMessage is null', () => {
        const setErrorMessage = jest.fn()
        const { queryByText } = render(
            <ErrorBox errorMessage={null} setErrorMessage={setErrorMessage} />
        )
        expect(queryByText(/./)).toBeNull()
    })

    it('should display the error message when provided', () => {
        const setErrorMessage = jest.fn()
        render(
            <ErrorBox
                errorMessage="Test Error"
                setErrorMessage={setErrorMessage}
            />
        )
        expect(screen.getByText('Test Error')).toBeTruthy()
    })

    it('should call setErrorMessage(null) after 5 seconds', async () => {
        jest.useFakeTimers()
        const setErrorMessage = jest.fn()

        render(
            <ErrorBox
                errorMessage="Timeout Error"
                setErrorMessage={setErrorMessage}
            />
        )

        expect(screen.getByText('Timeout Error')).toBeTruthy()

        jest.advanceTimersByTime(5000) // Simulate 5 seconds passing

        await waitFor(() => {
            expect(setErrorMessage).toHaveBeenCalledWith(null)
        })

        jest.useRealTimers()
    })
})
