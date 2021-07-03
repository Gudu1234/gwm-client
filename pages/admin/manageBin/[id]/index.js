/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/06/21 at 11:38 PM.
 */

import {
    Box, Button, CircularProgress,
    Grid, IconButton,
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
import TableLoader from '../../../../src/components/Skeleton/TableLoader';
import Card from '../../../../src/components/Card/Card';
import BinAvatar from '../../../../public/BinStaticImage.svg';
import {getBinDetails, removeBin} from '../../../../src/apis/bin';
import BinDetails from '../../../../src/components/bin-components/BinDetails';
import PinDropIcon from '@material-ui/icons/PinDrop';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import MapIcon from '@material-ui/icons/Map';
import BinWorkerDetails from '../../../../src/components/bin-components/BinWorkerDetails';
import MapView from '../../../../src/components/bin-components/MapView';
import GotoIcon from '../../../../public/Goto.png';
import Link from '../../../../src/components/Link';
import {useStore} from 'laco-react';
import UserStore from '../../../../src/store/userStore';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Confirm from '../../../../src/components/Confirm';
import {removeWorker} from '../../../../src/apis/user';

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
    editIcon: {
        borderRadius: '50px'
    }
}));

const ManageBinDetails = () => {

    const classes = useStyles();
    const [option,setOption] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();
    const { id } = Router.query;
    const [binData, setBinData] = useState();
    const [workerData, setWorkerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const type = useMemo(()=> binData?.type,[binData]);
    const [parentBinId, setParentBinId] = useState(null);

    const { user } = useStore(UserStore);

    const test = [
        {
            icon: <PinDropIcon color={'primary'}/>,
            selectedIcon: <PinDropIcon color={'secondary'}/>,
            title: "Address Details",
            component: <BinDetails binDetails={binData} setBinDetails={setBinData}/>,
            roles: [1, 2, 3, 4],
            option: 2
        },
        {
            icon: <NaturePeopleIcon color={'primary'}/>,
            selectedIcon: <NaturePeopleIcon color={'secondary'}/>,
            title: "Worker Details",
            component: <BinWorkerDetails workerDetails={workerData} binDetails={binData} setBinDetails={setBinData} setWorkerData={setWorkerData}/>,
            roles: [3, 4],
            option: 3
        },
        {
            icon: <MapIcon color={'primary'}/>,
            selectedIcon: <MapIcon color={'secondary'}/>,
            title: "Map View",
            component: <MapView binData={binData} />,
            roles: [1, 2, 3, 4],
            option: 4
        },
    ];

    useEffect(() => {
        setLoading(true);
        getBinDetails(id)
            .then((res) => {
                setBinData(res);
                if (res.type === 2) {
                    setParentBinId(res.parent.binId);
                }
                if (res.worker) {
                    setWorkerData(res.worker);
                }
            })
            .catch((error)=>{
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
            })
            .finally(()=>{
                setLoading(false);
            });
    },[id]);

    const getBinType = () => {
        // console.log(parentBinId);
        switch(type) {
            case 1:
                return 'Parent';
            case 2:
                return `Child (Parent: ${parentBinId})`;
        }
    }

    const handleDeleteBin = () => {
        Confirm('Are you Sure ?', 'Do you really want to Delete ?', 'Ok').then(() => {
            setDeleteLoading(true);
            removeBin(id)
                .then(() => {
                    enqueueSnackbar('Bin removed.', { variant: 'success' });
                    Router.push('/admin/manageBin');
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                })
                .finally(() => {
                    setDeleteLoading(false);
                });
        });
    }

    return (
        <Grid container spacing={2}>
            {
                !loading ?
                    <>
                        <Grid item md={4} sm={6} xs={12}>
                            <Card style={{marginTop: '0px', width: '100%', borderRadius: '6px'}} >
                                <Box display={'flex'} justifyContent={'center'} p={1} pb={2}>
                                    <img width={'50%'} src={BinAvatar} alt={'BinAvatar'}/>
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} alignItems={'center'} p={2}>
                                    <Typography style={{color: '#124954', fontSize: '20px'}}>
                                        {binData && binData.binId ? binData.binId : 'N/A'}
                                    </Typography>
                                    <Box my={0.5} />
                                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                        {
                                            type === 2 ? (
                                                <Typography
                                                    style={{
                                                        fontSize: '14px',
                                                        color: 'rgba(18, 73, 84, 0.75)',
                                                        textTransform: 'none',
                                                        fontWeight: '600',
                                                        letterSpacing: '0.06em'
                                                    }}
                                                    component={Button}
                                                    onClick={() => Router.push(`/admin/manageBin/${binData.parent._id}`)}
                                                >
                                                    {
                                                        getBinType()
                                                    }
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    style={{fontSize: '14px', color: 'rgba(18, 73, 84, 0.75)'}}
                                                >
                                                    {
                                                        getBinType()
                                                    }
                                                </Typography>
                                            )
                                        }
                                        {/*{*/}
                                        {/*    type && type === 2 ? (*/}
                                        {/*        <IconButton>*/}
                                        {/*            <img src={GotoIcon} alt={'GotoIcon'} width={'50%'}/>*/}
                                        {/*        </IconButton>*/}
                                        {/*    ) : null*/}
                                        {/*}*/}
                                    </Box>
                                </Box>
                            </Card>
                            <Box mt={2}/>
                            <Card style={{marginTop: '0px', width: '100%', borderRadius: '6px'}} >
                                <List component="nav">
                                    {
                                        test.filter(
                                            each => each.roles.indexOf(user?.role) !== -1
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
                                            each => each.roles.indexOf(user?.role) !== -1
                                        )?.[option-1].component
                                    }
                                </Box>
                            </Card>
                        </Grid>
                        {
                            user.role === 3 || user.role === 4 ? (
                                <Grid item md={12} sm={12} xs={12} justify={'center'} alignItems={'center'}>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Button
                                            variant={'contained'}
                                            color={'secondary'}
                                            startIcon={<DeleteForeverRoundedIcon />}
                                            style={{textTransform: 'none'}}
                                            disabled={deleteLoading}
                                            onClick={handleDeleteBin}
                                        >
                                            {
                                                deleteLoading ? (
                                                    <CircularProgress size={24} color={'secondary'}/>
                                                ) : (
                                                    'Delete Bin'
                                                )
                                            }
                                        </Button>
                                    </Box>
                                </Grid>
                            ) : null
                        }
                    </>
                    : <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                    >
                        <TableLoader />
                    </Box>
            }
        </Grid>
    );
};

export default ManageBinDetails;