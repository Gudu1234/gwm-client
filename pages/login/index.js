import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden, IconButton,
    InputAdornment,
    makeStyles,
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

const useStyles = makeStyles({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
});

const Login = () => {

    const classes = useStyles();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const { user } = useStore(UserStore);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (user && user.role === 2) {
            Router.replace('/admin/dashboard');
        }else if(user && user.role === 1){
            Router.replace('/accountDetails');
        }
    }, []);



    const handleLogin = () => {
        setLoading(true);
        console.log(1, username, password);
        if (inputCaptcha.trim() !== captchaCode) {
            enqueueSnackbar('Invalid captcha code.', { variant: 'error' });
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
                // if (user.role === 2) {
                //     Router.replace('/admin/dashboard');
                // }
                // else {
                //     Router.replace('/accountDetails');
                // }
            })
            .catch(error => {
                enqueueSnackbar(error && error.message ? error.message : 'Something went wrong!', { variant: 'warning' });
            }).finally(() => {
                setLoading(false);
            });
    };


    return (
        <Box className={classes.container}>
            <Appbar />
            <Container maxWidth={'xl'}>
                <Grid container justify={'center'} alignItems={'center'} style={{ minHeight: '100vh' }}>
                    <Grid item container xs={12} sm={6} justify={'center'} alignItems={'center'}>
                        <img width={'80%'} src={Vector} alt={'vector'} />
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
                            alignItems={'center'}
                            width={'90%'}
                            maxWidth={'450px'}
                            borderRadius={'borderRadius'}
                            bgcolor={'#124954'}
                            px={3}
                            py={2}
                            style={{boxShadow: '25px 25px 50px rgba(18, 73, 84, 0.4)'}}
                        >
                            <Hidden xsDown>
                                <Typography variant={'h2'} style={{color: '#FFFFFF'}} >
                                    {'LOGIN'}
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <img width={'40%'} src={Gwm} alt={'vector'} style={{ margin: '15px 0' }}/>
                            </Hidden>
                            <Box my={3} />
                            <WhiteTextField
                                label={'Username'}
                                name={'username'}
                                value={username}
                                onChange={event => setUserName(event.target.value)}
                            />
                            <Box my={3} />
                            <WhiteTextField
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
                                                {showPassword ? <VisibilityIcon style={{color: '#fff'}}/> : <VisibilityOffIcon style={{color: '#fff'}}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box my={2} />
                            <Box display={'flex'} alignItems={'center'}
                                width={'100%'} justifyContent={{xs: 'center', md:'space-between'}}>
                                <Hidden smDown>
                                    <Typography variant={'subtitle2'} style={{color: '#FFFFFF'}} >{'Captcha'}</Typography>
                                </Hidden>

                                <Box mr={2}>
                                    <ClientCaptcha
                                        width={200}
                                        height={40}
                                        retry={true}
                                        backgroundColor={'#FF9A3E'}
                                        fontColor={'#FFFFFF'}
                                        fontFamily={'Montserrat'}
                                        retryIconSize={20}
                                        retryIcon={Refresh}
                                        captchaCode={code => {
                                            // console.log(code);
                                            setCaptchaCode(code);
                                        }}>
                                    </ClientCaptcha>
                                </Box>
                            </Box>
                            <Box my={2} />
                            <WhiteTextField
                                label={'Type Captcha Code'}
                                value={inputCaptcha}
                                onChange={event => setInputCaptcha(event.target.value)}
                                name={'captcha'}
                            />
                            <Box my={2} />
                            <Button disabled={loading} onClick={() => handleLogin()} variant="contained" color={'secondary'} type={'submit'}>
                                {loading ? <CircularProgress
                                    size={24}
                                /> : 'Login'}
                            </Button>
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
