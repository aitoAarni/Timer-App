import { formatTime } from '@/utils/format'

describe('format', () => {
    it('Formats 4 seconds as 00:04', () => {
        const formattedTime = formatTime(4)
        expect(formattedTime).toBe('00:04')
    })

    it('Formats 100 seconds as 01:40', () => {
        const formattedTime = formatTime(100)
        expect(formattedTime).toBe('01:40')
    })
    it('formats 111 minutes and 14 seconds as 111:04', () => {
        const formattedTime = formatTime(6674)
        expect(formattedTime).toBe('111:14')
    })
})
