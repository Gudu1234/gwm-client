/**
 * Created by Soumya (soumya@smarttersstudio.com) on 03/07/21 at 1:36 AM.
 */
import {makeStyles} from '@material-ui/styles';
import {Avatar, Badge, Box, Button, Typography} from '@material-ui/core';
import CardBody from '../Card/CardBody';
import Card from '../Card/Card';
import React from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Confirm';
import {logout} from '../../apis/authentication';

const useStyle = makeStyles((theme) => ({
    avatar: {
        height: 95,
        width: 95,
        fontSize: 39,
        marginTop: -28,
        border: 'solid 4px #fff',
        background: theme.palette.primary.main,
    },
    headerDiv: {
        background: '#124954',
        borderRadius: '10px 10px 0px 0px',
        height: '35px',
    },
    nameTypo: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        maxWidth: '24ch',
        wordWrap: 'break-word',
        color: '#124954'
    },
    userNameTypo: {
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)'
    },
    gridItemStyle: {
        paddingLeft: '0px',
        paddingRight: '0px',
    },
}));

const WorkerProfileCard = ({avatar, name, username}) => {

    const classes = useStyle();

    const handleLogoutClick = () => {
        Confirm('Are you sure ?', 'Do you really want to logout ? ', 'Ok').then(() => {
            logout().then(() => window.location.reload(false));
            localStorage.removeItem('feathers-jwt');
            setTimeout(() => {
                window.location.href = '/login';
            }, 300);
        });
    };

    return (
        <Card style={{marginLeft: '0px', marginRight: '0px', width: '100%'}}>
            <Box
                alignItems="center"
                display="flex"
                fullWidth
                justifyContent="center"
                className={classes.headerDiv}
            >
                <Badge
                    overlap="circle"
                >
                    <Avatar className={classes.avatar} src={avatar}>
                        {'M'}
                    </Avatar>
                </Badge>
            </Box>
            <CardBody style={{paddingBottom: '0px'}}>
                <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    flexDirection='column'
                >
                    <Box py={1} />
                    <Typography className={classes.nameTypo}>
                        {name}
                    </Typography>
                    <Box py={0.5} />
                    <Typography className={classes.userNameTypo}>
                        {username}
                    </Typography>
                    <Box my={1.5} />
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        fullWidth
                        onClick={handleLogoutClick}
                        style={{
                            textTransform: 'none',
                            borderRadius: '50px 50px 0px 0px',
                            marginLeft: '50px',
                            marginRight: '50px'
                        }}
                    >
                        {'Logout'}
                    </Button>
                </Box>
            </CardBody>
        </Card>
    );
};

WorkerProfileCard.propTypes = {
    avatar: PropTypes.any,
    name: PropTypes.any,
    username: PropTypes.any
};

export default WorkerProfileCard;