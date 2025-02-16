import { UserCredentials } from './types'

export const toUserCredentials = (object: unknown): UserCredentials => {
    console.log(object)
    const userCredentials = {
        username: 'sped',
        password: 'pasanen',
    }
    return userCredentials
}



const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}
