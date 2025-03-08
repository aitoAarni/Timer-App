import logout from '@/services/logoutService'
import store from '@/redux/store'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/services/authStorageServices'

jest.mock('@/services/authStorageServices')
jest.mock('@/redux/store', () => ({
    dispatch: jest.fn(),
}))

describe('logout', () => {
    let removeUserMock: jest.Mock

    beforeEach(() => {
        removeUserMock = jest.fn()
        AuthStorage.prototype.removeUser = removeUserMock
        jest.clearAllMocks()
    })

    it('removes user from storage and dispatches clearUser action', async () => {
        await logout()

        expect(removeUserMock).toHaveBeenCalledTimes(1)

        expect(store.dispatch).toHaveBeenCalledWith(clearUser())
    })

    it('throws an error if removeUser fails', async () => {
        removeUserMock.mockRejectedValue(new Error('Failed to remove user'))

        await expect(logout()).rejects.toThrow('Failed to remove user')

        expect(store.dispatch).not.toHaveBeenCalled()
    })
})
