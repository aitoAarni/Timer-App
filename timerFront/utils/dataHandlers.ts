import { AreaChartData, DatesWithDuration } from '@/types'
import { DataPointLabel } from './Stylers'
import theme from '@/theme'

const msToHours = (ms: number) => {
    const hours = Math.round(ms / 360_000) / 10
    return hours
}

export const transformDatesAndDurationDataForChart = (
    data: DatesWithDuration[],
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

            dataPointLabelComponent: () =>
                DataPointLabel(String(DataPoint.value) + ' h'),
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

export const getPlaceholderDataForChart = (daysOfData: number = 30) => {
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
    let maxValue = 0
    for (let i = 0; i < daysOfData; i++) {
        if (i) {
            dateOfData.setDate(dateOfData.getDate() - 1)
        }

        const DataPoint = {
            value: 0,
            label: `${months[dateOfData.getMonth()]} ${dateOfData.getDate()}`,

            dataPointLabelComponent: () =>
                DataPointLabel(String(DataPoint.value) + ' h'),
            labelTextStyle: { color: theme.colors.grayLight },
        }

        transformedData.push(DataPoint)
    }
    transformedData.reverse()
    return { transformedData, maxValue }
}
