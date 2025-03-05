// @ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react-native'
import SettingsView from '@/components/SettingsView'
import React from 'react'
import { updateSettings } from '@/redux/settingsSlice'

jest.mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
)

let mockUpdateSettings = jest.fn()
jest.mock('@/redux/settingsSlice', () => ({
    updateSettings: (...args) => {
        return mockUpdateSettings(...args)
    },
}))

let mockNavigateTo = jest.fn()
jest.mock('@/hooks/useNavigateTo', () => {
    return () => {
        return mockNavigateTo
    }
})

let mockSetSettings = jest.fn()
jest.mock('@/services/settingServices', () => ({
    setSettings: (...args) => {
        return mockSetSettings(...args)
    },
}))

const mockDispatch = jest.fn()
const mockUseDispatch = jest.fn()
const mockUseSelector = jest.fn()
jest.mock('react-redux', () => ({
    useSelector: (...args) => {
        return mockUseSelector(...args)
    },
    useDispatch: () => {
        return mockUseDispatch()
    },
}))

describe('SettingsView', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        mockUseSelector.mockReturnValue({
            workTimeLength: 25,
            breakTimeLength: 5,
        })

        mockUseDispatch.mockReturnValue(mockDispatch)
    })

    it('renders correctly', () => {
        render(<SettingsView />)
        expect(screen.getByText('Work duration')).toBeTruthy()
        expect(screen.getByText('Break duration')).toBeTruthy()
    })
})

describe('TimerSlider', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        mockUseSelector.mockReturnValue({
            workTimeLength: 25,
            breakTimeLength: 5,
        })

        mockUseDispatch.mockReturnValue(mockDispatch)
    })

    it('renders TimerSlider correctly', () => {
        render(<SettingsView />)
        expect(screen.getByText('Work duration')).toBeTruthy()
    })

    it('updates state on slider change', () => {
        render(<SettingsView />)

        const slider = screen.getAllByTestId('slider')[0]

        fireEvent(slider, 'valueChange', 30)
        fireEvent(slider, 'slidingComplete', 30)

        expect(mockUpdateSettings).toHaveBeenCalledWith({ workTimeLength: 30 })
        expect(mockDispatch).toHaveBeenCalledWith(mockUpdateSettings())
        expect(mockSetSettings).toHaveBeenCalledWith({
            workTimeLength: '30',
            breakTimeLength: 5,
        })
    })

    it('updates text input and dispatches on submit', () => {
        render(<SettingsView />)

        const input = screen.getByTestId('text-input-workTimeLength')
        fireEvent.changeText(input, '40')
        fireEvent(input, 'blur')
        expect(mockUpdateSettings).toHaveBeenCalledWith({ workTimeLength: 40 })
        expect(mockDispatch).toHaveBeenCalledWith(mockUpdateSettings())
        expect(mockSetSettings).toHaveBeenCalledWith({
            workTimeLength: '40',
            breakTimeLength: 5,
        })
    })

    it('resets invalid input on blur', () => {
        render(<SettingsView />)

        const input = screen.getByTestId('text-input-workTimeLength')
        fireEvent.changeText(input, 'invalid')
        fireEvent(input, 'blur')

        expect(input.props.value).toBe('25')
    })
})
