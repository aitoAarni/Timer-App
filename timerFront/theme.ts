import { Platform } from 'react-native'

const theme = {
    colors: {
        primary: '#036666',
        background: '#101010',
        text: '#f0f0f0',
        grayLight: 'rgba(153,153, 153,1)',
        error: 'red',
        grayDark: 'rgb(44, 44, 44)',
        highlight: 'rgb(11, 195, 219)',
    },

    fontSizes: {
        body: 14,
        header: 30,
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
