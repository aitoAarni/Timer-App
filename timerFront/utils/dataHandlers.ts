import { AreaChartData, DatesWithDuration } from '@/types'
import { DataPointLabel } from './Stylers'

export const msToHours = (ms: number) => {
    const hours = Math.round(ms / 360_000) / 10
    return hours
}

export const transformDatesAndDurationData = (data: DatesWithDuration[]) => {
    const month = [
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

    console.log(2)
    for (let i = 0; i < 20; i++) {
        if (i) {
            dateOfData.setDate(dateOfData.getDate() - 1)
        }
        const dateOfDataString = `${dateOfData.getFullYear()}-${String(
            dateOfData.getMonth() + 1
        ).padStart(2, '0')}-${String(dateOfData.getDate()).padStart(2, '0')}`
        const DataPoint = {
            value: 0,
            label: `${month[dateOfData.getMonth()]} ${dateOfData.getDate()}`,
            dataPointLabelComponent: () =>
                DataPointLabel(String(DataPoint.value)),
            labelTextStyle: { color: 'white' },
        }
        if (
            dataIndex < data.length &&
            data[dataIndex]?.date == dateOfDataString
        ) {
            DataPoint.value = msToHours(data[dataIndex].total_duration)
            dataIndex++
        }
        transformedData.push(DataPoint)
    }
    console.log(3)
    transformedData.reverse()
    return transformedData
}
