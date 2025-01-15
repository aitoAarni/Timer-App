import { useState } from 'react'
import { LineChart } from 'react-native-gifted-charts'

interface AreaChartViewProps {
    data: {
        value: number
        label?: string
    }[]
}

const AreaChartView = ({ data }: AreaChartViewProps) => {
    return (
        <LineChart
            areaChart
            color="#33FFFF"
            animateOnDataChange
            isAnimated
            thickness1={5}
            yAxisTextStyle={{ color: 'lightgray' }}
            spacing={80}
            backgroundColor="#414141"
            animationDuration={1.5}
            startFillColor1="#43E4E9"
            endFillColor1="#47E596"
            endFillColor2="#3030f0"
            startOpacity={0.9}
            endOpacity1={0.4}
            data={data}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            dataPointsHeight={20}
            dataPointsWidth={20}
        />
    )
}

export default AreaChartView
