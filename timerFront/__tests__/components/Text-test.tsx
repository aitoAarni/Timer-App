// @ts-nocheck
import React from 'react'
import { render } from '@testing-library/react-native'
import Text from '@/components/Text'
import theme from '@/theme'
import { TextStyle } from 'react-native'

describe('Text Component', () => {
    it('renders correctly with default styles', () => {
        const { getByText } = render(<Text>Default Text</Text>)
        const textElement = getByText('Default Text')

        expect(textElement).toBeTruthy()
        expect(textElement.props.style).toContainEqual({
            fontFamily: 'IBM-Plex-Mono',
            color: theme.colors.text,
            fontSize: theme.fontSizes.timer,
            textAlign: 'center',
        })
    })

    it('applies custom color', () => {
        const customColor = 'red'
        const { getByText } = render(
            <Text color={customColor}>Colored Text</Text>
        )
        const textElement = getByText('Colored Text')

        expect(textElement.props.style).toContainEqual({ color: customColor })
    })

    it('applies custom fontSize', () => {
        const customFontSize = 24
        const { getByText } = render(
            <Text fontSize={customFontSize}>Large Text</Text>
        )
        const textElement = getByText('Large Text')

        expect(textElement.props.style).toContainEqual({
            fontSize: customFontSize,
        })
    })

    it('combines custom styles with default styles', () => {
        const customStyle: TextStyle = {
            fontWeight: 'bold',
            textAlign: 'center',
        }

        const { getByText } = render(
            <Text style={customStyle}>Styled Text</Text>
        )
        const textElement = getByText('Styled Text')

        expect(textElement.props.style).toContainEqual(customStyle)
        expect(textElement.props.style).toContainEqual({
            fontFamily: 'IBM-Plex-Mono',
            color: theme.colors.text,
            fontSize: theme.fontSizes.timer,
            textAlign: 'center',
        })
    })

    it('renders additional props correctly', () => {
        const testID = 'custom-text'
        const { getByTestId } = render(
            <Text testID={testID} accessibilityLabel="Accessible Text">
                Accessible Text
            </Text>
        )
        const textElement = getByTestId(testID)

        expect(textElement.props.accessibilityLabel).toBe('Accessible Text')
    })
})
