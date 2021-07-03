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
import {editDetails} from '../../apis/user';

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

const EditWorkerAddressDialog = ({
    open,
    setOpen,
    workerData,
    setWorkerData,
}) => {

    const classes = useStyles();

    const [address, setAddress] = useState(workerData.address.addressLine);

    const [street, setStreet] = useState(workerData.address.street);

    const [landmark, setLandmark] = useState(workerData.address.landmark);

    const [pinCode, setPinCode] = useState(workerData.address.pinCode);

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
        if (landmark.trim() === '') {
            enqueueSnackbar('Landmark must not be blank!', { variant: 'warning' });
            return false;
        }
        if (pinCode.trim() === '') {
            enqueueSnackbar('Pin Code must not be blank!', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleEditWorkerAddress = () => {
        if (validate()) {
            setLoading(true);
            let data = {
                address: {
                    addressLine: address,
                    street,
                    landmark,
                    pinCode,
                },
            };
            editDetails(workerData._id, data)
                .then((res) => {
                    setWorkerData(res);
                    setOpen(false);
                    enqueueSnackbar('Worker Address details edited successfully.', { variant: 'success' });
                }).catch((e) => {
                    enqueueSnackbar(e.message ? e.message : 'Details can not be edited', { variant: 'error' });
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Dialog open={open} fullWidth maxWidth={'xs'} onClose={handleClose}>
                <DialogTitle
                    onClose={() => {
                        handleClose();
                    }}
                >
                    <Typography color={'primary'}>
                        {'Edit Address details'}
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
                            required={false}
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Pin-Code'}
                            name={'pin'}
                            value={pinCode}
                            required={false}
                            onChange={(e) => setPinCode(e.target.value)}
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
                        onClick={handleEditWorkerAddress}
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

EditWorkerAddressDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    workerData: PropTypes.any,
    setOpen: PropTypes.func.isRequired,
    setWorkerData: PropTypes.any,
};

export default EditWorkerAddressDialog;