import { Settings } from '@/types'
import {
    getKeyValuePair,
    setKeyValuePair,
} from '@/storage/local/keyValueStorage'

export const getSettings = async function (): Promise<Settings> {
    const defaultSettings: Settings = {
        workTimeLength: 25,
        breakTimeLength: 5,
    }

    const fetchedSettingsString = await getKeyValuePair('settings')
    const fetchedSettings = fetchedSettingsString
        ? JSON.parse(fetchedSettingsString)
        : {}
    const settings = { ...defaultSettings, ...fetchedSettings }
    return settings
}

export const setSettings = async function (settings: Settings) {
    const settingsString = JSON.stringify(settings)
    await setKeyValuePair('settings', settingsString)
}
