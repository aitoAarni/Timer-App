import {
    formStringDate,
    transformDatesAndDurationDataForChart,
} from '@/utils/dataHandlers'

const testData = [
    {
        date: '2025-02-03',
        total_duration: 2_000_000,
    },
    {
        date: '2025-02-01',
        total_duration: 12_200_000,
    },
    {
        date: '2025-01-30',
        total_duration: 7_2000_000,
    },
    {
        date: '2025-01-29',
        total_duration: 10_000_000,
    },
]

const correctlyTransformedData = [
    {
        value: 0,
        label: 'Jan 28',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 2.7,
        label: 'Jan 29',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 20,
        label: 'Jan 30',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 0,
        label: 'Jan 31',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 3.3,
        label: 'Feb 1',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 0,
        label: 'Feb 2',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 0.5,
        label: 'Feb 3',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
]

describe('transformDatesAndDurationDataForChart', () => {
    afterAll(() => {
        jest.restoreAllMocks()
    })
    it('transforms chart data to correct form', () => {
        const mockDate = new Date('2025-02-03T06:00:00Z')
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
        const { transformedData, maxValue } =
            transformDatesAndDurationDataForChart([...testData], 7)
        transformedData.forEach((element, index) => {
            expect({
                value: element.value,
                label: element.label,
                labelTextStyle: element.labelTextStyle,
            }).toMatchObject(correctlyTransformedData[index])
        })
        expect(maxValue).toBe(20)
        jest.resetAllMocks()
    })
})
describe('formStringDate', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })
    it('should format a valid date correctly', () => {
        expect(formStringDate('2025', '2', '5')).toBe('2025-02-05')
        expect(formStringDate('2023', '12', '31')).toBe('2023-12-31')
    })

    it('should pad single-digit months and days', () => {
        expect(formStringDate('2024', '3', '7')).toBe('2024-03-07')
        expect(formStringDate('2024', '9', '1')).toBe('2024-09-01')
    })

    it('should return null for an invalid date', () => {
        expect(formStringDate('2024', '13', '1')).toBeNull()
        expect(formStringDate('2024', '2', '30')).toBeNull()
        expect(formStringDate('abc', '10', '10')).toBeNull()
        expect(formStringDate('2024', '10', 'xyz')).toBeNull()
    })

    it('should return null for future dates', () => {
        const futureYear = new Date().getFullYear() + 1
        expect(formStringDate(String(futureYear), '1', '1')).toBeNull()
    })
})
