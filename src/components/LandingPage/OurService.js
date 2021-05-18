/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:57 PM.
 */
import {Box, Grid, Hidden, makeStyles, Typography} from '@material-ui/core';
import RequestIcon from '../../../public/Request.svg';
import WhiteArrow from '../../../public/WhiteArrow.svg';
import Collection from '../../../public/Collection.svg';
import Disposal from '../../../public/Disposal.svg';
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

const OurService = () => {

    const classes = useStyles();

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            px={{xs: 2, md: 12}}
            py={{xs: 5, md: 12}}
        >
            <Typography variant={'h1'} style={{color: '#fff'}} >
                {'HOW IT WORKS'}
            </Typography>
            <Box my={3}/>
            <Grid container>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <img src={RequestIcon} alt={'Request'} width={'60%'}/>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box width={'95%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                        <Typography variant={'h2'} style={{color: '#fff'}} align={'center'}>
                            {'REQUEST'}
                        </Typography>
                        <Box my={1}/>
                        <Typography variant={'subtitle1'} style={{color: '#fff'}} align={'left'}>
                            {'Lorem ipsum dolor sit amet, consec\n' +
                            'tetur adipiscing elit. Nullam ut augu ultricies, varius odio id, semper ligula. Integer ultricies mattis lectus nec tempor. Nam in enim arcu. Ut sagittis est ut sollicitudin posuere'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Hidden mdUp>
                <Box my={{xs: 1, md: 5}}/>
                <img src={WhiteArrow} alt={'Arrow'} width={'12%'}/>
                <Box my={3}/>
            </Hidden>
            <Hidden smDown>
                <Box my={{xs: 1, md: 4}}/>
                <img src={WhiteArrow} alt={'Arrow'} width={'7%'}/>
                <Box my={{xs: 1, md: 4}}/>
            </Hidden>
            <Grid container>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box width={'95%'} display={'flex'} flexDirection={'column'} py={{xs: 2, md: 3}} px={3}>
                        <Typography variant={'h2'} style={{color: '#fff'}} align={'center'}>
                            {'COLLECTION'}
                        </Typography>
                        <Box my={1}/>
                        <Typography variant={'subtitle1'} style={{color: '#fff'}} align={'left'}>
                            {'Lorem ipsum dolor sit amet, consec\n' +
                            'tetur adipiscing elit. Nullam ut augu ultricies, varius odio id, semper ligula. Integer ultricies mattis lectus nec tempor. Nam in enim arcu. Ut sagittis est ut sollicitudin posuere'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <img src={Collection} alt={'Request'} width={'60%'}/>
                </Grid>
            </Grid>
            <Hidden mdUp>
                <Box my={{xs: 2, md: 4}}/>
                <img src={WhiteArrow} alt={'Arrow'} width={'12%'}/>
                <Box my={{xs: 2, md: 4}}/>
            </Hidden>
            <Hidden smDown>
                <Box my={{xs: 1, md: 4}}/>
                <img src={WhiteArrow} alt={'Arrow'} width={'7%'}/>
                <Box my={{xs: 1, md: 4}}/>
            </Hidden>
            <Grid container>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <img src={Disposal} alt={'Request'} width={'60%'}/>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box width={'95%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                        <Typography variant={'h2'} style={{color: '#fff'}} align={'center'}>
                            {'DISPOSAL'}
                        </Typography>
                        <Box my={1}/>
                        <Typography variant={'subtitle1'} style={{color: '#fff'}} align={'left'}>
                            {'Lorem ipsum dolor sit amet, consec\n' +
                            'tetur adipiscing elit. Nullam ut augu ultricies, varius odio id, semper ligula. Integer ultricies mattis lectus nec tempor. Nam in enim arcu. Ut sagittis est ut sollicitudin posuere'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

};

export default OurService;