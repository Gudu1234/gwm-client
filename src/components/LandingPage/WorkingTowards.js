/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:49 PM.
 */
import {Box, Button, Grid, makeStyles, Typography} from '@material-ui/core';
import HomeCTA from '../../../public/HomeCTA.svg';
import React from 'react';
import Link from '../../Link';
import { Animated } from 'react-animated-css';

const useStyles = makeStyles(theme => ({
    marginForText: {
        color: '#fff',
        fontSize: '36px',
        fontWeight: 'bold',
        letterSpacing: '0.03em',
        lineHeight: '43px',
        fontStyle: 'normal',
        marginLeft: '120px',
        '@media (max-width:1100px)': {
            fontSize: '36px',
            lineHeight: '43px',
        },
        '@media (max-width:1050px)': {
            fontSize: 38,
            lineHeight: '45px',
        },
        '@media (max-width:900px)': {
            fontSize: 33,
            lineHeight: '45px',
            marginLeft: '52px'
        },
        '@media (max-width:500px)': {
            marginLeft: '27px',
            fontSize: 25,
            lineHeight: '43px',
        },
    },
    marginForTextSubtitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'normal',
        letterSpacing: '0.03em',
        lineHeight: '158.5%',
        fontStyle: 'normal',
        marginLeft: '120px',
        '@media (max-width:1100px)': {
            fontSize: '14px',
            lineHeight: '158.5%',
        },
        '@media (max-width:1050px)': {
            fontSize: 38,
            lineHeight: '45px',
        },
        '@media (max-width:900px)': {
            marginLeft: '52px',
            fontSize: 14,
            lineHeight: '158.5%',
        },
        '@media (max-width:500px)': {
            marginLeft: '27px',
            fontSize: 14,
            lineHeight: '158.5%',
        },
    },
    marginForButton: {
        marginLeft: '120px',
        '@media (max-width:1100px)': {
            marginLeft: '120px',
        },
        '@media (max-width:1050px)': {
            marginLeft: '120px',
        },
        '@media (max-width:900px)': {
            marginLeft: '120px',
        },
        '@media (max-width:500px)': {
            marginLeft: '27px',
        },
    }
}));

const WorkingTowards = () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item container xs={12} sm={6} md={6}>
                <Animated
                    animationIn="zoomIn"
                    animationInDelay={20}
                    animationOut="zoomOut"
                    animationOutDelay={400}
                    isVisible={true}
                >
                    <Box width={'95%'} display={'flex'} flexDirection={'column'} py={{xs: 6, sm: 12, md: 15}}>
                        <Typography variant={'h1'} align={'left'} className={classes.marginForText}>
                            {
                                'WORKING TOWARDS A'
                            }
                        </Typography>
                        <Typography variant={'h1'} align={'left'} className={classes.marginForText}>
                            {
                                'BETTER FUTURE.'
                            }
                        </Typography>
                        <Box my={2} />
                        <Typography align={'left'} className={classes.marginForTextSubtitle}>
                            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. '}
                        </Typography>
                        <Box my={4} />
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
                </Animated>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} xs={12} sm={6} md={6}>
                <Box width={'80%'}>
                    <Box my={2}/>
                    <Animated
                        animationIn='slideInRight'
                        animationInDelay={30}
                        animationOut='slideOutRight'
                        animationOutDelay={300}
                        isVisible={true}
                    >
                        <img src={HomeCTA} width={'90%'} alt={'Home CTA'} align={'right'}/>
                    </Animated>
                    <Box my={3}/>
                </Box>
            </Grid>
        </Grid>
    );

};

export default WorkingTowards;