/**
 * Created by Soumya (soumya@smarttersstudio.com) on 13/06/21 at 9:27 PM.
 */
import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import GreenTextField from '../GreenTextField';
import {makeStyles} from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {useSnackbar} from 'notistack';
import {getZoneDetails} from '../../apis/all_zone';
import {editBinDetails} from '../../apis/bin';

const useStyles = makeStyles((theme) => ({
    dialog: {
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#124954'
        }
    },
}));

const EditBinAddressDialog = ({
    open,
    setOpen,
    binData,
    setBinData,
}) => {

    const classes = useStyles();

    const [address, setAddress] = useState(binData.address);

    const [street, setStreet] = useState(binData.street);

    const [landmark, setLandmark] = useState(binData.landmark);
    const [landmarks, setLandmarks] = useState([]);

    const [pinCode, setPinCode] = useState(binData.pinCode);
    const [pinCodes, setPinCodes] = useState([]);

    const [mapLink, setMapLink] = useState(binData.mapLink);

    const [latitude, setLatitude] = useState(binData.coordinates[1]);

    const [longitude, setLongitude] = useState(binData.coordinates[0]);

    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const validate = () => {
        if (address.trim() === '') {
            enqueueSnackbar('Address must not be blank!', { variant: 'warning' });
            return false;
        }
        if (street.trim() === '') {
            enqueueSnackbar('Street must not be blank!', { variant: 'warning' });
            return false;
        }
        if (latitude === 0 || longitude === 0) {
            enqueueSnackbar('Please Enter both latitude and longitude.', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleEditBin = () => {
        if (validate()) {
            setLoading(true);
            let data = {
                address,
                street,
                landmark,
                pinCode,
                mapLink: mapLink ? mapLink : '',
                coordinates: [longitude, latitude]
            };
            editBinDetails(binData._id, data)
                .then((res) => {
                    setBinData(res);
                    setOpen(false);
                    enqueueSnackbar('Bin details edited successfully.', { variant: 'success' });
                }).catch((e) => {
                    enqueueSnackbar(e.message ? e.message : 'Details can not be edited', { variant: 'error' });
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        setLoading(true);
        getZoneDetails(binData.zone._id)
            .then(res => {
                setPinCodes(res.pinCodes);
                setLandmarks(res.landmarks);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Dialog open={open} fullWidth maxWidth={'xs'} onClose={handleClose}>
                <DialogTitle
                    onClose={() => {
                        handleClose();
                    }}
                >
                    <Typography color={'primary'}>
                        {'Edit bin details'}
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialog} dividers>
                    <Box pb={1.5} my={1}>
                        <GreenTextField
                            label={'Address'}
                            name={'address'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Street'}
                            name={'street'}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Landmark'}
                            name={'landmark'}
                            select={true}
                            required={false}
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
                                loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                        <GreenTextField
                            label={'Pin-Code'}
                            name={'pin'}
                            select={true}
                            value={pinCode}
                            required={false}
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
                                loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                            label={'Map-Link'}
                            name={'mapLink'}
                            value={mapLink}
                            onChange={(e) => setMapLink(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Latitude'}
                            name={'latitude'}
                            value={latitude}
                            type={'number'}
                            onChange={(e) => setLatitude(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Longitude'}
                            name={'longitude'}
                            value={longitude}
                            type={'number'}
                            onChange={(e) => setLongitude(e.target.value)}
                            required={false}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        size="medium"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                        onClick={handleEditBin}
                        style={{textTransform: 'none'}}
                    >
                        {
                            loading ? (
                                <CircularProgress size={24} color={'secondary'}/>
                            ) : (
                                'Edit'
                            )
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

EditBinAddressDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    binData: PropTypes.any,
    setOpen: PropTypes.func.isRequired,
    setBinData: PropTypes.any,
};

export default EditBinAddressDialog;