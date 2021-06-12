import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden, IconButton,
    InputAdornment,
    makeStyles, Paper, TextField,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import { authenticate } from '../../src/apis/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import ClientCaptcha from 'react-client-captcha';
import Vector from '../../public/Login.svg';
import Refresh from '../../public/refresh (1).svg';
import Gwm from '../../public/GWMstrLogo.svg';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import WhiteTextField from '../../src/components/WhiteTextField';
import { Animated } from 'react-animated-css';
import GreenTextField from "../../src/components/GreenTextField";
import Link from '../../src/Link';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    paperDiv: {
        width: '90%',
        maxWidth: 440,
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2, 4),
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 2),
        },
    },
    forgetPassword: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        '&:hover': {
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    },
}));

const Login = () => {

    const classes = useStyles();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const { user } = useStore(UserStore);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (user && user.role === 3) {
            console.log(user);
            Router.push('/admin/dashboard');
        }
    }, []);



    const handleLogin = () => {
        setLoading(true);
        // console.log(1, username, password);

        if (username.trim() === '') {
            enqueueSnackbar('Username is required.', { variant: 'warning' });
            setLoading(false);
            return;
        }

        if (password.trim() === '') {
            enqueueSnackbar('Password is required.', { variant: 'warning' });
            setLoading(false);
            return;
        }

        authenticate(username, password)
            .then((response) => {
                const { accessToken, user } = response;
                // console.log(accessToken, user);
                localStorage.setItem('feathers-jwt', accessToken);
                UserStore.set(() => ({ token: accessToken, user }), 'login');
                enqueueSnackbar('Login successful', { variant: 'success' });
                setVisible(false);
                if (user.role === 3) {
                    Router.replace('/admin/dashboard');
                }
                else {
                    Router.replace('/');
                }
            })
            .catch(error => {
                enqueueSnackbar(error && error.message ? 'Invalid username or password.' : 'Something went wrong!', { variant: 'warning' });
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13)
            handleLogin();
    }

    return (
        <Box className={classes.container}>
            <Appbar />
            <Container maxWidth={'xl'} style={{padding: '0px 0px'}}>
                <Grid container justify={'center'} alignItems={'center'} style={{ minHeight: '100vh' }}>
                    <Grid item container xs={12} sm={6} justify={'flex-start'} alignItems={'center'}>
                        <Animated
                            animationIn='slideInLeft'
                            animationInDelay={100}
                            animationOut='slideOutLeft'
                            animationOutDelay={400}
                            isVisible={visible}
                        >
                            <img width={'116%'} src={Vector} alt={'vector'} />
                        </Animated>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12} sm={6}
                        justify={'center'}
                        alignItems={'center'}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            width={'100%'}
                            maxWidth={440}
                            borderRadius={'30px'}
                            bgcolor={'#fff'}
                            px={3}
                        >
                            <Hidden xsDown>
                                <Typography variant={'h1'} style={{color: '#124954'}} align={'center'}>
                                    <Animated
                                        animationIn="zoomIn"
                                        animationInDelay={100}
                                        animationOut="zoomOut"
                                        animationOutDelay={400}
                                        isVisible={visible}
                                    >
                                        {'LOGIN'}
                                    </Animated>
                                </Typography>
                            </Hidden>
                            <Box my={4} />
                            <Animated
                                animationIn="zoomIn"
                                animationInDelay={200}
                                animationOut="zoomOut"
                                animationOutDelay={300}
                                isVisible={visible}
                            >
                                <GreenTextField
                                    label={'Username'}
                                    name={'username'}
                                    value={username}
                                    onChange={event => setUserName(event.target.value)}
                                    onKeyDown={handleEnter}
                                />
                            </Animated>
                            <Box my={2} />
                            <Animated
                                animationIn="zoomIn"
                                animationInDelay={300}
                                animationOut="zoomOut"
                                animationOutDelay={200}
                                isVisible={visible}
                            >
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
                                    onKeyDown={handleEnter}
                                />
                            </Animated>
                            <Box my={3} />
                            <Animated
                                animationIn="zoomIn"
                                animationInDelay={400}
                                animationOut="zoomOut"
                                animationOutDelay={100}
                                isVisible={visible}
                            >
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Button
                                        color="secondary"
                                        disabled={loading}
                                        onClick={handleLogin}
                                        size="small"
                                        variant="contained"
                                        // fullWidth
                                        style={{width: '120px'}}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color={'secondary'}/>
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                </div>
                            </Animated>
                            <Box my={1} />
                            <Animated
                                animationIn="zoomIn"
                                animationInDelay={400}
                                animationOut="zoomOut"
                                animationOutDelay={100}
                                isVisible={visible}
                            >
                                <div>
                                    <Typography align={'center'} className={classes.forgetPassword}>
                                        {'Forgot Password ?'}
                                    </Typography>
                                </div>
                            </Animated>
                            <Box my={4} />
                        </Box>
                    </Grid>
                </Grid >
            </Container>
            <Box my={5}/>
            <Footer />
        </Box >
    );
};

export default Login;
