import store from '@/redux/store'

export const getRankings = async (userId: string, date: string) => {
    try {
        const url = `http://192.168.1.120:3000/api/ranking/${date}/${userId}`
        const token = store.getState().user.loggedInUser?.token
        if (!token) return null
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return null
            
        }
        return data
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error))
        
    }
}
