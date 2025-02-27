import { formatTime, formatTotalTime } from '@/utils/format'

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

describe('formatTotalTime', () => {
    it('should format milliseconds correctly into HH:MM:SS', () => {
        expect(formatTotalTime(0)).toBe('00:00:00')
        expect(formatTotalTime(1000)).toBe('00:00:01')
        expect(formatTotalTime(60000)).toBe('00:01:00')
        expect(formatTotalTime(3600000)).toBe('01:00:00')
        expect(formatTotalTime(3661000)).toBe('01:01:01')
        expect(formatTotalTime(86399000)).toBe('23:59:59')
    })

    it('should handle large durations correctly', () => {
        expect(formatTotalTime(86400000)).toBe('24:00:00') 
        expect(formatTotalTime(90061000)).toBe('25:01:01') 
    })

    it('should pad single-digit numbers with leading zeros', () => {
        expect(formatTotalTime(5 * 1000)).toBe('00:00:05')
        expect(formatTotalTime(60 * 1000)).toBe('00:01:00')
        expect(formatTotalTime(9 * 60 * 1000)).toBe('00:09:00')
        expect(formatTotalTime(10 * 60 * 1000)).toBe('00:10:00')
    })
})
