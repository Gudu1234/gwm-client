/**
 * Created by Soumya (soumya@smarttersstudio.com) on 14/05/21 at 8:17 PM.
 */
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Gwm from '../../public/GWMstrLogo.svg';
import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import {useRouter} from 'next/router';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer2 from '../../public/NavAssets/MenuIcon.svg';
import Drawer1 from '../../public/NavAssets/MenuGreenIcon.svg';
import {makeStyles} from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    appbar:{
        backgroundColor: '#124954',
    },
    topAppbar:{
        backgroundColor: 'transparent'
    },
    imageDiv: {
        flex: '553',
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    title: {
        fontSize: '16px',
        fontWeight: '600',
    },
    subTitle: {
        fontSize: '7px',
        fontWeight: '600',
        color: theme.palette.secondary.main,
        lineHeight: '3px',
        letterSpacing: 1,
    },
    drawerPaper: {
        width: '100%',
        height: '100%',
        background: theme.palette.primary.main,
    },
    drawer: {
        zIndex: 1,
        background: theme.palette.primary.main,
    },
    drawerTitle: {
        fontSize: '30px',
        fontWeight: 'bold',
        lineHeight: '36px',
        letterSpacing: 1,
        'text-shadow': '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
    },
    divider: {
        border: '1px solid #7AE3B1',
        // '& .MuiDivider-root': {
        //     backgroundColor: '#7AE3B1'
        // }
        backgroundColor: '#7AE3B1'
    },
    marginToolbar: {
        marginLeft: '100px',
        marginRight: '50px',
        paddingTop: '20px',
        paddingBottom: '15px',
        '@media (max-width:1050px)': {
            marginLeft: '40px',
            marginRight: '35px',
        },
        '@media (max-width:900px)': {
            marginLeft: '30px',
            marginRight: '25px',
        },
        '@media (max-width:500px)': {
            marginLeft: '15px',
            marginRight: '10px',
        },
    }
}));

const Appbar = () => {

    const Router = useRouter();

    const classes = useStyles();

    const [onTop, setOnTop] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClickAction = () => {
        setOpen(!open);
    };

    useEffect(() => {
        // const sticky = navRef.current.offsetTop;
        window.onscroll = function () {
            //console.log('----->>',window.pageXOffset, window.pageYOffset);

            if (window.pageYOffset > 90) {
                setOnTop(false);
            } else {
                if ( window.innerWidth < 450 && window.pageYOffset > 5) {
                    setOnTop(false);
                } else {
                    // console.log(window.pageYOffset);
                    setOnTop(true);
                }
            }

        };
    });

    return (
        <AppBar color={'transparent'} elevation={0} position={'sticky'} className={onTop ? classes.topAppbar : classes.appbar}>
            <Toolbar component={Box} variant={'dense'} className={classes.marginToolbar}>
                <Box width={'100px'}>
                    <img width={'100%'} src={Gwm} alt={'vector'}/>
                </Box>
                <Box flex={1}/>
                <Hidden smDown>
                    <Box display={'flex'} width={'45%'} justifyContent={'space-around'}>
                        <Typography component={Link} href={'/'} as={'/'} style={{textDecoration: 'none', color: Router.pathname === '/' ? '#FF9A3E' : (onTop ? '#124954' : '#FFFFFF')}}>
                            {'Home'}
                        </Typography>
                        <Typography component={Link} href={'/about'} as={'/about'} style={{textDecoration: 'none', color: Router.pathname === '/about' ? '#FF9A3E' : (onTop ? '#124954' : '#FFFFFF')}}>
                            {'About'}
                        </Typography>
                        <Typography component={Link} href={'/request'} as={'/request'} style={{textDecoration: 'none', color: Router.pathname === '/request' ? '#FF9A3E' : (onTop ? '#124954' : '#FFFFFF')}}>
                            {'Request'}
                        </Typography>
                        <Typography component={Link} href={'/contact'} as={'/contact'} style={{textDecoration: 'none', color: Router.pathname === '/contact' ? '#FF9A3E' : (onTop ? '#124954' : '#FFFFFF')}}>
                            {'Contact'}
                        </Typography>
                        <Typography component={Link} href={'/login'} as={'/login'} style={{textDecoration: 'none', color: Router.pathname === '/login' ? '#FF9A3E' : (onTop ? '#124954' : '#FFFFFF')}}>
                            {'Login'}
                        </Typography>
                    </Box>
                </Hidden>
                <Hidden mdUp>
                    {/*<MenuIcon color={'primary'}/>*/}
                    <IconButton onClick={() => setOpen(true)}>
                        {
                            onTop ? (
                                <img width={'120%'} src={Drawer1} alt={'Drawer'}/>
                            ) : (
                                <img width={'120%'} src={Drawer2} alt={'Drawer'}/>
                            )
                        }
                    </IconButton>
                    <Drawer
                        variant="persistent"
                        anchor="top"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawer}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <div style={{width: '100%', height: '20px', display: 'flex',justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <Button style={{ minWidth: '0', margin: '10px 10px 0 0'}}>
                                        <CloseIcon onClick={() => setOpen(false)} style={{color: '#fff', height: '8em', width: '1.5em'}} />
                                    </Button>
                                </div>
                                <div className={classes.imageDiv} style={{margin: '20px 0'}}>
                                    <div>
                                        <img width={'80px'} src={Gwm} alt="App Logo" />
                                    </div>
                                    <Box mb={3} />
                                </div>
                                <ListItem button component={Link} href="/" onClick={handleClickAction} style={{textDecoration: 'none'}}>
                                    <ListItemText>
                                        <Typography className={classes.drawerTitle} align={'center'}>
                                            {'HOME'}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider className={classes.divider} />
                                <ListItem button component={Link} href="/request" onClick={handleClickAction} style={{textDecoration: 'none'}}>
                                    <ListItemText>
                                        <Typography className={classes.drawerTitle} align={'center'}>
                                            {'REQUEST BIN'}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider className={classes.divider} />
                                <ListItem button component={Link} href="/contact" onClick={handleClickAction} style={{textDecoration: 'none'}}>
                                    <ListItemText>
                                        <Typography className={classes.drawerTitle} align={'center'}>
                                            {'CONTACT'}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider className={classes.divider} />
                                <ListItem button component={Link} href="/about" onClick={handleClickAction} style={{textDecoration: 'none'}}>
                                    <ListItemText>
                                        <Typography className={classes.drawerTitle} align={'center'}>
                                            {'ABOUT'}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider className={classes.divider} />
                                <ListItem button component={Link} href="/login" onClick={handleClickAction} style={{textDecoration: 'none'}}>
                                    <ListItemText>
                                        <Typography className={classes.drawerTitle} align={'center'}>
                                            {'LOGIN'}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </Hidden>
            </Toolbar>
        </AppBar>
    );

};

export default Appbar;
