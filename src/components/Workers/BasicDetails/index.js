import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import EditIcon from '../../../../public/EditIcon.svg';
import {useStore} from 'laco-react';
import UserStore from '../../../store/userStore';
import EditBasicDetailsDialog from '../EditBasicDetailsDialog';

const useStyles = makeStyles(() => ({
    caption: {
        fontWeight: 'bold',
        color: 'grey'
    },
    heading:{
        color: '#ffffff'
    },
    nameTypo: {
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        overflowWrap: 'break-word',
        color: '#124954'
    },
    userNameTypo: {
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)'
    },
    editButton: {
        minWidth: 0,
        borderRadius: '10px',
        height: '35px',
        width: '35px',
    },
}));

const BasicDetails = ({userDetails, setUserDetails}) => {

    const classes = useStyles();

    const [userData, setUserData] = useState(userDetails);
    const [open, setOpen] = useState(false);

    const { user } = useStore(UserStore);

    const { role } = user;

    useEffect(() => {
        setUserDetails(userData);
    }, [userData]);

    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'row'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main} pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography style={{color: '#fff'}}>
                        { 'Basic Details' }
                    </Typography>
                    <Box flex={1} />
                    {
                        role === 3 || role === 4 ? (
                            <Button
                                className={classes.editButton}
                                color={'secondary'}
                                onClick={() => {
                                    setOpen(true);
                                }}
                                style={{ background: '#FF9A3E', paddingRight: '14px', marginRight: '10px' }}
                                variant={'contained'}
                            >
                                <img alt={'Edit Icon'} src={EditIcon} />
                            </Button>
                        ) : null
                    }
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        userData && userData.name &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Name :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {userData && userData.name ? userData.name : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        userData && userData.username &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Username :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {userData && userData.username ? userData.username : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        userData && userData.gender &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Gender :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {userData &&  userData.gender === 1 ? 'Male'
                                    : userData && userData.gender === 2 ? 'Female' : 'N/A'
                                }
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        userData &&userData.email &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Email :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {userData && userData.email ? userData.email : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        userData &&userData.phone &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Phone :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {userData && userData.phone ? userData.phone : 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <EditBasicDetailsDialog setOpen={setOpen} open={open} workerData={userData} setWorkerData={setUserData}/>
        </Grid>
    );
};

BasicDetails.propTypes = {
    userDetails: PropTypes.any,
    setUserDetails: PropTypes.any,
};

export default BasicDetails;