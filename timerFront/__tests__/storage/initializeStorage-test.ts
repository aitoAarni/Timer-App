import initializeStorage from '@/storage/local/initializeStorage'
import { initializeDatabase, createTables } from '@/storage/local/db'
import { clearSettings, getSettings } from '@/services/settingServices'
import { isTest } from '@/utils/environment'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/services/authStorageServices'
import store from '@/redux/store'
import { updateSettings } from '@/redux/settingsSlice'
import createUser from '@/services/userServices'

jest.mock('@/storage/local/db', () => ({
    initializeDatabase: jest.fn(),
    createTables: jest.fn(),
}))

jest.mock('@/services/settingServices', () => ({
    clearSettings: jest.fn(),
    getSettings: jest
        .fn()
        .mockResolvedValue({ workTimeLength: 25, breakTimeLength: 5 }),
}))

jest.mock('@/utils/environment', () => ({
    isTest: jest.fn(),
    BACK_END_URL: 'http://192.168.1.120:3000',
}))

jest.mock('@/services/userServices', () => {
    return jest.fn()
})

jest.mock('@/services/authStorageServices')
jest.mock('@/redux/store', () => ({
    dispatch: jest.fn(),
}))

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
})

describe('initializeStorage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should initialize database and create tables', async () => {
        ;(isTest as jest.Mock).mockReturnValue(false)

        await initializeStorage()

        expect(initializeDatabase).toHaveBeenCalled()
        expect(createTables).toHaveBeenCalled()
    })

    test('should handle test mode correctly', async () => {
        ;(isTest as jest.Mock).mockReturnValue(true)

        const mockAuthStorageRemoveUser = jest.fn()
        ;(AuthStorage as jest.Mock).mockImplementation(() => ({
            removeUser: mockAuthStorageRemoveUser,
        }))

        await initializeStorage()

        expect(createUser).toHaveBeenCalledWith('test_user', 'password')
        expect(clearSettings).toHaveBeenCalled()
        expect(getSettings).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledWith(
            updateSettings({ workTimeLength: 25, breakTimeLength: 5 })
        )
        expect(mockAuthStorageRemoveUser).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledWith(clearUser())
    })
})
