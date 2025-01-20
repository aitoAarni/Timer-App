import { createContext, ReactNode, useState } from 'react'
interface SettingsContextType {
    workTime: number
    setWorkTime: React.Dispatch<React.SetStateAction<number>>
    breakTime: number
    setBreakTime: React.Dispatch<React.SetStateAction<number>>
}
export const SettingsContext = createContext<SettingsContextType | null>(null)

export default function SettingsProvider({
    children,
}: {
    children: ReactNode
}) {
    const [workTime, setWorkTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)

    return (
        <SettingsContext.Provider
            value={{ workTime, setWorkTime, breakTime, setBreakTime }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
