import { getSettings, setSettings } from '@/services/settingServices'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Settings {
    workTimeLength: number
    breakTimeLength: number
}

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async () => {
        return await getSettings()
    }
)

const initialState: Settings = {
    workTimeLength: 25,
    breakTimeLength: 5,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
            const updatedSettings = { ...state, ...action.payload }
            return updatedSettings
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            return { ...state, ...action.payload }
        })
    },
})

export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
