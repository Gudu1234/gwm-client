import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
}));

const BinDetails = ({binData}) => {

    const classes = useStyles();

    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main} pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}>
                    <Typography style={{color: '#fff'}}>
                        { 'Address Details' }
                    </Typography>
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
        </Grid>
    );
};

BinDetails.propTypes = {
    binData: PropTypes.any
};

export default BinDetails;