import { View } from 'react-native'
import { Dimensions } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

export default function HeatMapGraph() {
    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: 'red',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3,
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    }
    const commitsData = [
        { date: '2025-01-01', count: 0 },
        { date: '2025-01-02', count: 2 },
        { date: '2025-01-03', count: 3 },
        { date: '2025-01-04', count: 4 },
        { date: '2025-01-05', count: 5 },
        { date: '2025-01-06', count: 2 },
        { date: '2025-01-09', count: 0 },
        { date: '2025-01-10', count: 2 },
        { date: '2025-01-12', count: 4 },
        { date: '2025-01-13', count: 2 },
        { date: '2025-01-15', count: 4 },
    ]
    return (
        <View>
            <ContributionGraph
                values={commitsData}
                endDate={new Date('2025-01-18')}
                numDays={30}
                gutterSize={10}
                width={screenWidth}
                height={600}
                horizontal={true}
                squareSize={50}
                showMonthLabels={false}
                showOutOfRangeDays={true}
                chartConfig={chartConfig}
                tooltipDataAttrs={value => ({
                    fill: value.count > 3 ? 'red' : 'green',
                    stroke: 'black',
                    strokeWidth: 1,
                })}
            />
        </View>
    )
}
