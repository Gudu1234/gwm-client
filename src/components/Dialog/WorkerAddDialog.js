/**
 * Created by Soumya (soumya@smarttersstudio.com) on 13/06/21 at 9:27 PM.
 */
import React, {useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle, IconButton,
    InputAdornment, MenuItem,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import GreenTextField from '../GreenTextField';
import {makeStyles} from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {useSnackbar} from 'notistack';
import {createWorker} from '../../apis/user';
import ImageUploadDialog from '../ImageUploadDialog';

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

const WorkerAddDialog = ({
    open,
    setOpen,
    updateWorker
}) => {

    const classes = useStyles();

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [phone, setPhone] = useState('');

    const [address, setAddress] = useState('');

    const [street, setStreet] = useState('');

    const [landmark, setLandmark] = useState('');

    const [pinCode, setPinCode] = useState('');

    const [role, setRole] = useState(0);

    const [gender, setGender] = useState(0);

    const [avatar, setAvatar] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [workers] = useState(
        [
            {value: 0, name: 'None'},
            {value: 1, name: 'Cleaner'},
            {value: 2, name: 'Driver'}
        ]
    );
    const [genders] = useState(
        [
            {value: 0, name: 'None'},
            {value: 1, name: 'Male'},
            {value: 2, name: 'Female'},
            {value: 3, name: 'Others'},
        ]
    );

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        if (name.trim() === '') {
            enqueueSnackbar('Name is required.', { variant: 'warning' });
            return false;
        }
        if (email.trim() === '') {
            enqueueSnackbar('Email is required.', { variant: 'warning' });
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
            enqueueSnackbar('Phone No. is required.', { variant: 'warning' });
            return false;
        } else if (phone.trim() !== '') {
            if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
                enqueueSnackbar('Please provide a valid phone number!', { variant: 'warning' });
                return false;
            }
        }
        if (password.trim() === '') {
            enqueueSnackbar('Password is required.', { variant: 'warning' });
            return false;
        } else if (password.trim() !== '') {
            if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)) {
                enqueueSnackbar('Password must be 8-16 letters and at least one number with one special character.', { variant: 'warning' });
                return false;
            }
        }
        if (address.trim() === '') {
            enqueueSnackbar('Address is required.', { variant: 'warning' });
            return false;
        }
        if (street.trim() === '') {
            enqueueSnackbar('Street is required.', { variant: 'warning' });
            return false;
        }
        if (landmark.trim() === '') {
            enqueueSnackbar('Landmark is required.', { variant: 'warning' });
            return false;
        }
        if (pinCode.trim() === '') {
            enqueueSnackbar('PinCode is required.', { variant: 'warning' });
            return false;
        }
        if (role === 0) {
            enqueueSnackbar('Please select a worker type.', { variant: 'warning' });
            return false;
        }
        if (gender === 0) {
            enqueueSnackbar('Please select a gender.', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleCreteWorker = () => {
        if (validate()) {
            setLoading(true);
            let addressOfWorker = {
                addressLine: address,
                street,
                landmark,
                pinCode
            };
            if (avatar !== '') {
                createWorker(
                    name,
                    email,
                    password,
                    phone,
                    addressOfWorker,
                    role,
                    gender,
                    1,
                    avatar,
                ).then((res) => {
                    enqueueSnackbar('Worker created successfully.', { variant: 'success' });
                    updateWorker(res, true);
                    setOpen(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setPhone('');
                    setAddress('');
                    setStreet('');
                    setLandmark('');
                    setPinCode('');
                    setRole(0);
                    setGender(0);
                }).catch((e) => {
                    enqueueSnackbar(e.message ? e.message : 'Worker can not be created', { variant: 'error' });
                }).finally(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
                setDialogOpen(true);
            }
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
                        {'Enter details to create a worker'}
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <Box pb={1.5} my={1}>
                        <GreenTextField
                            label={'Name'}
                            name={'Name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Email'}
                            name={'email'}
                            value={email}
                            type={'email'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Password'}
                            name={'password'}
                            onChange={event => setPassword(event.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <VisibilityIcon style={{color: '#124954'}}/> : <VisibilityOffIcon style={{color: '#124954'}}/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Phone'}
                            name={'phone'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Address'}
                            name={'address'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Street'}
                            name={'street'}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Landmark'}
                            name={'landmark'}
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'PinCode'}
                            name={'pinCode'}
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                        <Box my={2} />
                        <GreenTextField
                            label={'Worker Type'}
                            name={'worker'}
                            select={true}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                                workers.map((each, i) => (
                                    <MenuItem
                                        value={each.value}
                                        style={i !== workers.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each.name}
                                    </MenuItem>
                                ))
                            }
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
                        <Box my={2} />
                        <Button
                            color="secondary"
                            size="medium"
                            variant="contained"
                            disabled={loading}
                            fullWidth
                            onClick={handleCreteWorker}
                            style={{textTransform: 'none'}}
                        >
                            {
                                loading ? (
                                    <CircularProgress size={24} color={'secondary'}/>
                                ) : (
                                    avatar === '' ? 'Upload Image' : 'Create'
                                )
                            }
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <ImageUploadDialog setOpenDialog={setDialogOpen} openDialog={dialogOpen} setAvatar={setAvatar}/>
        </>
    );
};

WorkerAddDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default WorkerAddDialog;