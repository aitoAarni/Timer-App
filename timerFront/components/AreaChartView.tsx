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
        <View>
            <LineChart
                dataPointLabelWidth={50}
                areaChart
                width={width - 25}
                height={300}
                scrollToIndex={30}
                maxValue={maxValue > 4 ? maxValue * 1.1 : 6}
                curved
                curvature={0.1}
                thickness={1}
                color={theme.colors.grayLight}
                spacing={100}
                xAxisThickness={0}
                yAxisThickness={0}
                hideRules
                hideYAxisText
                backgroundColor={theme.colors.background}
                startFillColor={theme.colors.grayLight}
                endFillColor="black"
                startOpacity={0.7}
                endOpacity={0.1}
                gradientDirection="vertical"
                data={data}
                dataPointsRadius={5}
                dataPointLabelShiftX={10}
                dataPointLabelShiftY={-30}
                dataPointsColor={theme.colors.grayLight}
            />
        </View>
    )
}

export default AreaChartView
