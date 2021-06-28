/**
 * Created by Soumya (soumya@smarttersstudio.com) on 27/06/21 at 8:46 PM.
 */
import {
    Box, Button, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    Grid, IconButton,
    Typography
} from '@material-ui/core';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from '../../theme';
import {useSnackbar} from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../Confirm';
import {removeContact, updateContactStatus} from '../../apis/contact';

const useStyles = makeStyles((theme) => ({
    dialog: {
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        borderRadius: '5px',
        '& .MuiDialogContent-root': {
            padding: '0px',
        }
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#124954'
        }
    },
    nameTypo: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        overflowWrap: 'break-word',
        color: '#124954'
    },
    userNameTypo: {
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)'
    },
}));

const ComplaintDetailsDialog = ({open, setOpen, feedbackData, setStatusUpdated}) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const [complaintStatus, setComplaintStatus] = useState(feedbackData.status);

    let feedbackId, name, email, phone, pinCode, message, mapLink, binCode;

    if (feedbackData) {
        feedbackId = feedbackData._id;
        name = feedbackData.name;
        email = feedbackData.email;
        phone = feedbackData.phone;
        pinCode = feedbackData.pinCode;
        message = feedbackData.message;
        mapLink = feedbackData.mapLink;
        binCode = feedbackData.binCode;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const changeStatus = (status) => {
        setLoading(true);
        setStatusUpdated(false);
        updateContactStatus(
            feedbackId,
            status
        ).then(() => {
            setLoading(false);
            setComplaintStatus(status);
            setStatusUpdated(true);
        }).catch(() => {
            enqueueSnackbar('Something went wrong!', { variant: 'warning' });
            setLoading(false);
        });
    };

    const handleButtonClick = () => {
        if (complaintStatus === 1) {
            changeStatus(3);
        } else if (complaintStatus === 2) {
            changeStatus(3);
        } else if (complaintStatus === 3) {
            changeStatus(2);
        }
    };

    const handleDeleteButtonClick = () => {
        Confirm('Are you Sure ?', 'Do you really want to Delete ?', 'Ok').then(() => {
            removeContact(feedbackId)
                .then(() => {
                    enqueueSnackbar('Feedback removed.', { variant: 'success' });
                    setStatusUpdated(true);
                    setOpen(false);
                })
                .catch((e) => {
                    enqueueSnackbar(e.message, { variant: 'warning' });
                });
        });
    };

    return (
        <>
            <Dialog open={open} fullWidth maxWidth={'sm'} onClose={handleClose}>
                <DialogContent className={classes.dialog} dividers>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12} alignItems={'center'}>
                            <Box display={'flex'} mb={1} width={'100%'}
                                bgcolor={theme.palette.primary.main} pl={1.5} pt={1} pb={1}
                                borderRadius={5}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Typography style={{color: '#fff'}}>
                                    { 'Complaint Details' }
                                </Typography>
                                <Box flex={1} />
                                <IconButton>
                                    <DeleteIcon color={'secondary'} onClick={handleDeleteButtonClick} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} alignItems={'center'}>
                            <Box>
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Name :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {name}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Email :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {email}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Phone :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {phone}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} alignItems={'center'}>
                            <Box>
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Pin-Code :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {feedbackData && feedbackData.pinCode ? pinCode : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Map-Link :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {feedbackData && feedbackData.mapLink ? mapLink : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Bin-Code :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {feedbackData && feedbackData.binCode ? binCode : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} alignItems={'center'}>
                            <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                <Typography className={classes.userNameTypo}>Message :</Typography>
                                <Box mt={1}/>
                                <Typography className={classes.nameTypo}>
                                    {feedbackData && feedbackData.message ? message : 'N/A'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid item md={12} sm={12} xs={12} alignItems={'center'}>
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            pb={0.5}
                            ml={2}
                            mr={2}
                        >
                            <Button
                                color="secondary"
                                size="medium"
                                fullWidth
                                onClick={() => setOpen(false)}
                                style={{textTransform: 'none'}}
                            >
                                {
                                    'Cancel'
                                }
                            </Button>
                            <Box ml={2}/>
                            <Button
                                color="secondary"
                                size="medium"
                                variant="contained"
                                disabled={loading}
                                fullWidth
                                onClick={handleButtonClick}
                                style={{textTransform: 'none'}}
                            >
                                {
                                    loading ? (
                                        <CircularProgress size={24} color={'secondary'}/>
                                    ) : (
                                        complaintStatus === 1 ? 'Inspect' : (complaintStatus === 3 ? 'Resolve' : 'Re-Inspect')
                                    )
                                }
                            </Button>
                        </Box>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
};

ComplaintDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    feedbackData: PropTypes.object,
    setStatusUpdated: PropTypes.func
};

export default ComplaintDetailsDialog;