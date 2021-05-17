import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden,
    makeStyles, MenuItem,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Arrow from '../../public/Arrow.svg';
import RequestIcon from '../../public/Request.svg';
import Collection from '../../public/Collection.svg';
import Disposal from '../../public/Disposal.svg';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import GreenTextField from '../../src/components/GreenTextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#124954'
        }
    },
    menuPaper: {
        maxHeight: 100,
        maxWidth: 100,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    }
});

const Request = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [link, setLink] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');
    const [zones, setZones] = React.useState([{_id: 1, name: 'Zone 1'}, {_id: 2, name: 'Zone 2'}, {_id: 3, name: 'Zone 3'}, {_id: 3, name: 'Zone 3'}, {_id: 3, name: 'Zone 3'}]);
    const [zoneValue, setZoneValue] = React.useState(0);

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const { user } = useStore(UserStore);

    const handleZoneChange = (event) => {
        setZoneValue(event.target.value);
    };


    useEffect(() => {
        if (user && user.role === 2) {
            Router.replace('/admin/dashboard');
        }else if(user && user.role === 1){
            Router.replace('/accountDetails');
        }
    }, []);


    const handleSubmit = () => {
        setLoading(true);
        if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
            enqueueSnackbar('Please provide a valid phone number!', { variant: 'warning' });
            setLoading(false);
            return ;
        }
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            enqueueSnackbar('Please provide a valid email!', { variant: 'warning' });
            setLoading(false);
        }
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
                    py={3}
                >
                    <Hidden xsDown>
                        <Typography variant={'h1'} color={'textPrimary'} >
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
                                width={'90%'}
                            >
                                <Typography variant={'h3'} color={'textPrimary'} >
                                    {'REQUEST FORM:'}
                                </Typography>
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Name:'}
                                    name={'name'}
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Phone Number:'}
                                    name={'phone'}
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Email:'}
                                    name={'email'}
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Municipal Corporation:'}
                                    name={'mc'}
                                    value={'Bhubaneswar Municipal Corporation'}
                                    onChange={() => {return null;}}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Map Link:'}
                                    name={'map'}
                                    value={link}
                                    onChange={event => setLink(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Address:'}
                                    name={'address'}
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Street:'}
                                    name={'street'}
                                    value={street}
                                    onChange={event => setStreet(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Landmark:'}
                                    name={'landmark'}
                                    value={landmark}
                                    onChange={event => setLandmark(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Pin-Code:'}
                                    name={'pin'}
                                    value={pin}
                                    onChange={event => setPin(event.target.value)}
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Zone'}
                                    name={'zone'}
                                    select={true}
                                    value={zoneValue}
                                    onChange={handleZoneChange}
                                    SelectProps={{
                                        MenuProps: {
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            transformOrigin: {
                                                vertical: "top",
                                                horizontal: "left"
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
                                        zones.map((each, i) => (
                                            <MenuItem
                                                value={each._id}
                                                style={i !== zones.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                            >
                                                {each.name}
                                            </MenuItem>
                                        ))
                                    }
                                />
                                <Box my={2}/>
                                <GreenTextField
                                    label={'Message:'}
                                    name={'message'}
                                    value={message}
                                    onChange={event => setMessage(event.target.value)}
                                    multiline={true}
                                    rows={6}
                                    rowsMax={8}
                                />
                                <Box my={2}/>
                                <Grid container>
                                    <Grid item container justify={'center'} alignItems={'center'}>
                                        <Button disabled={loading} onClick={() => handleSubmit()} variant="contained" color={'secondary'} size={'large'}>
                                            {loading ? <CircularProgress
                                                size={24}
                                            /> : 'Submit'}
                                        </Button>
                                    </Grid>
                                </Grid>
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
                                    <img width={'60%'} src={RequestIcon} alt={'vector'} />
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

export default Request;
