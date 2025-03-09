import { getDateNdaysAgo } from '@/utils/utils'

describe('getDateNdaysAgo', () => {
    it('should return the correct date for 0 days ago (today)', () => {
        const today = new Date().toISOString().split('T')[0]
        expect(getDateNdaysAgo(0)).toBe(today)
    })

    it('should return the correct date for 1 day ago', () => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const expectedDate = yesterday.toISOString().split('T')[0]

        expect(getDateNdaysAgo(1)).toBe(expectedDate)
    })

    it('should return the correct date for 7 days ago', () => {
        const lastWeek = new Date()
        lastWeek.setDate(lastWeek.getDate() - 7)
        const expectedDate = lastWeek.toISOString().split('T')[0]

        expect(getDateNdaysAgo(7)).toBe(expectedDate)
    })

    it('should handle large numbers correctly (e.g., 365 days ago)', () => {
        const lastYear = new Date()
        lastYear.setDate(lastYear.getDate() - 365)
        const expectedDate = lastYear.toISOString().split('T')[0]

        expect(getDateNdaysAgo(365)).toBe(expectedDate)
    })

    it('should handle edge case of leap years correctly', () => {
        const leapYearDate = new Date('2024-03-01')
        jest.spyOn(global, 'Date').mockImplementation(() => leapYearDate)

        expect(getDateNdaysAgo(1)).toBe('2024-02-29')

        jest.restoreAllMocks()
    })
})
