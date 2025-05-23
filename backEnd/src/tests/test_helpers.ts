import User from '../models/userModel'
export const getUserFromDb = async (username: string) => {
    const user = await User.findOne({ username })
    return { ...user?.toJSON(), createdAt: user?.createdAt.toISOString() }
}

export const getAllUsersFromDb = async () => {
    const users = await User.find({})
    return users
}
