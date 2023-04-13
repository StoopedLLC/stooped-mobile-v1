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
         // poppin and DM Sans
        poppins: 'Poppins_400Regular',
        poppinsMed: 'Poppins_500Medium',
        poppinsSemiBold: 'Poppins_600SemiBold',
        PoppinsBold: 'Poppins_700Bold',
        dmsans: 'DMSans_400Regular',
        dmsansMed: 'DMSans_500Medium',
        dmsansBold: 'DMSans_700Bold',
    },

    // Sizes
    sizes:{
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        h1: Dimensions.get('window').width * 0.1,
        h2: Dimensions.get('window').width * 0.08,
        h3: Dimensions.get('window').width * 0.06,
        p: Dimensions.get('window').width * 0.04,

    },

    // Spacing
    spacing:{

    },

    // Borders
    borders:{
        lessRound: Dimensions.get('window').width * 0.02,
        normalRound: Dimensions.get('window').width * 0.05,
        moreRound: Dimensions.get('window').width * 0.08,
    },

    // Shadows
    shadows:{

    },

    // Other
    mapPin: {
        width: Dimensions.get('window').height*0.035*0.75, 
        height: Dimensions.get('window').height*0.035,
        resizeMode: 'stretch',
    },
}

export default STYLE;