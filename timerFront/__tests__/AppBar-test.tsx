// @ts-nocheck
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AppBar from '@/components/AppBar'
import theme from '@/theme'

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),

    usePathname: jest.fn(),
}))

describe('AppBar Component', () => {
    it('renders all AppBarButton components', () => {
        const { getByText } = render(
            <AppBar
                navigation={{}}
                options={{}}
                route={{}}
                back={{ title: undefined, href: undefined }}
            />
        )

        expect(getByText('Settings')).toBeTruthy()
        expect(getByText('Timer')).toBeTruthy()
        expect(getByText('Statistics')).toBeTruthy()
    })

    it('highlights the active link based on the current path', () => {
        require('expo-router').usePathname.mockReturnValue('/settings')
        const { getByText } = render(
            <AppBar navigation={{}} options={{}} back={false} />
        )

        const activeText = getByText('Settings')
        expect(activeText).toHaveStyle({ color: theme.colors.text })
    })
})
