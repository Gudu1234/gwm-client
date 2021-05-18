import {
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';
import Footer from '../src/layouts/Footer';
import HomeAppbar from '../src/layouts/HomeAppbar';
import React from 'react';
import WorkingTowards from '../src/components/LandingPage/WorkingTowards';
import HomeMenu from '../src/components/LandingPage/HomeMenu';
import Stats from '../src/components/LandingPage/Stats';
import OurService from '../src/components/LandingPage/OurService';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#124954',
        width: '100%'
    },
    homeTitle: {
        fontSize: '45px',
        fontWeight: 'bold',
        lineHeight: '90px',
        letterSpacing: '0.03em',
        marginTop: '80px',
        marginLeft: '125px',
        'text-shadow': '-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff',
    },

}));

export default function Home() {

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <HomeAppbar />
            <WorkingTowards />
            <Box my={3}/>
            <HomeMenu />
            <Stats />
            <Container maxWidth={'xl'} color={'#124954'} >
                <OurService />
            </Container>
            <Box my={3}/>
            <Footer />
        </Box>
    );
}
