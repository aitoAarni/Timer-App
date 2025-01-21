import { Settings } from '@/types'
import { getKeyValuePair } from './keyValueStorage'

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
