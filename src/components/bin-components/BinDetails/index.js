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
import EditBinAddressDialog from '../EditBinAddressDialog';

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

const BinDetails = ({binDetails, setBinDetails}) => {

    const classes = useStyles();

    const { user } = useStore(UserStore);

    const [open, setOpen] = useState(false);

    const [binData, setBinData] = useState(binDetails);

    const { role } = user;

    useEffect(() => {
        setBinDetails(binData);
    }, [binData]);

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
                        { 'Address Details' }
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
                        binData && binData.zone &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Zone :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.zone ? binData.zone.name : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        binData && binData.address &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Address :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.address ? binData.address : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        binData && binData.street &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Street :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.street ? binData.street: 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        binData && binData.landmark &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Landmark :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.landmark ? binData.landmark: 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        binData && binData.pinCode &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Pin-Code :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.pinCode ? binData.pinCode : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Map-Link :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.mapLink ? binData.mapLink : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        binData && binData.coordinates &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Latitude :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.coordinates ? binData.coordinates[1] : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        binData && binData.coordinates &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Longitude :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {binData && binData.coordinates ? binData.coordinates[0] : 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <EditBinAddressDialog setOpen={setOpen} open={open} binData={binData} setBinData={setBinData}/>
        </Grid>
    );
};

BinDetails.propTypes = {
    binDetails: PropTypes.any,
    setBinDetails: PropTypes.any
};

export default BinDetails;