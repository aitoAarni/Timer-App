export default async function login(username: string, password: string) {
    console.log('pressed')
    const body = JSON.stringify({ username, password })
    const response = await fetch('http://192.168.1.120:3000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    })
    const json = await response.json()
    console.log('json: ', json)
}
