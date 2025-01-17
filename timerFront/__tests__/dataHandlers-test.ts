import { transformDatesAndDurationDataForChart } from '@/utils/dataHandlers'

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
        value: 2.8,
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
        value: 3.4,
        label: 'Feb 1',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 0,
        label: 'Feb 2',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
    {
        value: 0.6,
        label: 'Feb 3',
        labelTextStyle: { color: 'rgba(153,153, 153,1)' },
    },
]

describe('dataHandlers', () => {
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
        jest.resetAllMocks()
    })
})
