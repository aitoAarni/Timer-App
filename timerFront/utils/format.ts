const formatTime = function (seconds: number) {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
    return formattedMinutes + ':' + formattedSeconds
}

const formatTotalTime = function (millisedonds: number) {
    let totalSeconds = Math.floor(millisedonds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds -= hours * 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds - (minutes * 60)
    let formattedTime = String(hours).padStart(2, '0') + ':'
    formattedTime += String(minutes).padStart(2, '0') + ':'
    formattedTime += String(seconds).padStart(2, '0')
    return formattedTime
}

export { formatTime, formatTotalTime }
