/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/06/21 at 1:29 AM.
 */

import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import {useBinAddData} from '../../store/BinAddContext';
import {getAllZones} from '../../apis/all_zone';
import {useStore} from 'laco-react';
import UserStore from '../../store/userStore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Box, Button, CircularProgress, MenuItem} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import {each} from 'chart.js/helpers';

const useStyles = makeStyles((theme) => ({
    nextButton: {
        marginTop: theme.spacing(2),
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#124954'
        }
    },
    menuPaper: {
        maxHeight: 150,
        maxWidth: 50,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    }
}));

const AddAddressDialog = ({ setActiveStep, setBinData }) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [zones, setZones] = useState([]);
    const [zone, setZone] = useState('');

    const [pinCodes, setPinCodes] = useState([]);
    const [pinCode, setPinCode] = useState('');

    const [landmarks, setLandmarks] = useState([]);
    const [landmark, setLandmark] = useState('');

    const [ ,setData] = useBinAddData();

    const [loading, setLoading] = useState(false);
    const [menuLoading, setMenuLoading] = useState(false);

    const { user } = useStore(UserStore);

    const handleZoneChange = (e) => {
        const zoneId = e.target.value;
        const zoneData = zones[zones.findIndex(each => each._id.toString() === zoneId.toString())];
        setZone(zoneId);
        console.log(zoneData);
        setPinCodes(zoneData.pinCodes);
        setLandmarks(zoneData.landmarks);
    };

    const validate = () => {
        if (zone.trim() === '') {
            enqueueSnackbar('Please select a zone', { variant: 'warning' });
            return false;
        }
        if (pinCode.trim() === '') {
            enqueueSnackbar('Please select a pin code', { variant: 'warning' });
            return false;
        }
        if (landmark.trim() === '') {
            enqueueSnackbar('Please select a landmark', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validate()) {
            setBinData({
                zone,
                pinCode,
                landmark,
            });
            setActiveStep(1);
        }
    };

    useEffect(() => {
        setLoading(true);
        setMenuLoading(true);
        getAllZones()
            .then(res => {
                if (user && user.role === 3) {
                    const zoneId = res[res.findIndex(each => each._id.toString() === user.zone.toString())];
                    console.log(zoneId);
                    // setZone(zoneId);
                    setZones(res.map(each => {
                        return {
                            ...each,
                            selected: each._id.toString() === zoneId._id.toString()
                        };
                    }));
                    setZone(zoneId._id);
                    setTimeout(() => {
                        console.log(zones);
                        setPinCodes(zoneId.pinCodes);
                        setLandmarks(zoneId.landmarks);
                        setLoading(false);
                        setMenuLoading(false);
                    }, 0);
                } else {
                    setZones(res);
                    setLoading(false);
                    setMenuLoading(false);
                }
            });
    }, []);

    return (
        <>
            {
                !loading ? (
                    <div>
                        <GreenTextField
                            label={'Zone'}
                            name={'zone'}
                            select={true}
                            value={zone}
                            onChange={handleZoneChange}
                            SelectProps={{
                                MenuProps: {
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left'
                                    },
                                    getContentAnchorEl: null,
                                    classes: {
                                        paper: classes.menuPaper
                                    }
                                },
                                IconComponent: KeyboardArrowDownIcon
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.select2
                                }
                            }}
                            children = {
                                loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={24} color={'primary'} />
                                </div> : zones.map((each, i) => (
                                    <MenuItem
                                        value={each._id}
                                        style={i !== zones.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each.name}
                                    </MenuItem>
                                ))
                            }
                        />
                        <Box pb={2} />
                        <GreenTextField
                            label={'Pin-Code'}
                            name={'pin'}
                            select={true}
                            value={pinCode}
                            size={'medium'}
                            onChange={(e) => setPinCode(e.target.value)}
                            SelectProps={{
                                MenuProps: {
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left'
                                    },
                                    getContentAnchorEl: null,
                                    classes: {
                                        paper: classes.menuPaper
                                    }
                                },
                                IconComponent: KeyboardArrowDownIcon
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.select2
                                }
                            }}
                            children = {
                                menuLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={24} color={'primary'} />
                                </div> : pinCodes.map((each, i) => (
                                    <MenuItem
                                        value={each}
                                        style={i !== pinCodes.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each}
                                    </MenuItem>
                                ))
                            }
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Landmark'}
                            name={'landmark'}
                            select={true}
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            SelectProps={{
                                MenuProps: {
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left'
                                    },
                                    getContentAnchorEl: null,
                                    classes: {
                                        paper: classes.menuPaper
                                    }
                                },
                                IconComponent: KeyboardArrowDownIcon
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.select2
                                }
                            }}
                            children = {
                                menuLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={24} color={'primary'} />
                                </div> : landmarks.map((each, i) => (
                                    <MenuItem
                                        value={each}
                                        style={i !== landmarks.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each}
                                    </MenuItem>
                                ))
                            }
                        />
                        <Box my={2} />
                        <Button
                            color="secondary"
                            size="medium"
                            variant="contained"
                            fullWidth
                            onClick={handleNext}
                            style={{textTransform: 'none'}}
                        >
                            {
                                'Next'
                            }
                        </Button>
                    </div>
                ) : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress size={24} color={'primary'} />
                </div>
            }
        </>
    );
};

export default AddAddressDialog;