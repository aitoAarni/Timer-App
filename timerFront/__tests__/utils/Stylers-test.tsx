import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { DataPointLabel } from '@/utils/Stylers'

jest.mock("@/utils/format", () => ({
    formatTotalTime: jest.fn().mockReturnValue("05m")
}))

describe('DataPointLabel', () => {
    it('renders the given text', () => {
        const testValue = 1000  

        render(<DataPointLabel val={testValue} />)

        expect(screen.getByText("05m")).toBeTruthy()
    })
})
