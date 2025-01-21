import { createContext, ReactNode, useEffect, useState } from 'react'
import Text from '@/components/Text'
import { Settings } from '@/types'
import { Dispatch, SetStateAction } from 'react'
import { getSettings } from '@/services/getSettings'

interface SettingsContextType {
    settings: Settings
    setSettings: Dispatch<SetStateAction<Settings | null>>
}

export const SettingsContext = createContext<SettingsContextType | null>(null)

export default function SettingsProvider({
    children,
}: {
    children: ReactNode
}) {
    const [settings, setSettings] = useState<Settings | null>(null)
    useEffect(() => {
        const initializeSettings = async () => {
            const fetchedSettings = await getSettings()
            setSettings(fetchedSettings)
        }
        initializeSettings()
    }, [])
    if (settings) {
        return (
            <SettingsContext.Provider value={{ settings, setSettings }}>
                {children}
            </SettingsContext.Provider>
        )
    } else {
        return <Text>Loading settings</Text>
    }
}
