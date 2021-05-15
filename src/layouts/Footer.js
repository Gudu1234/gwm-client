/**
 * Created by Soumya (soumya@smarttersstudio.com) on 14/05/21 at 9:13 PM.
 */

import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Button, Divider, Grid, Hidden, List, ListItem, TextField, Typography} from '@material-ui/core';
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
            marginTop: '50px'
        }
    },
    divider:{
        margin: '30px 0',
        color: '#8f8f8f',
        backgroundColor: '#8f8f8f'
    },
    heading:{
        color: '#8f8f8f',
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
        marginBottom: '8px',

    },
    phone:{
        marginTop: '45px',
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
            marginBottom: '40px',
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
                        <Grid item xs={12} md={3} className={classes.gridItem} style={{marginTop: 0}}>
                            <div className={classes.logoDiv}>
                                <img height={'46px'} src={Gwm} alt="GWM"/>
                            </div>
                            <Hidden smDown>
                                <Divider className={classes.divider} light />
                            </Hidden>
                            <div className={classes.description}>
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Give your users a unique & simplified experience with our platform and witness the growth of your business.'}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.gridItem}>
                            <div style={{height: '46px'}}>
                                <Typography className={classes.heading}>{'Quick Links'}</Typography>
                            </div>
                            <Hidden smDown>
                                <Divider className={classes.divider} light />
                            </Hidden>
                            <List>
                                <ListItem className={classes.listItem}>
                                    <Button style={{color: '#fff'}} component={Link} href={'/about'}>
                                        <Typography className={classes.captionText} variant={'caption'}>
                                            {'About Us'}
                                        </Typography>
                                    </Button>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Button style={{color: '#fff'}} component={Link} href={'/team'}>
                                        <Typography className={classes.captionText} variant={'caption'}>
                                            {'Our Team'}
                                        </Typography>
                                    </Button>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Button style={{color: '#fff'}} component={Link} href={'/customers'}>
                                        <Typography className={classes.captionText} variant={'caption'}>
                                            {'Customers'}
                                        </Typography>
                                    </Button>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Button style={{color: '#fff'}} component={Link} href={'/contact-us'}>
                                        <Typography className={classes.captionText} variant={'caption'}>
                                            {'Contact Us'}
                                        </Typography>
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.gridItem}>
                            <div style={{height:'46px'}}>
                                <Typography className={classes.heading}>{'Office'}</Typography>
                            </div>
                            <Hidden smDown>
                                <Divider className={classes.divider} light />
                            </Hidden>
                            <div className={classes.description}>
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Address: Janpatha, JS-818, Bhubaneswar, Khurda'}
                                </Typography>
                            </div>
                            <div className={classes.phone}>
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Phone: 9556266575'}
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.captionText} variant={'caption'}>
                                    {'Email: zepmat@gmail.com'}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.gridItem}>
                            <div style={{height:'46px'}}>
                                <Typography className={classes.heading}>{'Subscribe to our newsletter'}</Typography>
                            </div>
                            <Hidden smDown>
                                <Divider className={classes.divider} light />
                            </Hidden>
                            <Hidden smDown>
                                <div className={classes.inputDiv} >
                                    <TextField className={classes.inputField}
                                               placeholder={'example@gmail.com'}
                                               size={'small'}
                                               fullWidth
                                               InputProps={{
                                                   disableUnderline: true,
                                                   className: classes.fieldText
                                               }}
                                    />
                                </div>
                            </Hidden>
                            <Hidden mdUp>
                                {/*<TextField*/}
                                {/*    variant={'outlined'}*/}
                                {/*    fullWidth*/}
                                {/*    size={'small'}*/}
                                {/*    style={{padding: '20px 10px'}}*/}
                                {/*    placeholder={'zepmat@gmail.com'}*/}
                                {/*    inputProps={{*/}
                                {/*        className: classes.textFeld*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <div className={classes.inputDiv} >
                                    <TextField className={classes.inputField}
                                               placeholder={'example@gmail.com'}
                                               size={'small'}
                                               fullWidth
                                               InputProps={{
                                                   disableUnderline: true,
                                                   className: classes.fieldText
                                               }}
                                    />
                                </div>
                            </Hidden>
                            <div className={classes.btnDiv}>
                                <Button className={classes.button} variant={'contained'} color={'primary'} >
                                    {'Submit'}
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {/*<Grid container xs={12} sm={10} className={classes.terms}>*/}
                {/*    <Grid item xs={12} sm={3} md={3} className={classes.gridItem} style={{marginTop: '10px'}}>*/}
                {/*        <Button style={{color: '#fff'}}>*/}
                {/*            <Typography style={{fontWeight: '400'}} className={classes.captionText} variant={'caption'}>*/}
                {/*                {'Terms & conditions'}*/}
                {/*            </Typography>*/}
                {/*        </Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} sm={3} md={3} className={classes.gridItem} style={{marginTop: '10px'}}>*/}
                {/*        <Button style={{color: '#fff'}}>*/}
                {/*            <Typography style={{fontWeight: '400'}} className={classes.captionText} variant={'caption'}>*/}
                {/*                {'Privacy Policy'}*/}
                {/*            </Typography>*/}
                {/*        </Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={0} sm={3}>*/}
                {/*    </Grid>*/}
                {/*    /!*<Grid item xs={12} sm={3} md={3} className={classes.gridItem}>*!/*/}
                {/*    /!*    <div className={classes.logos}>*!/*/}
                {/*    /!*        <img style={{margin: '0 9px'}} src={FacebookLogo} alt=""/>*!/*/}
                {/*    /!*        <img style={{margin: '0 9px'}} src={GoogleLogo} alt=""/>*!/*/}
                {/*    /!*        <img style={{margin: '0 9px'}} src={InstaLogo} alt=""/>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</Grid>*!/*/}
                {/*</Grid>*/}
            </Grid>
            <div style={{width: '100%',backgroundColor: '#124954',padding: '10px',display: 'flex', justifyContent: 'center', borderTop: '2px solid #7AE3B1'}}>
                <Hidden xsDown>
                    <Typography className={classes.captionText} variant={'caption'} style={{color: '#fff'}}>
                        {'(c) Copyright 2020, Zepmat Technologies pvt. ltd. All rights reserved'}
                    </Typography>
                </Hidden>
                <Hidden smUp>
                    <Typography style={{fontSize: '10px',color: '#fff',textAlign: 'center'}} className={classes.captionText} variant={'caption'}>
                        {'(c) Copyright 2020, Zepmat Technologies pvt. ltd.'}
                        <br/>
                        {'All rights reserved'}
                    </Typography>
                </Hidden>
            </div>
        </React.Fragment>
    );
};

export default Footer;