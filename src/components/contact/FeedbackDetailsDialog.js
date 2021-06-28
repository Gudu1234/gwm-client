/**
 * Created by Soumya (soumya@smarttersstudio.com) on 27/06/21 at 8:46 PM.
 */
import {
    Box,
    Dialog,
    DialogContent,
    Grid, IconButton,
    Typography
} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from '../../theme';
import {useSnackbar} from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../Confirm';
import {removeContact} from '../../apis/contact';
import Rating from '@material-ui/lab/Rating';

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

const FeedbackDetailsDialog = ({open, setOpen, feedbackData, setStatusUpdated}) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    let feedbackId, name, email, phone, pinCode, ratings, message, feedbackType;

    if (feedbackData) {
        feedbackId = feedbackData._id;
        name = feedbackData.name;
        email = feedbackData.email;
        phone = feedbackData.phone;
        pinCode = feedbackData.pinCode;
        message = feedbackData.message;
        ratings = feedbackData.ratings;
        feedbackType = feedbackData.feedbackType;
    }

    const handleClose = () => {
        setOpen(false);
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
                                    { feedbackType === 1 ? 'Feedback Details' : 'Suggestion Details' }
                                </Typography>
                                <Box flex={1} />
                                <IconButton>
                                    <DeleteIcon color={'secondary'} onClick={handleDeleteButtonClick}/>
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
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} alignItems={'center'}>
                            <Box>
                                {
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Phone :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {phone}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    feedbackData && feedbackData.pinCode &&
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Pin-Code :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {feedbackData && feedbackData.pinCode ? pinCode : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        {
                            feedbackType === 1 ? (
                                <Grid item md={12} sm={12} xs={12} alignItems={'center'}>
                                    <Box bgcolor={'#E5E5E5'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Ratings :</Typography>
                                        <Box mt={1}/>
                                        <Rating
                                            name="simple-controlled"
                                            value={ratings}
                                            readOnly
                                            size={'large'}
                                            color={'#FF9A3E'}
                                        />
                                    </Box>
                                </Grid>
                            ) : null
                        }
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
            </Dialog>
        </>
    );
};

FeedbackDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    feedbackData: PropTypes.object,
    setStatusUpdated: PropTypes.func
};

export default FeedbackDetailsDialog;