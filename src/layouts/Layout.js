import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Navigator from './Navigator';
import Header from './Header';
import AppBar from '@material-ui/core/AppBar';
import {Button, Toolbar, Typography} from '@material-ui/core';
// import LogoBlack from '../../public/logoBlack.svg';

const drawerWidth = 256;

const useStyle = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    appbar:{
        backgroundColor: '#124954',
    },
    tabsContainer:{
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    tab:{
        color: '#474747',
        marginLeft: '43px',
    },
    root: {
        display: 'flex',
        minHeight: '100vh',
        '& .MuiPaper-root': {
            backgroundColor: '#124954'
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#E8F5F8'
        // background: '#124954',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
}));

function Layout({children, title}) {
    const classes = useStyle();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const {user} = useStore(UserStore);
    //
    // useEffect(() => {
    //     if (!user) {
    //         Router.push('/login');
    //     }
    // }, []);
    //
    // if (!user) return <Loader/>;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                    <Navigator
                        PaperProps={{ style: { width: drawerWidth, backgroundColor: '#124954' } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                </Hidden>
            </nav>
            <div className={classes.app}>
                <Header onDrawerToggle={handleDrawerToggle} title={title}/>
                <main className={classes.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
};

export default Layout;
