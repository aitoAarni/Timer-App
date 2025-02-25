import { StorageUser } from '@/types'

interface TimeLog {
    created_at: string
    duration: number
    user_id: string
}

const addRemoteTimeLog = async (timeLog: TimeLog, user: StorageUser) => {
    const url = 'http://192.168.1.120:3000/api/timelog'
    const body = JSON.stringify(timeLog)
    if (!user.token) {
        throw new Error('No user token in memory')
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        body,
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}

export default addRemoteTimeLog
