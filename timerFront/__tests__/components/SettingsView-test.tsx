import { render, screen, fireEvent } from '@testing-library/react-native'
import SettingsView from '@/components/SettingsView'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '@/redux/settingsSlice'

jest.mock('@/services/settings', () => ({
    setSettings: jest.fn(),
}))

jest.mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
)

let mockDispatch = jest.fn()
let mockUseSelector = jest.fn()
let mockUseDipatch = jest.fn().mockReturnValue(mockDispatch)
jest.mock('@/redux/store', () => ({
    useSelector: () => {
        return mockUseSelector()
    },
    useDispatch: () => {
        return mockUseDipatch()
    },
}))

let mockUpdateSettings = jest.fn()
jest.mock('@/redux/settingsSlice', () => ({
    updateSettings: (...args) => {
        return mockUpdateSettings(...args)
    },
}))

jest.mock('@/components/SwipeNavigation', () => {
    const { View } = require('react-native')
    return (...args) => {
        return <View testId="swipe-navigation"></View>
    }
})

let mockUseNavigateTo = jest.fn()
jest.mock('@/hooks/useNavigateTo', () => ({
    useNavigateTo: (...args) => {
        return mockUseNavigateTo(...args)
    },
}))

let mockSetSettings = jest.fn()
jest.mock('@/services/settings', () => ({
    setSettings: (...args) => {
        return mockSetSettings(...args)
    },
}))

describe('SettingsView', () => {
    beforeEach(() => {
        mockUseSelector.mockReset()
        mockUseDipatch.mockReset()
    })

    it.only('renders correctly', () => {
        render(<SettingsView />)
        expect(screen.getByText('Work duration')).toBeTruthy()
        expect(screen.getByText('Break duration')).toBeTruthy()
    })
})

describe('TimerSlider', () => {
    beforeEach(() => {})

    it('renders TimerSlider correctly', () => {
        render(<SettingsView />)
        expect(screen.getByText('Work duration')).toBeTruthy()
    })

    it('updates state on slider change', () => {
        render(<SettingsView />)

        const slider = screen.getByRole('adjustable')
        fireEvent(slider, 'valueChange', 30)

        expect(store.dispatch).toHaveBeenCalledWith(
            updateSettings({ workTimeLength: 30 })
        )
        expect(setSettings).toHaveBeenCalledWith({
            workTimeLength: '30',
            breakTimeLength: 5,
        })
    })

    it('updates text input and dispatches on submit', () => {
        render(<SettingsView />)

        const input = screen.getByRole('textbox')
        fireEvent.changeText(input, '40')
        fireEvent(input, 'blur')

        expect(store.dispatch).toHaveBeenCalledWith(
            updateSettings({ workTimeLength: 40 })
        )
        expect(setSettings).toHaveBeenCalledWith({
            workTimeLength: '40',
            breakTimeLength: 5,
        })
    })

    it('resets invalid input on blur', () => {
        render(<SettingsView />)

        const input = screen.getByRole('textbox')
        fireEvent.changeText(input, 'invalid')
        fireEvent(input, 'blur')

        expect(input.props.value).toBe('25')
    })
})
