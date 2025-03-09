import { formatTime, formatTotalTime } from '@/utils/format'
import { TurboModuleRegistry } from 'react-native'

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
    it('should format milliseconds correctly into ', () => {
        expect(formatTotalTime(0)).toBe('0s')
        expect(formatTotalTime(0, false)).toBe('0m')
        expect(formatTotalTime(0, false, false)).toBe('0h')
        expect(formatTotalTime(1000, true, false, false)).toBe('01s')
        expect(formatTotalTime(60000)).toBe('01m')
        expect(formatTotalTime(3600000)).toBe('01h')
        expect(formatTotalTime(3661000)).toBe('01h 01m 01s')
        expect(formatTotalTime(86399000)).toBe('23h 59m 59s')

    })

    it('should handle large durations correctly', () => {
        expect(formatTotalTime(86400000)).toBe('24h') 
        expect(formatTotalTime(90061000)).toBe('25h 01m 01s') 
    })

    it('should pad single-digit numbers with leading zeros', () => {
        expect(formatTotalTime(5 * 1000)).toBe('05s')
        expect(formatTotalTime(60 * 1000)).toBe('01m')
        expect(formatTotalTime(9 * 60 * 1000)).toBe('09m')
        expect(formatTotalTime(10 * 60 * 1000)).toBe('10m')
    })
})
