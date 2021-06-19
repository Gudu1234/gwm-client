/**
 * Created by Soumya (soumya@smarttersstudio.com) on 19/06/21 at 11:20 AM.
 */
import {
    Box,
    Button,
    CircularProgress, Dialog,
    DialogContent,
    DialogTitle, Hidden,
    IconButton,
    InputAdornment,
    Typography
} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useSnackbar} from 'notistack';
import OtpInput from 'react-otp-input';
import {forgetPassword, resetPassword, verifyOtp} from '../../apis/forgetPassword';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        marginBottom: theme.spacing(20),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            marginBottom: theme.spacing(10),
            marginTop: theme.spacing(7),
        },
    },
    image: {
        height: 'auto',
        width: '110px',
    },
    title: {
        color: theme.palette.primary.dark,
    },
    link: {
        color: theme.palette.primary.main,
    },
    subTitle: {
        fontSize: '19px',
    },
    otpBox: {
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    timerButton: {
        fontSize: '20px',
        color: theme.palette.primary.main,
        fontWeight: '800',
        lineHeight: 1,
    },
    flexGrow: {
        flexGrow: 1,
    },
}));

const ForgetPasswordDialog = ({open, setOpen}) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(null);
    const [otp, setOtp] = useState('');

    const [otpSent, setOtpSent] = React.useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
        setNewPassword('');
        setConfirmPassword('');
        setEmail('');
        setOtp('');
        setOtpSent(false);
        setToken(null);
    };

    const validate = () => {
        if (email.trim() === '') {
            enqueueSnackbar('Please input your email', { variant: 'warning' });
            return false;
        } else {
            if (
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email,
                )
            ) {
                enqueueSnackbar('Please input your email', { variant: 'warning' });
            }
        }
        return true;
    };

    const handleSendOtp = () => {
        if (validate()) {
            setLoading(true);
            forgetPassword(email)
                .then(() => {
                    setOtpSent(true);
                    setLoading(false);
                    enqueueSnackbar('Otp sent successfully.', {
                        variant: 'success',
                    });
                    setLoading(false);
                    setTimerRunning(true);
                    setTimer(30);
                    setOtp('');
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                    setLoading(false);
                });
        }
    };

    const validateOtp = () => {
        if (otp.length !== 6) {
            enqueueSnackbar('Please enter a valid otp', {
                variant: 'warning',
            });
            return false;
        } else {
            return true;
        }
    };

    const handleVerifyOtp = () => {
        if (validateOtp()) {
            setVerifyLoading(true);
            verifyOtp(
                email,
                otp,
            )
                .then((res) => {
                    setToken(res.accessToken);
                    setVerifyLoading(false);
                    enqueueSnackbar('Otp verified successfully.', {
                        variant: 'success',
                    });
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                    setVerifyLoading(false);
                });
        }
    };
    const validatePasswordField = () => {
        if (newPassword === '') {
            enqueueSnackbar('Enter new Password', {
                variant: 'warning',
            });
            return false;
        }
        if (confirmPassword === '' || confirmPassword !== newPassword) {
            enqueueSnackbar('Passwords do not match.', {
                variant: 'warning',
            });
            return false;
        }
        return true;
    };
    const handleResetPassword = () => {
        if (validatePasswordField()) {
            setResetPasswordLoading(true);
            resetPassword(
                token,
                newPassword,
                confirmPassword,
            )
                .then(() => {
                    setResetPasswordLoading(false);
                    enqueueSnackbar('Password reset successfully.', {
                        variant: 'success',
                    });
                    handleCloseDialog();
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                    setResetPasswordLoading(false);
                })
                .finally(() => {
                    setResetPasswordLoading(false);
                });
        }
    };

    useEffect(() => {
        if (timerRunning) {
            setTimeout(() => {
                if (timer - 1 === 0) setTimerRunning(false);
                setTimer(timer - 1);
            }, 1000);
        }
    }, [timer]);

    return (
        <Dialog open={open} fullWidth maxWidth={'xs'} onClose={handleCloseDialog}>
            <DialogTitle
                onClose={handleCloseDialog}
            >
                <Typography color={'primary'}>
                    {token ? (
                        'Enter new password to reset'
                    ) : !otpSent ? (
                        'Enter email to send password'
                    ) : (
                        'Once your email is verified you will be able to change your password.'
                    )}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box pb={1.5} my={1}>
                    {
                        token ? (
                            <>
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
                                                    {showPassword ?
                                                        <VisibilityIcon style={{color: '#124954'}}/> :
                                                        <VisibilityOffIcon style={{color: '#124954'}}/>
                                                    }
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
                                />
                            </>
                        ) : !otpSent ? (
                            <GreenTextField
                                label={'Enter Email'}
                                onChange={(event) => setEmail(event.target.value)}
                                type={'email'}
                                name={'email'}
                                value={email}
                            />
                        ) : (
                            <>
                                <Box className={classes.otpBox} display={'flex'}>
                                    <OtpInput
                                        className={classes.otp}
                                        errorStyle="error"
                                        focusStyle={{
                                            border: `2px solid ${theme.palette.secondary.main}`,
                                            // backgroundColor: '#124954',
                                            // color: '#fff'
                                        }}
                                        hasErrored={false}
                                        inputStyle={{
                                            width: '45px',
                                            height: '45px',
                                            margin: ' 10px 12px 10px 0px',
                                            fontSize: '1rem',
                                            borderRadius: 7,
                                            border: `2px solid ${theme.palette.secondary.main}`,
                                            outline: 'none',
                                        }}
                                        isDisabled={false}
                                        isInputNum={true}
                                        numInputs={6}
                                        onChange={(event) => setOtp(event)}
                                        separator={<span className={classes.separator}> </span>}
                                        shouldAutoFocus
                                        value={otp}
                                    />
                                    <Hidden xsDown>
                                        <span className={classes.flexGrow} />
                                        <Box
                                            alignItems={'center'}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            justifyContent={'center'}
                                        >
                                            <Typography className={classes.timerButton}>
                                                {'00:'}
                                                {timer > 9 ? timer : '0' + timer}
                                            </Typography>
                                            <Button
                                                color={'secondary'}
                                                disabled={timer !== 0 || loading}
                                                onClick={handleSendOtp}
                                                size="small"
                                            >
                                                {loading ? (
                                                    <CircularProgress size={13} color={'secondary'}/>
                                                ) : (
                                                    'Resend'
                                                )}
                                            </Button>
                                        </Box>
                                    </Hidden>
                                </Box>
                                <Hidden smUp>
                                    <Box display={'flex'} justifyContent={'center'}>
                                        <Box
                                            alignItems={'center'}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            justifyContent={'center'}
                                        >
                                            <Typography className={classes.timerButton}>
                                                {'00:'}
                                                {timer > 9 ? timer : '0' + timer}
                                            </Typography>
                                            <Button
                                                color={'secondary'}
                                                disabled={timer !== 0 || loading}
                                                onClick={handleSendOtp}
                                                size="small"
                                            >
                                                {loading ? (
                                                    <CircularProgress size={13} color={'secondary'}/>
                                                ) : (
                                                    'Resend'
                                                )}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Hidden>
                            </>
                        )
                    }
                    <Box my={2} />
                    <Button
                        color="secondary"
                        size="medium"
                        variant="contained"
                        disabled={token ? resetPasswordLoading : !otpSent ? loading : verifyLoading}
                        fullWidth
                        onClick={token ? handleResetPassword : !otpSent ? handleSendOtp : handleVerifyOtp}
                        style={{textTransform: 'none'}}
                    >
                        {token ? (
                            resetPasswordLoading ? (
                                <CircularProgress size={24} color={'secondary'} />
                            ) : (
                                'Reset Password'
                            )
                        ) : !otpSent ? (
                            loading ? (
                                <CircularProgress size={24} color={'secondary'} />
                            ) : (
                                'Send OTP'
                            )
                        ) : verifyLoading ? (
                            <CircularProgress size={24} color={'secondary'} />
                        ) : (
                            'Verify OTP'
                        )}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );

};

export default ForgetPasswordDialog;