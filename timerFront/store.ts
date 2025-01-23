import { configureStore } from '@reduxjs/toolkit'
import settingsReducer, { fetchSettings } from '@/features/settingsSlice'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
    },
})

store.dispatch(fetchSettings())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
