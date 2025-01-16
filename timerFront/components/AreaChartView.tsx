import theme from '@/theme'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { AreaChartData } from '@/types'

interface AreaChartViewProps {
    data: AreaChartData[]
    maxValue: number
}

const { width } = Dimensions.get('window')

const AreaChartView = ({ data, maxValue }: AreaChartViewProps) => {
    return (
        <View style={{}}>
            <LineChart
                areaChart
                width={width}
                height={300}
                scrollToIndex={30}
                // stepValue={1}
                maxValue={maxValue > 4 ? maxValue * 1.1 : 6}
                animateOnDataChange
                onDataChangeAnimationDuration={600}
                isAnimated
                animationDuration={1.5}
                onPress={(item: { value: number }, index: number) => {
                    console.log(item, index)
                }}
                curved
                curvature={0.1}
                thickness1={1}
                color="black"
                spacing={60}
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisLabelWidth={0}
                hideRules
                backgroundColor={theme.colors.background}
                startFillColor="#7CFC00"
                endFillColor1="#800000"
                startOpacity={0.8}
                endOpacity={0.5}
                gradientDirection="vertical"
                data={data}
                dataPointsRadius={5}
                dataPointLabelShiftX={10}
                dataPointLabelShiftY={-30}
                dataPointsColor="#999999"
            />
        </View>
    )
}

export default AreaChartView
