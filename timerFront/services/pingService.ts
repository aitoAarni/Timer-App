import { BACK_END_URL } from '@/utils/environment'

export const ping = async () => {
    await fetch(`${BACK_END_URL}/ping`, {
        method: 'GET',
    })
}
