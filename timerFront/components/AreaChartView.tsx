import theme from '@/theme'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

interface AreaChartViewProps {
    data: {
        value: number
        label?: string
        endFillColor?: string
    }[]
}

const { width } = Dimensions.get('window')

const AreaChartView = ({ data }: AreaChartViewProps) => {
    return (
        <LineChart
            areaChart
            width={width}
            stepValue={10}
            color="#33FFFF"
            animateOnDataChange
            onDataChangeAnimationDuration={600}
            isAnimated
            animationDuration={1.5}
            onPress={(item: { value: number }, index: number) => {
                console.log(item, index)
            }}
            curved
            curvature={0.1}
            thickness1={8}
            spacing={60}
            startIndex1={0}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisLabelWidth={0}
            hideRules
            xAxisLabelsHeight={0}
            hideYAxisText
            textColor1="white"
            textFontSize1={16}
            textShiftX={10}
            textShiftY={-5}
            yAxisTextStyle={{ color: 'lightgray' }}
            backgroundColor={theme.colors.background}
            startFillColor="green"
            endFillColor1="blue"
            startOpacity={0.5}
            endOpacity={0.5}
            data={data}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            dataPointsHeight={20}
            dataPointsWidth={20}
            dataPointsRadius={5}
            dataPointsColor1="white"
            gradientDirection="horizontal"
            lineGradient
            lineGradientDirection="horizontal"
            lineGradientStartColor="green"
            lineGradientEndColor="blue"
        />
    )
}

export default AreaChartView
