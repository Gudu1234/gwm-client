/**
 * Created by Soumya (soumya@smarttersstudio.com) on 14/05/21 at 9:13 PM.
 */

import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Box, Button, Divider, Grid, Hidden, List, ListItem, TextField, Typography} from '@material-ui/core';
import Link from '../Link';
import Gwm from '../../public/GWMstrLogo.svg';


const useStyles = makeStyles(theme => ({
    footerContainer: {
        backgroundColor: theme.palette.primary.main,
        borderTop: '3px solid #7AE3B1',
        color: '#fff',
        padding: '40px 0',

        [theme.breakpoints.down('sm')]:{
            padding: '40px 20px',
        }
    },
    description:{
        width: '80%',
        [theme.breakpoints.down('sm')]:{
            textAlign: 'center',
            width: '65%',
        }
    },
    gridItem:{
        [theme.breakpoints.down('sm')]:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px'
        }
    },
    divider:{
        margin: '20px 0',
        color: '#8f8f8f',
        backgroundColor: '#8f8f8f'
    },
    heading:{
        color: '#fff',
        fontSize: '26px',
        fontWeight: 'normal',
        lineHeight: '30px',
        // [theme.breakpoints.down('xs')]:{
        //     fontSize: '17px',
        //     // margin: '15px 0',
        // }
        '@media (max-width:1050px)': {
            fontSize: 24,
        },
        '@media (max-width:900px)': {
            fontSize: 22,
            lineHeight: '15px',
        },
        '@media (max-width:500px)': {
            fontSize: 18,
            lineHeight: '15px',
        },
    },
    listItem:{
        color: '#fff',
        padding: '0',
        width: '80%',
        marginBottom: '2px',
    },
    phone:{
        marginTop: '20px',
        marginBottom: '13px',
        [theme.breakpoints.down('xs')]:{
            marginTop: '10px',
            marginBottom: '10px'
        }
    },
    btnDiv:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',

        [theme.breakpoints.down('sm')]:{
            justifyContent: 'center',
            marginTop: '10px',
        }
    },
    button:{
        height: '50px',
        padding: '0 10px',
        width: '150px',
        borderRadius: '6px',
        [theme.breakpoints.down('xs')]:{
            height: '40px'
        }
    },
    logos:{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]:{
            justifyContent: 'center',
        }
    },
    textFeld:{
        backgroundColor: '#fff',
        borderRadius:'6px',

    },
    logoDiv:{
        height: '46px',
        [theme.breakpoints.down('sm')]:{
            marginBottom: '10px',
        }
    },
    terms:{
        marginTop: '100px',
        [theme.breakpoints.down('sm')]:{
            marginTop: '60px',
        },
        [theme.breakpoints.down('xs')]:{
            marginTop: '40px',
        }
    },
    captionText:{
        fontSize: 14,
        fontWeight: '100',
        letterSpacing: '1.5px',
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
    inputDiv:{
        width: '100%',
        maxWidth: '500px',
        marginBottom: '15px',
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '6px',
        padding: '7px 15px',
        border: '2px solid #EFF0F6',

        [theme.breakpoints.down('xs')]:{
            height: 40,
            marginBottom: '10px',
        },
        '&:hover' : {
            backgroundColor: '#fff',
            border: '2px solid'+ theme.palette.primary.main,
            '& $inputIcon': {
                color: 'black'
            }
        }
    },
    inputField: {
        //flexGrow: 1,
        marginBottom: '-5px'
    },
    fieldText:{
        fontSize: '16px',
        fontWeight: 500,
        [theme.breakpoints.down('sm')]:{
            fontSize: '12px',
            fontWeight: 400,
        },
    }


}));

const Footer = () => {

    const classes =  useStyles();

    return (
        <React.Fragment>
            <Grid container className={classes.footerContainer} justify={'center'}>
                <Grid item xs={12} sm={12} md={10}>
                    <Grid container>
                        <Grid item xs={12} md={4} className={classes.gridItem} style={{marginTop: 0}}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'flexStart'} width={'80%'}>
                                <Hidden smDown>
                                    <div className={classes.logoDiv} align={'left'}>
                                        <img height={'80%'} src={Gwm} alt="GWM"/>
                                    </div>
                                </Hidden>
                                <Hidden mdUp>
                                    <div className={classes.logoDiv} align={'center'}>
                                        <img height={'80%'} src={Gwm} alt="GWM"/>
                                    </div>
                                </Hidden>
                                <Box my={1} />
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Give your users a unique & simplified experience with our platform and witness the growth of your business.'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.gridItem}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'flexStart'} width={'80%'}>
                                <Typography className={classes.heading}>{'Quick Links'}</Typography>
                                <Box my={1} />
                                <List>
                                    <ListItem className={classes.listItem}>
                                        <Button style={{color: '#fff'}} component={Link} href={'/'}>
                                            <Typography className={classes.captionText} variant={'caption'}>
                                                {'Home'}
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button style={{color: '#fff'}} component={Link} href={'/request'}>
                                            <Typography className={classes.captionText} variant={'caption'}>
                                                {'Request Us'}
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button style={{color: '#fff'}} component={Link} href={'/about'}>
                                            <Typography className={classes.captionText} variant={'caption'}>
                                                {'About Us'}
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button style={{color: '#fff'}} component={Link} href={'/contact'}>
                                            <Typography className={classes.captionText} variant={'caption'}>
                                                {'Contact Us'}
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button style={{color: '#fff'}} component={Link} href={'/login'}>
                                            <Typography className={classes.captionText} variant={'caption'}>
                                                {'Login'}
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.gridItem}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'flexStart'} width={'80%'}>
                                <Typography className={classes.heading}>{'Office'}</Typography>
                                <Box my={1} />
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Address: 547, Saheed Nagar, Bhubaneswar, Khurda, 751007'}
                                </Typography>
                                <Box my={1} />
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Phone: 9438000000'}
                                </Typography>
                                <Box my={1} />
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Email: gwm@mc.gov.in'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{width: '100%',backgroundColor: '#124954',padding: '10px',display: 'flex', justifyContent: 'center', borderTop: '2px solid #7AE3B1'}}>
                <Hidden xsDown>
                    <Typography className={classes.captionText} variant={'caption'} style={{color: '#fff'}}>
                        {'(c) Copyright 2020, GWM Corporation pvt. ltd. All rights reserved'}
                    </Typography>
                </Hidden>
                <Hidden smUp>
                    <Typography style={{fontSize: '10px',color: '#fff',textAlign: 'center'}} className={classes.captionText} variant={'caption'}>
                        {'(c) Copyright 2020, GWM Corporation pvt. ltd.'}
                        <br/>
                        {'All rights reserved'}
                    </Typography>
                </Hidden>
            </div>
        </React.Fragment>
    );
};

export default Footer;