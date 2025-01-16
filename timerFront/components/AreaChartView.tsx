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
                width={width - 25}
                height={300}
                scrollToIndex={30}
                // stepValue={1}
                maxValue={maxValue > 4 ? maxValue * 1.1 : 6}
                animateOnDataChange
                onDataChangeAnimationDuration={600}
                isAnimated
                animationDuration={600}
                onPress={(item: { value: number }, index: number) => {
                    console.log(item, index)
                }}
                curved
                curvature={0.1}
                thickness={1}
                color="black"
                spacing={100}
                xAxisThickness={2}
                yAxisThickness={2}
                yAxisLabelWidth={25}
                yAxisTextStyle={{ color: '#999999' }}
                yAxisColor="#555555"
                xAxisColor="#555555"
                // hideRules
                noOfSections={3}
                rulesColor="gray"
                rulesType="solid"
                backgroundColor={theme.colors.background}
                startFillColor="rgb(202, 202, 202)"
                endFillColor="rgb(0, 0, 0)"
                startOpacity={0.7}
                endOpacity={0.1}
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
