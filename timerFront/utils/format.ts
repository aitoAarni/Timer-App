const formatTime = function (seconds: number) {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
    return formattedMinutes + ':' + formattedSeconds
}

const formatTotalTime = function (
    millisedonds: number,
    includeSeconds = true,
    includeMinutes = true,
    includeHours = true
) {
    let totalSeconds = Math.floor(millisedonds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds -= hours * 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds - minutes * 60
    let formattedTime = ''
    if (hours > 0 && includeHours) {
        formattedTime = String(hours).padStart(2, '0') + 'h '
    }
    if (minutes > 0 && includeMinutes) {
        formattedTime += String(minutes).padStart(2, '0') + 'm '
    }
    if (seconds > 0 && includeSeconds)
        formattedTime += String(seconds).padStart(2, '0') + 's'
    if (formattedTime === '') {
        if (includeSeconds) return '0s'
        if (includeMinutes) return '0m'
        if (includeHours) return '0h'
    }
    return formattedTime.trim()
}

export { formatTime, formatTotalTime }
