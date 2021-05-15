import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#7AE3B1',
            main: '#124954',
            dark: '#6157Ff',
        },
        secondary: {
            light: '#FF9A3E',
            main: '#FF9A3E',
            dark: '#FF9A3E'
        },
        warning: {
            main: '#FFFFFF'
        },
        success: {
            main: '#FFFFFF'
        },
        background: {
            default: '#ffffff'
        },
        text: {
            secondary: '#000000',
            primary: '#124954',
        },
    },
    typography: {
        fontFamily: 'montserrat',
        h1: {
            fontSize: 50,
            fontWeight: 'bold',
            letterSpacing: '-0.2px',
            lineHeight: '52px',
            fontStyle: 'normal',
            '@media (max-width:1050px)': {
                fontSize: 33,
                lineHeight: '40px',
            },
            '@media (max-width:900px)': {
                fontSize: 24,
                lineHeight: '30px',
            },
        },
        h2: {
            fontSize: 36,
            fontWeight: 'bold',
            letterSpacing: 0.3,
            '@media (max-width:1050px)': {
                fontSize: 16,
                lineHeight: '20px',
            },
            '@media (max-width:900px)': {
                fontSize: 12,
                lineHeight: '16px',
                letterSpacing: '0.5px',
            },
            '@media (max-width:500px)': {
                fontSize: 11,
                lineHeight: '12px',
            },
        },
        h3: {
            fontSize: 22,
            fontWeight: '600',
            letterSpacing: 'normal',
            lineHeight: '24px',
            fontStyle: 'normal',
            '@media (max-width:1050px)': {
                fontSize: 16,
                lineHeight: '20px',
            },
            '@media (max-width:900px)': {
                fontSize: 12,
                lineHeight: '16px',
                letterSpacing: '0.5px',
            },
            '@media (max-width:500px)': {
                fontSize: 11,
                lineHeight: '12px',
            },
        },
        h4: {
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '1px',
        },
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.7,
        },
        body1: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        body2: {
            fontWeight: 400,
            letterSpacing: '1px',
        },
        subtitle1: {
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: '0.75px',
            lineHeight: '22px',
            '@media (max-width:1050px)': {
                fontSize: 15,
            },
            '@media (max-width:900px)': {
                fontSize: 13,
                lineHeight: '15px',
            },
            '@media (max-width:500px)': {
                fontSize: 12,
                lineHeight: '15px',
            },
        },
        subtitle2: {
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '0.45px',
            lineHeight: '22px',
            '@media (max-width:1050px)': {
                fontSize: 15,
            },
            '@media (max-width:900px)': {
                fontSize: 14,
                lineHeight: '15px',
            },
            '@media (max-width:500px)': {
                fontSize: 14,
                lineHeight: '15px',
            },
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '1px',
        }
    },
    shape: {
        borderRadius: 30,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    overrides: {
        MuiButton: {
            contained: {
                height: '40px',
                [theme.breakpoints.down('sm')]: {
                    height: '40px'
                },
            },
            root: {
                borderRadius: '10px',
            },
            containedSecondary: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        MuiInputBase: {
            input: {
                height: '10px',
                [theme.breakpoints.down('sm')]: {
                    height: '1px'
                },
                // color: '#FFFFFF',
            },
        },
        MuiOutlinedInput:{
            notchedOutline:{
                borderRadius: '10px',
                borderColor: '#FFFFFF'
            },
        },
        MuiSelect: {
            iconOutlined: {
                color: '#124954'
            },
        }
    }
};

export default theme;
