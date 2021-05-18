/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:54 PM.
 */
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import Worker from '../../../public/worker.svg';
import Recycle from '../../../public/Recycle.svg';
import Energy from '../../../public/Energy.svg';
import WeMake from '../../../public/WeMake.svg';
import React from 'react';

const useStyles = makeStyles(theme => ({
    imageVector: {
        width: '20%',
        '@media (max-width:1050px)': {
            width: '25%'
        },
        '@media (max-width:900px)': {
            width: '25%'
        },
        '@media (max-width:500px)': {
            width: '20%'
        },
    }
}));

const Stats = () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={5} md={5}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    width={'100%'}
                    px={{xs: 10, md: 12}}
                >
                    <Box
                        display={'flex'}
                        py={{xs: 2, md: 3}}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <img src={Worker} alt={'Worker'} className={classes.imageVector}/>
                        <Box width={'95%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                            <Typography variant={'h1'} style={{color: '#fff'}} align={'center'}>
                                {'767+'}
                            </Typography>
                            <Typography variant={'subtitle2'} style={{color: '#fff'}} align={'center'}>
                                {'Workers'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        py={{xs: 2, md: 3}}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <img src={Recycle} alt={'Recycle'} className={classes.imageVector}/>
                        <Box width={'95%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                            <Typography variant={'h1'} style={{color: '#fff'}} align={'center'}>
                                {'20+'}
                            </Typography>
                            <Typography variant={'subtitle2'} style={{color: '#fff'}} align={'center'}>
                                {'Tons of Waste'}
                            </Typography>
                            <Typography variant={'subtitle2'} style={{color: '#fff'}} align={'center'}>
                                {'Recycled'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        py={{xs: 2, md: 3}}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <img src={Energy} alt={'Recycle'} className={classes.imageVector}/>
                        <Box width={'95%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                            <Typography variant={'h1'} style={{color: '#fff'}} align={'center'}>
                                {'6000+'}
                            </Typography>
                            <Typography variant={'subtitle2'} style={{color: '#fff'}} align={'center'}>
                                {'KWh of Energy'}
                            </Typography>
                            <Typography variant={'subtitle2'} style={{color: '#fff'}} align={'center'}>
                                {'Produced'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} xs={12} sm={7} md={7}>
                <Box
                    width={'100%'}
                >
                    <img src={WeMake} alt={'WeMake'} width={'90%'} align={'right'}/>
                </Box>
            </Grid>
        </Grid>
    );

};

export default Stats;