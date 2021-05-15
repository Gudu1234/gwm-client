import {
    Box,
    Button,
    CircularProgress,
    Container, FormControl,
    Grid,
    Hidden, IconButton,
    InputAdornment,
    makeStyles, MenuItem, Select,
    TextField,
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
import Gwm from '../../public/Frame 6.svg';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles({
    container: {
        // backgroundImage: `url(${BackImg})`,
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    formControl: {
        borderRadius: '2px',
    },
    option: {
        color: '#124954'
    }
});

const Index = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackType, setFeedBackType] = React.useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const { user } = useStore(UserStore);

    // const [visible, setVisible] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFeedbackTypeChange = (event) => {
        setFeedBackType(event.target.value);
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
        authenticate(email, password)
            .then((response) => {
                const { accessToken, user } = response;
                console.log(accessToken, user);
                localStorage.setItem('feathers-jwt', accessToken);
                UserStore.set(() => ({ token: accessToken, user }), 'login');
                enqueueSnackbar('Login successfully', { variant: 'success' });
                if (user.role === 2) {
                    Router.replace('/admin/dashboard');
                }
                else {
                    Router.replace('/accountDetails');
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message && error.message ? error.message : 'Something went wrong!', { variant: 'warning' });
            }).finally(() => {
                setLoading(false);
            });
    };


    return (
        <Box className={classes.container}>
            <Appbar />
            <Container maxWidth={'xl'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                    px={{xs: 3, md: 15}}
                    py={3}
                >
                    <Grid container style={{ minHeight: '100vh' }}>
                        <Grid item container justify={'space-between'} xs={12} sm={6}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                width={'90%'}
                            >
                                <Typography variant={'h1'} color={'textPrimary'} >
                                    {'CONTACT US.'}
                                </Typography>
                                <Box my={2}/>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac.'}
                                </Typography>
                                <Box my={3} />
                                <Grid container justify={'space-between'}>
                                    <Grid item container xs={6} sm={6}>
                                        <Typography variant={'h2'} color={'textPrimary'} >
                                            {'CHOOSE:'}
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs={6} sm={6}>
                                        <FormControl variant={'outlined'} className={classes.formControl}>
                                            <Select
                                                labelId = "demo-simple-select-outlined-label"
                                                id = "demo-simple-select-outlined"
                                                autoFocus={true}
                                                value={feedbackType}
                                                onChange={handleFeedbackTypeChange}
                                                IconComponent={KeyboardArrowDownIcon}
                                                // label="Age"
                                                // inputProps={{
                                                //     name: 'contact',
                                                //     id: 'outlined-age-native-simple',
                                                // }}
                                                // className={classes.formControl}
                                                color={'primary'}
                                            >
                                                {/*<option aria-label="None" value="" />*/}
                                                <MenuItem value = {1} style={{borderBottom: '1px solid #7AE3B1'}}>Feedback</MenuItem>
                                                <MenuItem value = {2} style={{borderBottom: '1px solid #7AE3B1'}}>Suggestion</MenuItem>
                                                <MenuItem value = {3} >Complaint</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container justify={'center'} alignItems={'center'} style={{ minHeight: '100vh' }}>
                    {/*<Hidden smDown>*/}
                    {/*    <Grid item container xs={12} sm={6} justify={'center'} alignItems={'center'}>*/}
                    {/*        <img width={'80%'} src={Vector} alt={'vector'} />*/}
                    {/*    </Grid>*/}
                    {/*</Hidden>*/}
                    {/*<Box my={2} />*/}
                    <Grid item container xs={12} sm={6} justify={'center'} alignItems={'center'}>
                        <img width={'80%'} src={Vector} alt={'vector'} />
                    </Grid>
                    {/*<Box my={2} />*/}
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
                            // boxShadow={20}
                            // p={{ xs: 1, sm: 2 }}
                            px={3}
                            py={2}
                            // p={3}
                            style={{boxShadow: '25px 25px 50px rgba(18, 73, 84, 0.4)'}}
                        >
                            <Hidden xsDown>
                                <Typography variant={'h2'} color={'textSecondary'} >
                                    {'LOGIN'}
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <img width={'40%'} src={Gwm} alt={'vector'} style={{ margin: '15px 0' }}/>
                            </Hidden>
                            <Box my={3} />
                            <TextField
                                label={'Username'}
                                name={'username'}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                                color={'secondary'}
                                focused
                            />
                            <Box my={3} />
                            <TextField
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityIcon color={'secondary'}/> : <VisibilityOffIcon color={'secondary'}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                label={'Password'}
                                name={'password'}
                                onChange={event => setPassword(event.target.value)}
                                required
                                focused
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                color={'secondary'}
                                // onKeyDown={handleEnter}
                            />
                            <Box my={2} />
                            <Box display={'flex'} alignItems={'center'}
                                width={'100%'} justifyContent={{xs: 'center', md:'space-between'}}>
                                <Hidden smDown>
                                    <Typography variant={'subtitle2'} color={'secondary'}>{'Captcha'}</Typography>
                                </Hidden>

                                <Box mr={2}>
                                    <ClientCaptcha
                                        width={200}
                                        height={40}
                                        backgroundColor={'#FF9A3E'}
                                        fontColor={'#FFFFFF'}
                                        fontFamily={'Montserrat'}
                                        retryIconSize={20}
                                        retryIcon={Refresh}
                                        captchaCode={code => {
                                            console.log(code);
                                            setCaptchaCode(code);
                                        }}>
                                    </ClientCaptcha>
                                </Box>
                            </Box>
                            <Box my={2} />
                            <TextField
                                label={'Type Captcha Code'}
                                value={inputCaptcha}
                                onChange={event => setInputCaptcha(event.target.value)}
                                variant="outlined"
                                fullWidth
                                focused
                                color={'secondary'}
                                required
                            />
                            <Box my={2} />
                            <Button disabled={loading} onClick={() => handleLogin()} variant="contained" color={'secondary'}>
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

export default Index;
