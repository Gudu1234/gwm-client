import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import {Avatar, Box, makeStyles, Menu, MenuItem} from '@material-ui/core';
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import Confirm from '../components/Confirm';
import {logout} from '../apis/authentication';
import {AccountCircle} from '@material-ui/icons';
import MaleAvatar from '../../public/MaleAvatar.svg';
import FemaleAvatar from '../../public/FemaleAvatar.svg';
// import { logout } from '../api_services/authentication';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    avatarIcon: {
        backgroundColor: '#124954',
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    toolbarMargin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    profile: {
        background: '#E8F5F8',
        paddingRight: '40px',
        paddingLeft: '15px',
        marginRight: '-25px',
        fontWeight: 600,
        fontSize: '13px',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    profileButton: {
        '&:hover': {
            background: theme.palette.common.white,
        },
    },
});

const rippleStyles = (theme) => ({
    child: {
        backgroundColor: '#fff'
    },
    rippleVisible: {
        opacity: 0.1,
        animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`
    },
    "@keyframes enter": {
        "0%": {
            transform: "scale(0)",
            opacity: 0.1
        },
        "100%": {
            transform: "scale(1)",
            opacity: 0.5
        }
    }
});

function Header(props) {
    const { classes, onDrawerToggle, title } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const useStyles = makeStyles(rippleStyles);
    const rippleClass = useStyles();

    const { user } = useStore(UserStore);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleLogout = () => {
        Confirm('Are you sure ?', 'Do you really want to logout ? ', 'Ok').then(() => {
            logout().then(()=>window.location.reload(false));
            localStorage.removeItem('feathers-jwt');
            setTimeout(() => {
                window.location.href = '/login';
            }, 300);
        });
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={'user-account'}
            keepMounted
            onClose={handleMenuClose}
            open={isMenuOpen}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={handleLogout}>
                <Typography>
                    {'Log out'}
                </Typography>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <Head>
                <title>
                    {title ? title + ' | GWM' : 'GWM'}
                </title>
            </Head>
            <AppBar position="sticky" elevation={0} style={{backgroundColor: '#E8F5F8'}}>
                <Toolbar className={classes.toolbarMargin}>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon color={'primary'}/>
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs />
                        <Grid item>
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                <Button TouchRippleProps={{classes: rippleClass}} className={classes.profileButton} onClick={handleProfileMenuOpen}>
                                    <Box>
                                        <Typography color={'primary'} align={'right'} className={classes.profile}>
                                            {user?.name || 'Admin'}
                                        </Typography>
                                        <Typography color={'primary'} align={'right'} className={classes.profile}>
                                            {user?.username || 'Admin'}
                                        </Typography>
                                    </Box>
                                    <Avatar
                                        alt={'user-image'}
                                        className={classes.logo}
                                        src={
                                            user.gender === 1
                                                ? MaleAvatar
                                                : (user.gender === 2 ? FemaleAvatar : '')
                                        }
                                    >
                                        {user?.name?.charAt(0)?.toUpperCase() || <AccountCircle />}
                                    </Avatar>
                                </Button>
                                {renderMenu}
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default withStyles(styles)(Header);
