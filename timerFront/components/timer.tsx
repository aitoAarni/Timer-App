import { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function Timer({ time, breakTime }: Props) {
    const [timer, setTimer] = useState(0)
    const [startTime] = useState(getEpochInSeconds())

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = timeElapsed(startTime)
            setTimer(elapsed)
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timeElapsed(startTime))
    }
    return (
        <View>
            <Button title="Time" onPress={handleButtonClick}></Button>
            <Text>Timer: {timer}</Text>
        </View>
    )
}

function getEpochInSeconds() {
    const date = new Date()
    const epoch = Math.floor(date.getTime() / 1000)
    return epoch
}

function timeElapsed(startTime: number) {
    const currentTime = getEpochInSeconds()
    return currentTime - startTime
}
