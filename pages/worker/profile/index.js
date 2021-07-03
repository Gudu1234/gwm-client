import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Badge,
    Box, Button,
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography
} from '@material-ui/core';
import Card from '../../../src/components/Card/Card';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {makeStyles} from '@material-ui/styles';
import CardBody from '../../../src/components/Card/CardBody';
import UserInfoCard from '../../../src/components/profile-components/UserInfoCard';
import {useStore} from 'laco-react';
import UserStore from '../../../src/store/userStore';
import UserAddressTable from '../../../src/components/profile-components/UserAddressTable';
import Confirm from '../../../src/components/Confirm';
import {logout} from '../../../src/apis/authentication';
import ImageUploadDialog from '../../../src/components/ImageUploadDialog';
import {editDetails} from '../../../src/apis/user';
import {useSnackbar} from 'notistack';

const useStyle = makeStyles((theme) => ({
    avatar: {
        height: 110,
        width: 110,
        fontSize: 39,
        marginTop: -28,
        border: 'solid 4px #fff',
        background: theme.palette.primary.main,
    },
    cameraIcon: {
        height: 22,
        width: 22,
        background: theme.palette.primary.dark,
        cursor: 'pointer',
        margin: '-8px 0px 0px -8px',
    },
    cameraIconImage: {
        height: 14,
        width: 14,
        color: 'white',
    },
    headerDiv: {
        background: '#124954',
        borderRadius: '10px 10px 0px 0px',
        height: '40px',
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
    tableCellLabel: {
        paddingLeft: '20px',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)',
        '@media (max-width:960px)': {
            paddingLeft: '0px',
        },
    },
    tableCell: {
        paddingLeft: '20px',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: '#124954',
        '@media (max-width:960px)': {
            paddingLeft: '0px',
        },
    }
}));

const Profile = () => {

    const classes = useStyle();

    const { user } = useStore(UserStore);

    const {enqueueSnackbar} = useSnackbar();

    const [avatar, setAvatar] = useState(user.avatar);
    const [avatarEdited, setAvatarEdited] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const {
        _id: userId,
        email,
        name,
        username,
        phone,
        gender,
        zone,
        address: { addressLine, street, landmark = 'N/A', pinCode }
    } = user;

    let userGender = gender === 1 ? 'Male' : gender === 2 ? 'Female' : 'Others';

    const handleLogoutClick = () => {
        Confirm('Are you sure ?', 'Do you really want to logout ? ', 'Ok').then(() => {
            logout().then(() => window.location.reload(false));
            localStorage.removeItem('feathers-jwt');
            setTimeout(() => {
                window.location.href = '/login';
            }, 300);
        });
    };

    useEffect(() => {
        if (avatarEdited) {
            const token = localStorage.getItem('feathers-jwt');
            editDetails(userId, { avatar })
                .then(res => {
                    UserStore.set(() => ({ token: token, user: res }), 'login');
                    setAvatar(res.avatar);
                    enqueueSnackbar('Avatar edited successfully.', { variant: 'success' });
                })
                .catch((e) => {
                    enqueueSnackbar(e.message(), { variant: 'warning' });
                });
        }
    }, [avatarEdited]);

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12} justify={'center'} alignItems={'center'} className={classes.gridItemStyle}>
                        <Card style={{marginTop: '50px', marginLeft: '0px', marginRight: '0px', width: '100%'}}>
                            <Box
                                alignItems="center"
                                display="flex"
                                fullWidth
                                justifyContent="center"
                                className={classes.headerDiv}
                            >
                                <Badge
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={
                                        <Avatar className={classes.cameraIcon}>
                                            <CameraAltIcon
                                                className={classes.cameraIconImage}
                                                color={'primary'}
                                                onClick={() => setOpenDialog(true)}
                                            />
                                        </Avatar>
                                    }
                                    overlap="circle"
                                >
                                    <Avatar className={classes.avatar} src={avatar}>
                                        {'M'}
                                    </Avatar>
                                </Badge>
                            </Box>
                            <CardBody>
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
                                    <Typography className={classes.userNameTypo}>
                                        {username}
                                    </Typography>
                                </Box>
                                <Grid container justify={'center'} alignItems={'center'}>
                                    <UserInfoCard label={'Email'} value={email} />
                                    <UserInfoCard label={'Password'} value={'***********'} userId={userId} />
                                    <UserInfoCard label={'Phone'} value={`+91-${phone}`} />
                                    <UserInfoCard label={'Gender'} value={userGender} />
                                </Grid>
                            </CardBody>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12} className={classes.gridItemStyle}>
                        <Card style={{width: '100%', marginTop: '0px'}}>
                            <CardBody>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <UserAddressTable label={'Zone'} value={zone ? zone.name : 'N/A'}/>
                                            </TableRow>
                                            <TableRow>
                                                <UserAddressTable label={'Address'} value={addressLine}/>
                                            </TableRow>
                                            <TableRow>
                                                <UserAddressTable label={'Locality'} value={street}/>
                                            </TableRow>
                                            <TableRow>
                                                <UserAddressTable label={'Landmark'} value={landmark}/>
                                            </TableRow>
                                            <TableRow>
                                                <UserAddressTable label={'Pin-Code'} value={pinCode}/>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12} justify={'center'} alignItems={'center'} className={classes.gridItemStyle}>
                        <Button
                            color={'secondary'}
                            variant={'contained'}
                            size={'medium'}
                            style={{textTransform: 'none', width: '150px'}}
                            onClick={handleLogoutClick}
                        >
                            {'Logout'}
                        </Button>
                    </Grid>
                </Grid>
                <ImageUploadDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    setAvatar={setAvatar}
                    setAvatarEdited={setAvatarEdited}
                />
            </Box>
        </div>
    );
};

export default Profile;
