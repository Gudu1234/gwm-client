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
import Rating from '@material-ui/lab/Rating';

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
    },
    root: {
        color: '#FFFFFF',
    },
    select: {
        iconOutlined: {
            color: '#FFFFFF'
        },
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
    const [value, setValue] = React.useState(1);
    const [zoneValue, setZoneValue] = React.useState(0);
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

    const handleZoneChange = (event) => {
        setZoneValue(event.target.value);
    };

    const handleSetValue = (event) => {
        setValue(event.target.value);
    }

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
                    px={{xs: 2, md: 12}}
                    py={{xs: 3, md: 4}}
                >
                    <Grid container style={{ minHeight: '100vh' }}>
                        <Grid item container xs={12} sm={6}>
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
                                <Box
                                    display={'flex'}
                                    py={3}
                                    justifyContent={'flexStart'}
                                    alignItems={'center'}
                                >
                                    <Typography variant={'h2'} color={'textPrimary'} >
                                        {'CHOOSE:'}
                                    </Typography>
                                    <Box mx={{xs: 1, sm: 3}}/>
                                    <FormControl variant={'outlined'} >
                                        <Select
                                            labelId = "demo-simple-select-outlined-label"
                                            id = "demo-simple-select-outlined"
                                            autoFocus={true}
                                            value={feedbackType}
                                            onChange={handleFeedbackTypeChange}
                                            IconComponent={KeyboardArrowDownIcon}
                                            color={'primary'}
                                        >
                                            <MenuItem value = {1} style={{borderBottom: '1px solid #7AE3B1'}}>Feedback</MenuItem>
                                            <MenuItem value = {2} style={{borderBottom: '1px solid #7AE3B1'}}>Suggestion</MenuItem>
                                            <MenuItem value = {3} >Complaint</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12} sm={6}
                            justify={'center'}
                            alignItems={'center'}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'flexStart'}
                                alignItems={'center'}
                                width={'100%'}
                                maxWidth={'450px'}
                                borderRadius={'borderRadius'}
                                bgcolor={'#124954'}
                                px={{xs: 2, md: 4}}
                                py={2}
                                style={{boxShadow: '25px 25px 50px rgba(18, 73, 84, 0.4)'}}
                            >
                                <Box my={2} />
                                <TextField
                                    label={'Name'}
                                    name={'name'}
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    color={'secondary'}
                                    focused
                                    InputProps={{
                                        classes: {
                                            root: classes.root
                                        }
                                    }}
                                />
                                <Box my={2} />
                                <TextField
                                    label={'Phone Number'}
                                    name={'phone'}
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    color={'secondary'}
                                    focused
                                    InputProps={{
                                        classes: {
                                            root: classes.root
                                        }
                                    }}
                                />
                                <Box my={2} />
                                <TextField
                                    select
                                    label="Zone"
                                    // value={currency}
                                    // onChange={handleChange}
                                    variant="outlined"
                                    focused
                                    required
                                    name={'zone'}
                                    color={'secondary'}
                                    value={zoneValue}
                                    onChange={handleZoneChange}
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            root: classes.root
                                        }
                                    }}

                                >
                                    {/*{currencies.map((option) => (*/}
                                    {/*    <MenuItem key={option.value} value={option.value}>*/}
                                    {/*        {option.label}*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}
                                    <MenuItem value = {1} style={{borderBottom: '1px solid #7AE3B1'}}>Zone 1</MenuItem>
                                    <MenuItem value = {2} style={{borderBottom: '1px solid #7AE3B1'}}>Zone 2</MenuItem>
                                    <MenuItem value = {3} >Zone 3</MenuItem>
                                </TextField>
                                <Box my={2}/>
                                {
                                    feedbackType !== 1 && feedbackType !== 2 ? (
                                        <React.Fragment>
                                            <TextField
                                                label={'Map Link'}
                                                value={inputCaptcha}
                                                onChange={event => setInputCaptcha(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                                focused
                                                color={'secondary'}
                                                required
                                                InputProps={{
                                                    classes: {
                                                        root: classes.root
                                                    }
                                                }}
                                            />
                                            <Box my={2} />
                                        </React.Fragment>
                                    ) : null
                                }
                                {
                                    feedbackType === 1 ? (
                                        <React.Fragment>
                                            <Typography variant={'subtitle2'} style={{color: '#FFFFFF'}} >
                                                {'Rate us:'}
                                            </Typography>
                                            <Box my={1}/>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                size={'large'}
                                                color={'#FF9A3E'}
                                            />
                                            <Box my={2}/>
                                        </React.Fragment>
                                    ) : null
                                }
                                <TextField
                                    label={'Message'}
                                    name={'message'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    multiline={true}
                                    rows={6}
                                    focused
                                    color={'secondary'}
                                    InputProps={{
                                        className: classes.root
                                    }}
                                />
                                <Box my={2} />
                                <Button disabled={loading} onClick={() => handleLogin()} variant="contained" color={'secondary'}>
                                    {loading ? <CircularProgress
                                        size={24}
                                    /> : 'Submit'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box my={3}/>
                    <Grid container>
                        <Grid item container justify={'flex-start'}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'flexStart'}
                            >
                                <Typography variant={'h1'} color={'textPrimary'} >
                                    {'GET IN TOUCH.'}
                                </Typography>
                                <Box my={1}/>
                                <Typography variant={'subtitle1'} color={'textPrimary'}>
                                    {'gwm@mc.gov.in'}
                                </Typography>
                                <Box my={1}/>
                                <Typography variant={'subtitle1'} color={'textPrimary'}>
                                    {'+91 9438000000'}
                                </Typography>
                                <Box my={1}/>
                                <Typography variant={'subtitle1'} color={'textPrimary'}>
                                    {'547, Saheed Nagar'}
                                </Typography>
                                <Typography variant={'subtitle1'} color={'textPrimary'}>
                                    {'Bhubaneswar- 751007'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box my={5}/>
            <Footer />
        </Box >
    );
};

export default Index;
