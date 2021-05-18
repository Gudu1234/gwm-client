/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:49 PM.
 */
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import HomeCTA from '../../../public/HomeCTA.svg';
import React from 'react';

const useStyles = makeStyles(theme => ({
    marginForText: {
        color: '#fff',
        fontSize: 52,
        fontWeight: 'bold',
        letterSpacing: '0.3px',
        lineHeight: '65px',
        fontStyle: 'normal',
        marginLeft: '70px',
        '@media (max-width:1100px)': {
            fontSize: 40,
            lineHeight: '45px',
        },
        '@media (max-width:1050px)': {
            fontSize: 38,
            lineHeight: '45px',
        },
        '@media (max-width:900px)': {
            fontSize: 33,
            lineHeight: '45px',
            marginLeft: '40px'
        },
        '@media (max-width:500px)': {
            marginLeft: '20px',
            fontSize: 28,
            lineHeight: '45px',
        },
    },
}));

const WorkingTowards = () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item container xs={12} sm={6} md={6}>
                <Box width={'95%'} display={'flex'} flexDirection={'column'} py={{xs: 6, sm: 12, md: 15}}>
                    <Typography variant={'h1'} align={'left'} className={classes.marginForText}>
                        {
                            'WORKING TOWARDS'
                        }
                    </Typography>
                    <Typography variant={'h1'} align={'left'} className={classes.marginForText}>
                        {
                            'A BETTER FUTURE.'
                        }
                    </Typography>
                </Box>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} xs={12} sm={6} md={6}>
                <Box width={'95%'}>
                    <Box my={2}/>
                    <img src={HomeCTA} width={'90%'} alt={'Home CTA'} align={'right'}/>
                    <Box my={3}/>
                </Box>
            </Grid>
        </Grid>
    );

};

export default WorkingTowards;