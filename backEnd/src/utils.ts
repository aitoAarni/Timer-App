import { UserCredentials } from './types'

export const toUserCredentials = (object: unknown): UserCredentials => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }
    if ('username' in object && 'password' in object) {
        const userCredentials = {
            username: parseUsername(object.username),
            password: parsePassword(object.password),
        }
        return userCredentials
    }
    throw new Error('Incorrect data: some fields are missing')
}

const parseUsername = (username: unknown): string => {
    if (username && isString(username)) {
        return username
    }
    throw new Error('Incorrect or missing usernamee')
}
const parsePassword = (password: unknown): string => {
    if (password && isString(password)) {
        return password
    }
    throw new Error('Incorrect or missing password')
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}
