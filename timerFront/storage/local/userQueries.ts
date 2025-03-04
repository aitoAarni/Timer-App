import { User } from '@/types'
import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

export const insertUserQuery = `INSERT INTO users (username, password, server_id) VALUES (?, ?, ?)`

export const getUsersQuery = 'SELECT * FROM users'

export const getUserByUsernameQuery = 'SELECT * FROM users WHERE username = ?;'

export const removeUserByUsernameQuery = 'DELETE FROM users WHERE username = ?;'
