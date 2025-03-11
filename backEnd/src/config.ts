import dotenv from 'dotenv'

dotenv.config()

const getEnvVar = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value
}
export const SALT_ROUNDS = getEnvVar('SALT_ROUNDS')

export const SECRET = getEnvVar('SECRET')
export const DATABASE_URI = getEnvVar(
    process.env.NODE_ENV === 'test' ? 'TEST_MONGODB_URI' : 'MONGODB_URI'
)

const port_string = getEnvVar('PORT')
export const PORT = isNaN(Number(port_string)) ? 3000 : Number(port_string)