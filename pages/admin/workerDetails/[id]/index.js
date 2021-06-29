/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/06/21 at 11:38 PM.
 */

import {
    Avatar, Badge,
    Box,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useMemo, useState} from 'react';
import {useSnackbar} from 'notistack';
import {useRouter} from 'next/router';
import {editDetails, getUserDetails} from '../../../../src/apis/user';
import TableLoader from '../../../../src/components/Skeleton/TableLoader';
import DetailsIcon from '@material-ui/icons/Details';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import BasicDetails from '../../../../src/components/Workers/BasicDetails';
import Address from '../../../../src/components/Workers/Address';
import Card from '../../../../src/components/Card/Card';
import AssignedBins from '../../../../src/components/Workers/AssignedBins';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ImageUploadDialog from '../../../../src/components/ImageUploadDialog';
import UserStore from '../../../../src/store/userStore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(3),
        backgroundColor: '#fff'
    },
    heading:{
        color: '#ffffff'
    },
    content: {
        padding: theme.spacing(3),
        cursor: 'pointer'
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    profile: {
        width: 150,
        height: 150
    },
    card: {
        padding: 3,
    },
    caption: {
        fontWeight: 'bold',
        color: 'grey'
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
}));

const WorkerDetails = () => {

    const classes = useStyles();
    const [option,setOption] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();
    const { id } = Router.query;
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [avatar, setAvatar] = useState(userData?.avatar);
    const [avatarEdited, setAvatarEdited] = useState(false);
    const role = useMemo(()=> userData?.role,[userData]);

    const test = [
        {
            icon: <DetailsIcon color={'primary'}/>,
            selectedIcon: <DetailsIcon color={'secondary'}/>,
            title: "Basic Details",
            component: <BasicDetails userData={userData} />,
            roles: [1, 2, 3],
            option: 2
        },
        {
            icon: <HomeIcon color={'primary'}/>,
            selectedIcon: <HomeIcon color={'secondary'}/>,
            title: "Address",
            component: <Address userData={userData}/>,
            roles: [1, 2, 3],
            option: 3
        },
        {
            icon: <DeleteIcon color={'primary'}/>,
            selectedIcon: <DeleteIcon color={'secondary'}/>,
            title: "Assigned Bins",
            component: <AssignedBins userId={id} />,
            roles: [1, 2],
            option: 4
        },
        // {
        //     icon: <AddShoppingCartIcon />,
        //     title: "Personal Orders",
        //     component: <AllOrders option={option} userId={id}/>,
        //     roles: [1,2,3],
        //     option: 5
        // },
        // {
        //     icon: <DriveEtaIcon />,
        //     title: "Delivery",
        //     component: <React.Fragment>
        //         <AllDeliveryBoyOrders userId={id}/>
        //         <AllDeliveryBoyCompletedOrders userId={id}/>
        //     </React.Fragment>,
        //     roles: [3],
        //     option: 6
        // },
        // {
        //     icon: <DetailsIcon />,
        //     title: "Appointment Slots",
        //     component: <AppointmentSlots id={userData?.doctorDetails ? {doctor: id} : {user: id}} />,
        //     roles: [1,2],
        //     option: 7
        // },
        // {
        //     icon: <DetailsIcon />,
        //     title: "Consultation History",
        //     component: <Consultation id={userData?.doctorDetails ? {doctor: id} : {user: id}} />,
        //     roles: [1,2],
        //     option: 7
        // },
        // {
        //     icon: <LocalHospitalIcon />,
        //     title: "Professional Details",
        //     component: <DoctorProfessionalDetails userData={userData} />,
        //     roles: [2],
        //     option: 8
        // },
        // {
        //     icon: <GamesIcon />,
        //     title: "Others",
        //     component: <DoctorCertificates certificates={userData?.doctorDetails?.certificates} />,
        //     roles: [2],
        //     option: 9
        // },
    ];

    useEffect(() => {
        if (avatarEdited) {
            editDetails(userData?._id, { avatar })
            editDetails(userData?._id, { avatar })
                .then(res => {
                    setAvatar(res.avatar);
                    setUserData(res);
                    setAvatarEdited(false);
                    enqueueSnackbar('Avatar edited successfully.', { variant: 'success' });
                })
                .catch((e) => {
                    enqueueSnackbar(e.message(), { variant: 'warning' });
                });
        } else {
            setLoading(true);
            getUserDetails(id)
                .then((res)=>{
                    setUserData(res);
                })
                .catch((error)=>{
                    enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
                })
                .finally(()=>{
                    setLoading(false);
                });
        }
    },[avatarEdited]);

    const getNameByRole = ()=>{
        switch(role) {
        case 1:
            return 'Cleaner';
        case 2:
            return 'Driver';
        case 3:
            return 'Admin';
        default:
            return 'Super Admin';
        }
    }

    return (
        <Grid container spacing={2}>
            {
                !loading ?
                    <>
                        <Grid item md={4} sm={6} xs={12}>
                            <Card style={{marginTop: '0px', width: '100%', borderRadius: '6px'}} >
                                <Box display={'flex'} justifyContent={'center'} p={1} pb={2}>
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
                                        <Avatar className={classes.profile} src={userData && userData.avatar}>
                                            {'M'}
                                        </Avatar>
                                    </Badge>
                                    {/*<Avatar className={classes.profile} src={userData && userData.avatar}/>*/}
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} alignItems={'center'} p={2}>
                                    <Typography style={{color: '#124954', fontSize: '20px'}}>
                                        {userData && userData.name ? userData.name : 'N/A'}
                                    </Typography>
                                    <Box my={0.5} />
                                    <Typography style={{fontSize: '14px', color: 'rgba(18, 73, 84, 0.75)'}}>
                                        {
                                            getNameByRole()
                                        }
                                    </Typography>
                                </Box>
                            </Card>
                            <Box mt={2}/>
                            <Card style={{marginTop: '0px', width: '100%', borderRadius: '6px'}} >
                                <List component="nav">
                                    {
                                        test.filter(
                                            each => each.roles.indexOf(userData?.role) !== -1
                                        ).map((each,position)=>
                                            <ListItem
                                                button
                                                selected={option === position + 1}
                                                onClick={() => setOption(position + 1)}
                                                style={{color: option === position + 1 ? '#FF9A3E' : '#124954'}}
                                            >
                                                <ListItemIcon>
                                                    {
                                                        option === position + 1
                                                            ? each.selectedIcon
                                                            : each.icon
                                                    }
                                                </ListItemIcon>
                                                <ListItemText primary={each.title}/>
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Card>
                        </Grid>
                        <Grid item md={8} sm={6} xs={12}>
                            <Card style={{width: '100%', marginTop: '0px'}}>
                                <Box display={'flex'} justifyContent={'center'} p={2} flexDirection={'column'} bgcolor={'#fff'}>
                                    {
                                        test.filter(
                                            each => each.roles.indexOf(userData?.role) !== -1
                                        )?.[option-1].component
                                    }
                                </Box>
                            </Card>
                        </Grid>
                        <ImageUploadDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            setAvatar={setAvatar}
                            setAvatarEdited={setAvatarEdited}
                        />
                    </>
                    : <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                        height={'100 vh'}
                    >
                        <TableLoader />
                    </Box>
            }
        </Grid>
    );
};

export default WorkerDetails;