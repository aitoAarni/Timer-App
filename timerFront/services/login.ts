export default async function remoteLogin(username: string, password: string) {
    const body = JSON.stringify({ username, password })
    const response = await fetch('http://192.168.1.120:3000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    })
    if (!response.ok) {
        const errorText = await response.text()
        console.error(`Http: ${response.status}, ${errorText}`)
        throw new Error(`Http: ${response.status}, ${errorText}`)
    }
    const json = await response.json()
    return json
}
