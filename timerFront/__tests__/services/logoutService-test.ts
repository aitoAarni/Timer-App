import logout from '@/services/logoutService'
import store from '@/redux/store'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/services/authStorageServices'

jest.mock('@/services/authStorageServices') // Mock AuthStorage class
jest.mock('@/redux/store', () => ({
    dispatch: jest.fn(),
}))

describe('logout', () => {
    let removeUserMock: jest.Mock

    beforeEach(() => {
        // Reset mock implementation before each test
        removeUserMock = jest.fn()
        AuthStorage.prototype.removeUser = removeUserMock
        jest.clearAllMocks()
    })

    it('removes user from storage and dispatches clearUser action', async () => {
        await logout()

        // Ensure removeUser is called once
        expect(removeUserMock).toHaveBeenCalledTimes(1)

        // Ensure clearUser action is dispatched
        expect(store.dispatch).toHaveBeenCalledWith(clearUser())
    })

    it('throws an error if removeUser fails', async () => {
        removeUserMock.mockRejectedValue(new Error('Failed to remove user'))

        await expect(logout()).rejects.toThrow('Failed to remove user')

        // Ensure clearUser is **not** dispatched if removeUser fails
        expect(store.dispatch).not.toHaveBeenCalled()
    })
})
