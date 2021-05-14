import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden, IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import { authenticate } from '../../src/apis/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Arrow from '../../public/Arrow.svg';
import Request from '../../public/Request.svg';
import Collection from '../../public/Collection.svg';
import Disposal from '../../public/Disposal.svg';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';

const useStyles = makeStyles({
    container: {
        // backgroundImage: `url(${BackImg})`,
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    fieldText: {
        color: '#000000',
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
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const { user } = useStore(UserStore);

    // const [visible, setVisible] = useState(true);

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
                {/*<Box my={3}/>*/}
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                    px={{xs: 5, md: 15}}
                    py={3}
                >
                    <Hidden xsDown>
                        <Typography variant={'h2'} color={'textPrimary'} >
                            {'REQUEST BIN'}
                        </Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography variant={'h1'} color={'textPrimary'} >
                            {'REQUEST BIN'}
                        </Typography>
                    </Hidden>
                    <Box my={2}/>
                    <Typography variant={'caption'} color={'textSecondary'}>
                        {
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac. Cras tincidunt metus quis metus volutpat, a ultricies odio dapibus. Integer sollicitudin, eros lacinia blandit dictum, lorem massa scelerisque mauris, sed tincidunt risus ligula id nisi. Ut pharetra est augue, congue dictum nisi dapibus vel. Sed tincidunt lectus nec ex cursus aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac. Cras tincidunt metus quis metus volutpat, a ultricies odio dapibus. Integer sollicitudin, eros lacinia blandit dictum, lorem massa scelerisque mauris, sed tincidunt risus ligula id nisi. Ut pharetra est augue, congue dictum nisi dapibus vel. Sed tincidunt lectus nec ex cursus aliquet. '
                        }
                    </Typography>
                    <Box my={2}/>
                    <Grid container style={{ minHeight: '100vh' }}>
                        <Grid item container justify={'space-between'} xs={12} sm={6}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                            >
                                <Typography variant={'h3'} color={'textPrimary'} >
                                    {'REQUEST FORM:'}
                                </Typography>
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <TextField
                                    label={'Name:'}
                                    name={'name'}
                                    // value={email}
                                    // onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    multiline={true}
                                    rows={6}
                                    focused
                                    InputProps={{
                                        className: classes.fieldText
                                    }}
                                />
                                <Box my={2}/>
                                <Button disabled={loading} onClick={() => handleLogin()} variant="contained" color={'secondary'}>
                                    {loading ? <CircularProgress
                                        size={24}
                                    /> : 'Submit'}
                                </Button>
                            </Box>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item container xs={12} sm={6} justify={'center'} alignItems={'center'}>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <img width={'60%'} src={Request} alt={'vector'} />
                                    <Box my={3}/>
                                    <img width={'10%'} src={Arrow} alt={'vector'}/>
                                    <Box my={3}/>
                                    <img width={'60%'} src={Collection} alt={'vector'} />
                                    <Box my={3}/>
                                    <img width={'10%'} src={Arrow} alt={'vector'}/>
                                    <Box my={3}/>
                                    <img width={'50%'} src={Disposal} alt={'vector'} />
                                </Box>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Box>
            </Container>
            <Box my={5}/>
            <Footer />
        </Box >
    );
};

export default Index;
