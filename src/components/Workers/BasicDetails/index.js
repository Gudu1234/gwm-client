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

const BasicDetails = ({userData}) => {

    const classes = useStyles();

    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main} pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}>
                    <Typography style={{color: '#fff'}}>
                        { 'Basic Details' }
                    </Typography>
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
            <Grid item md={6} sm={12} xs={12}>
                <Box>
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
        </Grid>
    );
};

BasicDetails.propTypes = {
    userData: PropTypes.any
};

export default BasicDetails;