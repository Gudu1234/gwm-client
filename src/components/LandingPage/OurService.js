/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:57 PM.
 */
import {Box, Button, Grid, Hidden, makeStyles, Typography} from '@material-ui/core';
import RequestIcon from '../../../public/Request.svg';
import WhiteArrow from '../../../public/WhiteArrow.svg';
import Collection from '../../../public/Collection.svg';
import Disposal from '../../../public/Disposal.svg';
import GetInTouch from '../../../public/GetInTouch.svg';
import React from 'react';
import Link from '../../Link';
import {Animated} from 'react-animated-css';

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
    },
    howItWorks: {
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '43px',
        letterSpacing: '0.1em',
        '@media (max-width:900px)': {
            fontSize: '34px',
            lineHeight: '43px'
        },
        '@media (max-width:500px)': {
            fontSize: '25px',
            lineHeight: '43px'
        },
    },
    headingText: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '29px',
        letterSpacing: '0.06em',
    },
    subHeadingText: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '160.1%',
        letterSpacing: '0.08em',
        overflowWrap: 'break-word',
    },
    getInTouch: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '36px',
        fontWeight: 'bold',
        lineHeight: '43px',
        '@media (max-width:500px)': {
            fontSize: 25,
            lineHeight: '43px',
            marginLeft: '20px'
        },
    },
    getInTouchText: {
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '150.5%',
        letterSpacing: '0.04em',
        '@media (max-width:500px)': {
            fontSize: '14px',
            marginLeft: '20px'
        },
    }
}));

const OurService = () => {

    const classes = useStyles();

    const content = 'We are always available to listen! Let us know if you want to give any suggestion or feedback about our system and working process or if you have any issues regarding bin maintenance and garbage collection.';

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
            <Typography className={classes.howItWorks} >
                {'HOW IT WORKS'}
            </Typography>
            <Box my={3}/>
            <Grid container>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img src={RequestIcon} alt={'Request'} width={'80%'} align={'center'}/>
                    </Box>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box width={'100%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                        <Typography className={classes.headingText} align={'left'}>
                            {'REQUEST'}
                        </Typography>
                        <Box my={1}/>
                        <Typography className={classes.subHeadingText} align={'left'}>
                            {'This system consists of a request portal through which localites can request for the bins for their localities. Localites request for bins by selecting their city and zone respectively. After inspection by the admin, the required number of child bins are allocated to the respective parent bin.'}
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
                    <Box width={'100%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                        <Typography className={classes.headingText} align={'left'}>
                            {'COLLECTION'}
                        </Typography>
                        <Box my={1}/>
                        <Typography className={classes.subHeadingText} align={'left'}>
                            {'Cleaner collects the wastes from child bin and transfers into parent bin further those garbage are collected from parent bin by the drivers and taken away to dump yard for disposal.'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img src={Collection} alt={'Collection'} width={'80%'} align={'center'}/>
                    </Box>
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
                    <Box display={'flex'} justifyContent={'center'}>
                        <img src={Disposal} alt={'Disposal'} width={'80%'} align={'center'}/>
                    </Box>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                    <Box width={'100%'} display={'flex'} flexDirection={'column'} py={3} px={3}>
                        <Typography className={classes.headingText} align={'left'}>
                            {'DISPOSAL'}
                        </Typography>
                        <Box my={1}/>
                        <Typography className={classes.subHeadingText} align={'left'}>
                            {'This feature includes the procedure of Garbage\' s separation at the dump-yard into three categories as per the 3 types of bins. Then wastes are sent out to different recycling sectors for disposal.Here ejection of wastes enhances the efficiency of waste management and reduces environmental pollution.'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Hidden xsDown>
                <Box my={6} />
                <Grid container>
                    <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} py={3} px={10}>
                            <Typography className={classes.getInTouch} align={'left'}>
                                {'GET IN TOUCH'}
                            </Typography>
                            <Box my={1}/>
                            <Typography className={classes.getInTouchText} align={'left'}>
                                {content}
                            </Typography>
                            <Box my={2} />
                            <Box display={'flex'} flexDirection={'row'} className={classes.marginForButton}>
                                <Button
                                    variant={'outlined'}
                                    component={Link}
                                    href={'/contact'}
                                    as={'/contact'}
                                    style={{color: '#fff', borderColor: '#fff', textTransform: 'none', textDecoration: 'none'}}
                                >
                                    {'Contact Us'}
                                </Button>
                                <Box px={2.5} />
                                <Button
                                    variant={'contained'}
                                    color={'secondary'}
                                    component={Link}
                                    href={'/request'}
                                    as={'/request'}
                                    style={{textTransform: 'none', textDecoration: 'none'}}
                                >
                                    {'Request Bin'}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img src={GetInTouch} alt={'Collection'} width={'80%'} align={'center'}/>
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Box my={2} />
                <Grid container>
                    <Grid item container xs={12} sm={6} md={6}>
                        <Box width={'95%'} display={'flex'} flexDirection={'column'} py={{xs: 6, sm: 12, md: 15}} >
                            <Typography variant={'h1'} align={'left'} className={classes.getInTouch}>
                                {
                                    'GET IN TOUCH'
                                }
                            </Typography>
                            <Box my={1} />
                            <Typography align={'left'} className={classes.getInTouchText}>
                                {content}
                            </Typography>
                            <Box my={2} />
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} px={1}>
                                <Button
                                    variant={'outlined'}
                                    component={Link}
                                    href={'/contact'}
                                    as={'/contact'}
                                    style={{color: '#fff', borderColor: '#fff', textTransform: 'none', textDecoration: 'none'}}
                                >
                                    {'Contact Us'}
                                </Button>
                                <Box px={2.5} />
                                <Button
                                    variant={'contained'}
                                    color={'secondary'}
                                    component={Link}
                                    href={'/request'}
                                    as={'/request'}
                                    style={{textTransform: 'none', textDecoration: 'none'}}
                                >
                                    {'Request Bin'}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Hidden>
        </Box>
    );

};

export default OurService;