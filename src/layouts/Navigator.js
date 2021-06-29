import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import Logo from '../../public/DashboardLogo.svg';
import {Box} from '@material-ui/core';
import {useStore} from 'laco-react';
import UserStore from '../store/userStore';

import DashboardIcon from '../../public/NavAssets/Dashboard.svg';
import AddBinIcon from '../../public/NavAssets/Add bin white.svg';
import WorkerIcon from '../../public/NavAssets/worker white.svg';
import RequestBinIcon from '../../public/NavAssets/Request bin white.svg';
import ManageBinIcon from '../../public/NavAssets/Manage bin.svg';
import MailIcon from '../../public/NavAssets/Mail white.svg';
import ProfileIcon from '../../public/NavAssets/Profile.svg';

const styles = (theme) => ({
    categoryHeader: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: '10px',
        backgroundColor: '#124954',
        '&:focus': {
            backgroundColor: '#26DF86',
        },
    },
    itemActiveItem: {
        backgroundColor: '#26DF86',
    },
    categoryHeaderPrimary: {
        color: '#fff',
        fontWeight: '500',
        '&:hover': {
            color: '#E5E5E5',
        },
    },
    main: {
        width: '100%',
        backgroundColor: '#124954',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    boxActiveItem: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        position: 'relative',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    image: {
        width: '50%',
        cursor: 'pointer',
    }
});

function Navigator(props) {
    const { classes, ...other } = props;

    const Router = useRouter();

    const { user } = useStore(UserStore);

    const { role: userRole, zone } = user ;

    const categories = [
        {
            id: 'Dashboard',
            icon: DashboardIcon,
            active: Router.asPath === '/admin/dashboard',
            href: '/admin/dashboard',
            roles: [3, 4],
        },
        {
            id: 'Workers',
            icon: WorkerIcon,
            active: Router.asPath === '/admin/worker',
            href: '/admin/worker',
            roles: [3, 4],
        },
        {
            id: 'Bin Requests',
            icon: RequestBinIcon,
            active: Router.asPath === '/admin/binRequest',
            href: '/admin/binRequest',
            roles: [3, 4],
        },
        {
            id: 'Manage Bin',
            icon: ManageBinIcon,
            active: Router.asPath === '/admin/manageBin',
            href: '/admin/manageBin',
            roles: [3, 4],
        },
        {
            id: 'Mails',
            icon: MailIcon,
            active: Router.asPath === '/admin/mail',
            href: '/admin/mail',
            roles: [3, 4],
        },
        {
            id: 'Profile',
            icon: ProfileIcon,
            active: Router.asPath === '/admin/profile',
            href: '/admin/profile',
            roles: [3, 4],
        },
    ];

    return (
        <Drawer variant="permanent" {...other} >
            <List disablePadding style={{backgroundColor: '#124954'}}>
                <div className={classes.main}>
                    <img className={classes.image} src={Logo}  alt="Logo" onClick={()=>Router.push('/')} />
                </div>
                {categories.map(({ id, icon, href, roles }) => {

                    if (!roles.includes(userRole)) return ;

                    const [open, setOpen] = React.useState(true);

                    const handleClick = () => {
                        setOpen(!open);
                        Router.push(href);
                    };

                    return (<React.Fragment key={id}>
                        <Box color={'#124954'} className={classes.boxActiveItem}>
                            <ListItem
                                button
                                className={clsx(classes.categoryHeader, href === Router.pathname && classes.itemActiveItem)}
                                onClick={() => handleClick()}
                                // autoFocus={href === Router.pathname}
                            >
                                <ListItemIcon className={clsx(classes.itemIcon)}>
                                    <img width={'100%'} src={icon} alt={'image'}/>
                                </ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.categoryHeaderPrimary,
                                    }}
                                >
                                    {id}
                                </ListItemText>
                            </ListItem>
                        </Box>
                    </React.Fragment>);
                })}
            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
