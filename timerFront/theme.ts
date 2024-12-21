import { Platform } from 'react-native'

const theme = {
    colors: {
        primary: '#036666',
        background: '#101010',
    },

    fontSizes: {
        body: 14,
        timer: 60,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
}

export default theme
