import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StorageUser } from '@/types'
import AuthStorage from '@/services/authStorageServices'

interface UserState {
    loggedInUser: StorageUser | null
    loading: boolean
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const authStorage = new AuthStorage()
    const user = await authStorage.getUser()
    return user
})

const initialState: UserState = { loggedInUser: null, loading: true }

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setLoggedInUser: (state, action: PayloadAction<StorageUser>) => {
            state.loggedInUser = action.payload
        },
        clearUser: state => {
            state.loggedInUser = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loggedInUser = action.payload
                state.loading = false
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
            })
    },
})

export const { setLoggedInUser, clearUser } = userSlice.actions
export default userSlice.reducer
