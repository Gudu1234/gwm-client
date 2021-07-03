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

const EditBasicDetailsDialog = ({
    open,
    setOpen,
    workerData,
    setWorkerData,
}) => {

    const classes = useStyles();

    const [name, setName] = useState(workerData.name);

    const [email, setEmail] = useState(workerData.email);

    const [phone, setPhone] = useState(workerData.phone);

    const [gender, setGender] = useState(workerData.gender);

    const [genders] = useState(
        [
            {value: 1, name: 'Male'},
            {value: 2, name: 'Female'},
            {value: 3, name: 'Others'},
        ]
    );

    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const validate = () => {
        if (name.trim() === '') {
            enqueueSnackbar('Name must not be blank!', { variant: 'warning' });
            return false;
        }
        if (email.trim() === '') {
            enqueueSnackbar('Email must not be blank!', { variant: 'warning' });
            return false;
        } else if (email.trim() !== '') {
            if (
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email,
                )
            ) {
                enqueueSnackbar('Please provide a valid email!', { variant: 'warning' });
                return false;
            }
        }
        if (phone.trim() === '') {
            enqueueSnackbar('Phone must not be blank!', { variant: 'warning' });
            return false;
        } else if (phone.trim() !== '') {
            if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
                enqueueSnackbar('Please provide a valid phone number!', { variant: 'warning' });
                return false;
            }
        }
        return true;
    };

    const handleEditWorker = () => {
        if (validate()) {
            setLoading(true);
            let data = {
                name,
                email,
                phone,
                gender,
            };
            editDetails(workerData._id, data)
                .then((res) => {
                    setWorkerData(res);
                    setOpen(false);
                    enqueueSnackbar('Worker details edited successfully.', { variant: 'success' });
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
                        {'Edit Worker details'}
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialog} dividers>
                    <Box pb={1.5} my={1}>
                        <GreenTextField
                            label={'Name'}
                            name={'name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Email'}
                            name={'email'}
                            value={email}
                            type={'email'}
                            onChange={(e) => setEmail(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Phone'}
                            name={'phone'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required={false}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Gender'}
                            name={'gender'}
                            select={true}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
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
                            children={
                                genders.map((each, i) => (
                                    <MenuItem
                                        value={each.value}
                                        style={i !== genders.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each.name}
                                    </MenuItem>
                                ))
                            }
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
                        onClick={handleEditWorker}
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

EditBasicDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    workerData: PropTypes.any,
    setOpen: PropTypes.func.isRequired,
    setWorkerData: PropTypes.any,
};

export default EditBasicDetailsDialog;