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

}));

export default function Home() {

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <HomeAppbar />
            <WorkingTowards />
            <Box my={{md: 12, sm: 6, xs: 6}}/>
            <Stats />
            <OurService />
            <Footer />
        </Box>
    );
}
