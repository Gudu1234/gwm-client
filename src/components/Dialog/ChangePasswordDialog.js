/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/06/21 at 1:54 AM.
 */
import {
    Box,
    Button, CircularProgress, Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Typography
} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, {useState} from 'react';
import {useSnackbar} from 'notistack';
import {editDetails} from '../../apis/user';

const ChangePasswordDialog = ({open, setOpen, userId}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const validate = () => {
        if (newPassword.trim() === '') {
            enqueueSnackbar('Please enter the new password.', { variant: 'warning' });
            return false;
        }
        if (newPassword.trim() !== '' && confirmPassword.trim() === '') {
            enqueueSnackbar('Please enter the password again to confirm.', { variant: 'warning' });
            return false;
        }
        if (newPassword.trim() !== '') {
            if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(newPassword)) {
                enqueueSnackbar('Password must be 8-16 letters and at least one number with one special character.', { variant: 'warning' });
                return false;
            }
        }
        if (newPassword.trim() !== confirmPassword.trim()) {
            enqueueSnackbar('Passwords do not match.', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
    };

    const handlePasswordChange = () => {
        if (validate()) {
            setLoading(true);
            editDetails(userId, { password: newPassword })
                .then(() => {
                    enqueueSnackbar('Password changed successfully.', { variant: 'success' });
                    setLoading(false);
                    setOpen(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setShowPassword(false);
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                });
        }
    };

    return (
        <Dialog open={open} fullWidth maxWidth={'xs'} onClose={handleCloseDialog}>
            <DialogTitle
                onClose={handleCloseDialog}
            >
                <Typography color={'primary'}>
                    {'Change your password'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box pb={1.5} my={1}>
                    <GreenTextField
                        label={'New Password'}
                        name={'newPassword'}
                        onChange={event => setNewPassword(event.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityIcon style={{color: '#124954'}}/> : <VisibilityOffIcon style={{color: '#124954'}}/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box my={2} />
                    <GreenTextField
                        label={'Confirm Password'}
                        name={'confirmPassword'}
                        onChange={event => setConfirmPassword(event.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position="end">
                        //             <IconButton
                        //                 onClick={() => setShowPassword(true)}
                        //             >
                        //                 {showPassword ? <VisibilityIcon style={{color: '#124954'}}/> : <VisibilityOffIcon style={{color: '#124954'}}/>}
                        //             </IconButton>
                        //         </InputAdornment>
                        //     ),
                        // }}
                    />
                    <Box my={2} />
                    <Button
                        color="secondary"
                        size="medium"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                        onClick={handlePasswordChange}
                        style={{textTransform: 'none'}}
                    >
                        {
                            loading ? (
                                <CircularProgress size={24} color={'secondary'}/>
                            ) : (
                                'Confirm'
                            )
                        }
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordDialog;