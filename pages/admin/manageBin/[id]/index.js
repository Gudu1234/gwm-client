/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/06/21 at 11:38 PM.
 */

import {
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
import TableLoader from '../../../../src/components/Skeleton/TableLoader';
import Card from '../../../../src/components/Card/Card';
import BinAvatar from '../../../../public/BinStaticImage.svg';
import {getBinDetails} from '../../../../src/apis/bin';
import BinDetails from '../../../../src/components/bin-components/BinDetails';
import PinDropIcon from '@material-ui/icons/PinDrop';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import MapIcon from '@material-ui/icons/Map';
import BinWorkerDetails from '../../../../src/components/bin-components/BinWorkerDetails';
import MapView from '../../../../src/components/bin-components/MapView';

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

const ManageBinDetails = () => {

    const classes = useStyles();
    const [option,setOption] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();
    const { id } = Router.query;
    const [binData, setBinData] = useState();
    const [workerData, setWorkerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [addressEdited, setAddressEdited] = useState(false);
    const [workerEdited, setWorkerEdited] = useState(false);
    const type = useMemo(()=> binData?.type,[binData]);
    const [parentBinId, setParentBinId] = useState(null);

    const test = [
        {
            icon: <PinDropIcon color={'primary'}/>,
            selectedIcon: <PinDropIcon color={'secondary'}/>,
            title: "Address Details",
            component: <BinDetails binData={binData} />,
            option: 2
        },
        {
            icon: <NaturePeopleIcon color={'primary'}/>,
            selectedIcon: <NaturePeopleIcon color={'secondary'}/>,
            title: "Worker Details",
            component: <BinWorkerDetails userData={workerData} binData={binData}/>,
            option: 3
        },
        {
            icon: <MapIcon color={'primary'}/>,
            selectedIcon: <MapIcon color={'secondary'}/>,
            title: "Map View",
            component: <MapView binData={binData} />,
            option: 4
        },
    ];

    useEffect(() => {
        setLoading(true);
        getBinDetails(id)
            .then((res)=>{
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
    },[]);

    const getBinType = () => {
        // console.log(parentBinId);
        switch(type) {
            case 1:
                return 'Parent';
            case 2:
                return `Child (Parent: ${parentBinId})`;
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
                                    <img width={'50%'} src={BinAvatar} alt={'BinAvatar'}/>
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} alignItems={'center'} p={2}>
                                    <Typography style={{color: '#124954', fontSize: '20px'}}>
                                        {binData && binData.binId ? binData.binId : 'N/A'}
                                    </Typography>
                                    <Box my={0.5} />
                                    <Typography style={{fontSize: '14px', color: 'rgba(18, 73, 84, 0.75)'}}>
                                        {
                                            getBinType()
                                        }
                                    </Typography>
                                </Box>
                            </Card>
                            <Box mt={2}/>
                            <Card style={{marginTop: '0px', width: '100%', borderRadius: '6px'}} >
                                <List component="nav">
                                    {
                                        test.map((each,position)=>
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
                                        test?.[option-1].component
                                    }
                                </Box>
                            </Card>
                        </Grid>
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