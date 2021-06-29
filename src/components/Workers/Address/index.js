import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
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

const Address = ({userData}) => {

    const classes = useStyles();

    const { zone: { name: zoneName },
        address: { addressLine, street, landmark, pinCode } } = userData;

    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main}pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}>
                    <Typography style={{color: '#fff'}}>
                        { 'Address Details' }
                    </Typography>
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        zoneName &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Zone :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {zoneName ? zoneName : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        addressLine &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Address :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {addressLine ? addressLine : 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        street &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Street :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {street ? street : 'N/A'}
                            </Typography>
                        </Box>
                    }
                    {
                        landmark &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Landmark :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {landmark ? landmark : 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box>
                    {
                        pinCode &&
                        <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                            <Typography className={classes.userNameTypo}>Pin-Code :</Typography>
                            <Box mt={1}/>
                            <Typography className={classes.nameTypo}>
                                {pinCode ? pinCode : 'N/A'}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Grid>
        </Grid>
    );
};

Address.propTypes = {
    userData: PropTypes.any
};

export default Address;