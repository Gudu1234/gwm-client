/**
 * Created by Soumya (soumya@smarttersstudio.com) on 14/05/21 at 8:17 PM.
 */
import {AppBar, Hidden, Toolbar} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Gwm from '../../public/GWMstrLogo.svg';
import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import {useRouter} from 'next/router';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer1 from '../../public/Drawer.svg';
import Drawer2 from '../../public/Drawer2.svg';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    appbar:{
        backgroundColor: '#124954',
    },
    topAppbar:{
        backgroundColor: 'transparent'
    },
}));

const Appbar = () => {

    const Router = useRouter();

    const classes = useStyles();

    const [onTop, setOnTop] = React.useState(true);

    useEffect(() => {
        // const sticky = navRef.current.offsetTop;
        window.onscroll = function () {
            //console.log('----->>',window.pageXOffset, window.pageYOffset);

            if (window.pageYOffset > 120) {
                setOnTop(false);
            } else {
                if ( window.innerWidth < 450 && window.pageYOffset > 5) {
                    setOnTop(false);
                } else {
                    console.log(window.pageYOffset);
                    setOnTop(true);
                }
            }

        };
    });

    return (
        <AppBar color={'transparent'} elevation={0} position={'sticky'} className={onTop ? classes.topAppbar : classes.appbar}>
            <Toolbar component={Box} px={3} variant={'dense'}>
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
                    {
                        onTop ? (
                            <img width={'8%'} src={Drawer1} alt={'Drawer'}/>
                        ) : (
                            <img width={'8%'} src={Drawer2} alt={'Drawer'}/>
                        )
                    }
                </Hidden>
            </Toolbar>
        </AppBar>
    );

};

export default Appbar;
