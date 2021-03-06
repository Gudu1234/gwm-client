/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 8:52 PM.
 */
import {Box, Divider, Hidden, List, ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core';
import Link from '../../Link';
import React from 'react';

const useStyles = makeStyles(theme => ({
    drawer: {
        zIndex: 1,
        background: theme.palette.primary.main,
    },
    drawerTitle: {
        fontSize: '90px',
        fontWeight: 'bold',
        lineHeight: '120px',
        letterSpacing: 1,
        'text-shadow': '-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff',
        marginLeft: '50px',
        textDecoration: 'none',
    },
    divider: {
        border: '1px solid #7AE3B1',
        // '& .MuiDivider-root': {
        //     backgroundColor: '#7AE3B1'
        // }
        backgroundColor: '#7AE3B1'
    },
}));

const HomeMenu = () => {

    const classes = useStyles();

    return (
        <Hidden smDown>
            <Box my={12}/>
            <div className={classes.drawer}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <Divider className={classes.divider} />
                    <ListItem button component={Link} href="/request" style={{textDecoration: 'none'}}>
                        <ListItemText>
                            <Typography className={classes.drawerTitle} >
                                {'REQUEST BIN'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem button component={Link} href="/contact" style={{textDecoration: 'none'}}>
                        <ListItemText>
                            <Typography className={classes.drawerTitle}>
                                {'CONTACT'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem button component={Link} href="/about" style={{textDecoration: 'none'}}>
                        <ListItemText>
                            <Typography className={classes.drawerTitle}>
                                {'ABOUT'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem button component={Link} href="/login" style={{textDecoration: 'none'}}>
                        <ListItemText>
                            <Typography className={classes.drawerTitle}>
                                {'LOGIN'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                </List>
            </div>
            <Box my={12}/>
        </Hidden>
    );
};

export default HomeMenu;