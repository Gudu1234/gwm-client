import {
    Box,
    Button,
    CircularProgress,
    Container, FormControl,
    Grid,
    makeStyles, MenuItem, Select,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStore } from 'laco-react';
import UserStore from '../../src/store/userStore';
import { authenticate } from '../../src/apis/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Rating from '@material-ui/lab/Rating';
import WhiteTextField from '../../src/components/WhiteTextField';

const useStyles = makeStyles({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#FFFFFF'
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

const Contact = () => {

    const classes = useStyles();

    const [feedbackType, setFeedBackType] = React.useState(1);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');
    const [zones, setZones] = React.useState([{_id: 1, name: 'Zone 1'}, {_id: 2, name: 'Zone 2'}, {_id: 3, name: 'Zone 3'}]);
    const [zoneValue, setZoneValue] = React.useState(0);
    const [rating, setRating] = React.useState(1);

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const handleFeedbackTypeChange = (event) => {
        setFeedBackType(event.target.value);
    };

    const handleZoneChange = (event) => {
        setZoneValue(event.target.value);
    };


    useEffect(() => {
        // if (user && user.role === 2) {
        //     Router.replace('/admin/dashboard');
        // }else if(user && user.role === 1){
        //     Router.replace('/accountDetails');
        // }
    }, []);


    const handleSubmit = () => {
        setLoading(true);
        if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
            enqueueSnackbar('Please provide a valid phone number!', { variant: 'warning' });
            setLoading(false);
            return ;
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
                                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac.' +
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac.'}
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
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                getContentAnchorEl: null
                                            }}
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
                                <WhiteTextField
                                    label={'Name'}
                                    name={'name'}
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <Box my={2} />
                                <WhiteTextField
                                    label={'Phone Number'}
                                    name={'phone'}
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                />
                                <Box my={2} />
                                <WhiteTextField
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
                                {
                                    feedbackType === 3 ? (
                                        <React.Fragment>
                                            <WhiteTextField
                                                label={'Map Link'}
                                                name={'link'}
                                                value={link}
                                                onChange={event => setLink(event.target.value)}
                                            />
                                            <Box my={2}/>
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
                                                value={rating}
                                                onChange={(event, newValue) => {
                                                    setRating(newValue);
                                                }}
                                                size={'large'}
                                                color={'#FF9A3E'}
                                            />
                                            <Box my={2}/>
                                        </React.Fragment>
                                    ) : null
                                }
                                <WhiteTextField
                                    label={'Message'}
                                    name={'message'}
                                    value={message}
                                    onChange={event => setMessage(event.target.value)}
                                    multiline={true}
                                    rows={6}
                                    rowsMax={8}
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

export default Contact;
