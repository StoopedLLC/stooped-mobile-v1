import { Dimensions } from 'react-native';



const STYLE = {
    // Colors
    color:{
        background: '#44444B',
        font: '#FFFFFF',
        accent: {
            beige:'#9C7464',
            yellow:'#ECBC8C',
            green: '#308280',
            blue: '#429CD6',
            gray: '#BCBAC6',
            darkPurple: "#373672",
            lightPurple: "#41419F",
        }
    },

    // Fonts
    font:{
         // TODO: poppin and DM Sans
    },

    // Sizes
    sizes:{
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
    },

    // Spacing
    spacing:{

    },

    // Borders
    borders:{
        lessRound: 5,
        moreRound: 10,
    },

    // Shadows
    shadows:{

    },
}

export default STYLE;