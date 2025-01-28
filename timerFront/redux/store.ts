import { configureStore } from '@reduxjs/toolkit'
import settingsReducer, { fetchSettings } from '@/redux/settingsSlice'
import userReducer, { fetchUser } from './userSlice'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        user: userReducer
    },
})

store.dispatch(fetchSettings())
store.dispatch(fetchUser())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
