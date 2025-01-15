import { LineChart } from 'react-native-gifted-charts'

const AreaChartView = () => {
    const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }]
    return <LineChart areaChart data={data} />
}

export default AreaChartView
