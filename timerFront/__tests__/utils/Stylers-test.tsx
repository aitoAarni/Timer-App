import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { DataPointLabel } from '@/utils/Stylers'

describe('DataPointLabel', () => {
    it('renders the given text', () => {
        const testValue = 'Test Label'

        render(<DataPointLabel val={testValue} />)

        expect(screen.getByText(testValue)).toBeTruthy()
    })
})
