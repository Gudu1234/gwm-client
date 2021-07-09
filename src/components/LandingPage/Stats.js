/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:54 PM.
 */
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import Worker from '../../../public/worker.svg';
import Recycle from '../../../public/Recycle.svg';
import Energy from '../../../public/Energy.svg';
import WeMake from '../../../public/we.svg';
import React from 'react';

const useStyles = makeStyles(theme => ({
    weWidth: {
        width: '85%',
        marginLeft: '-12px',
        '@media (max-width:900px)': {
            width: '90%',
        },
        '@media (max-width:500px)': {
            width: '100%',
        },
    },
    imageVector: {
        width: '100%',
        // '@media (max-width:1050px)': {
        //     width: '25%'
        // },
        // '@media (max-width:900px)': {
        //     width: '25%'
        // },
        // '@media (max-width:500px)': {
        //     width: '20%'
        // },
    },
    headingText: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '29px',
        textAlign: 'center',
    },
    subHeadingText: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '17px',
        textAlign: 'center',
        overflowWrap: 'break-word',
    },
    marginForStats: {
        marginRight: '100px',
        '@media (max-width:900px)': {
            marginRight: '80px',
        },
        '@media (max-width:500px)': {
            marginRight: '0px',
        },
    }
}));

const Stats = () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item container justify={'flex-start'} alignItems={'center'} xs={12} sm={7} md={8}>
                <Box
                    width={'90%'}
                >
                    <img src={WeMake} alt={'WeMake'} width={'85%'} align={'left'} className={classes.weWidth}/>
                </Box>
            </Grid>
            <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={5} md={4}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    // alignItems={'center'}
                    fullWidth
                    className={classes.marginForStats}
                >
                    <Box
                        display={'flex'}
                        // justifyContent={'center'}
                        alignItems={'center'}
                        px={3}
                    >
                        <Box>
                            <img src={Worker} alt={'Worker'} width={'70%'} align={'left'}/>
                        </Box>
                        <Box flex={1} />
                        <Box width={'80%'} display={'flex'} flexDirection={'column'} py={5}>
                            <Typography className={classes.headingText}>
                                {'20+'}
                            </Typography>
                            <Typography className={classes.subHeadingText}>
                                {'Workers'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        // justifyContent={'center'}
                        alignItems={'center'}
                        px={3}
                    >
                        <Box>
                            <img src={Recycle} alt={'Recycle'} width={'70%'} align={'left'}/>
                        </Box>
                        <Box flex={1} />
                        <Box width={'80%'} display={'flex'} flexDirection={'column'} py={5}>
                            <Typography className={classes.headingText}>
                                {'6+'}
                            </Typography>
                            <Typography className={classes.subHeadingText}>
                                {'Tons of Waste'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        // justifyContent={'center'}
                        alignItems={'center'}
                        px={3}
                    >
                        <Box>
                            <img src={Energy} alt={'Energy'} width={'70%'} align={'left'}/>
                        </Box>
                        <Box flex={1} />
                        <Box width={'80%'} display={'flex'} flexDirection={'column'} py={5}>
                            <Typography className={classes.headingText}>
                                {'5000+'}
                            </Typography>
                            <Typography className={classes.subHeadingText}>
                                {'KWh of Energy Produced'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );

};

export default Stats;