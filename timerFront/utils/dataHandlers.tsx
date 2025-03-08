import { AreaChartData, DisplayTimeLogs } from '@/types'
import { DataPointLabel } from './Stylers'
import theme from '@/theme'

const msToHours = (ms: number) => {
    const hours = Math.round(ms / 360_000) / 10
    return hours
}

export const transformDatesAndDurationDataForChart = (
    data: DisplayTimeLogs,
    daysOfData: number = 30
) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const transformedData: AreaChartData[] = []
    let dateOfData = new Date()
    let dataIndex = 0
    let maxValue = 0
    for (let i = 0; i < daysOfData; i++) {
        if (i) {
            dateOfData.setDate(dateOfData.getDate() - 1)
        }
        const dateOfDataString = `${dateOfData.getFullYear()}-${String(
            dateOfData.getMonth() + 1
        ).padStart(2, '0')}-${String(dateOfData.getDate()).padStart(2, '0')}`
        const DataPoint = {
            value: 0,
            label: `${months[dateOfData.getMonth()]} ${dateOfData.getDate()}`,

            dataPointLabelComponent: () => {
                return <DataPointLabel val={String(DataPoint.value) + ' h'} /> },
            labelTextStyle: { color: theme.colors.grayLight },
        }
        if (
            dataIndex < data.length &&
            data[dataIndex].date == dateOfDataString
        ) {
            DataPoint.value = msToHours(data[dataIndex].total_duration)
            dataIndex++
            maxValue = maxValue > DataPoint.value ? maxValue : DataPoint.value
        }
        transformedData.push(DataPoint)
    }
    transformedData.reverse()
    return { transformedData, maxValue }
}

export const formStringDate = (year: string, month: string, day: string) => {
    const today = new Date()
    const givenDate = new Date(Number(year), Number(month) - 1, Number(day))
    if (
        givenDate > today ||
        isNaN(givenDate.getTime()) ||
        givenDate.getFullYear() !== Number(year) ||
        givenDate.getMonth() + 1 !== Number(month) ||
        givenDate.getDate() !== Number(day)
    ) {
        return null
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}
