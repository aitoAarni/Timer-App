import store from '@/redux/store'

export const getRankings = async (userId: string, date: string) => {
    const url = `http://192.168.1.120:3000/api/ranking/${date}/${userId}`
    const token = store.getState().user.loggedInUser?.token
    if (!token) return null
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })
    if (!response.ok) {
        throw new Error(`HTTP request error: ${response.status}`)
    }
    return response.json()
}
