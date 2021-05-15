/**
 * Created by Soumya (soumya@smarttersstudio.com) on 14/05/21 at 8:17 PM.
 */
import {AppBar, Hidden, Toolbar} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Gwm from '../../public/GWMstrLogo.svg';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import {useRouter} from 'next/router';
import MenuIcon from '@material-ui/icons/Menu';

const Appbar = () => {

    const Router = useRouter();

    return (
        <AppBar color={'transparent'} elevation={0} position={'sticky'}>
            <Toolbar component={Box} px={3} variant={'dense'}>
                <Box width={'100px'}>
                    <img width={'100%'} src={Gwm} alt={'vector'}/>
                </Box>
                <Box flex={1}/>
                <Hidden smDown>
                    <Box display={'flex'} width={'45%'} justifyContent={'space-around'}>
                        <Typography component={Link} href={'/'} as={'/'} style={{textDecoration: 'none', color: Router.pathname === '/' ? '#FF9A3E' : '#124954'}}>
                            {'Home'}
                        </Typography>
                        <Typography component={Link} href={'/about'} as={'/about'} style={{textDecoration: 'none', color: Router.pathname === '/about' ? '#FF9A3E' : '#124954'}}>
                            {'About'}
                        </Typography>
                        <Typography component={Link} href={'/request'} as={'/request'} style={{textDecoration: 'none', color: Router.pathname === '/request' ? '#FF9A3E' : '#124954'}}>
                            {'Request'}
                        </Typography>
                        <Typography component={Link} href={'/contact'} as={'/contact'} style={{textDecoration: 'none', color: Router.pathname === '/contact' ? '#FF9A3E' : '#124954'}}>
                            {'Contact'}
                        </Typography>
                        <Typography component={Link} href={'/login'} as={'/login'} style={{textDecoration: 'none', color: Router.pathname === '/login' ? '#FF9A3E' : '#124954'}}>
                            {'Login'}
                        </Typography>
                    </Box>
                </Hidden>
                <Hidden mdUp>
                    <MenuIcon color={'primary'}/>
                </Hidden>
            </Toolbar>
        </AppBar>
    );

};

export default Appbar;
