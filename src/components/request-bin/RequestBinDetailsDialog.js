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
import {removeRequest, updateRequestStatus} from '../../apis/request';
import {useSnackbar} from 'notistack';
import BinAddDialog from '../bin-components/BinAddDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '../../Link';
import Confirm from '../Confirm';

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

const RequestBinDetailsDialog = ({open, setOpen, reqData, setStatusUpdated}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [reqStatus, setReqStatus] = useState(reqData? reqData.requestStatus : 0);
    const [openDialog, setOpenDialog] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    let reqId, name, email, phone, pinCode, address, street, landmark, mapLink, message, status = 0;

    if (reqData) {
        reqId = reqData.reqId;
        name = reqData.name;
        email = reqData.email;
        phone = reqData.phone;
        pinCode = reqData.pinCode;
        address = reqData.address;
        street = reqData.street;
        landmark = reqData.landmark;
        mapLink = reqData.mapLink;
        message = reqData.message;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        if (reqStatus === 1) {
            setLoading(true);
            updateRequestStatus(
                reqData._id,
                2
            ).then(() => {
                setLoading(false);
                setReqStatus(2);
                setStatusUpdated(true);
            }).catch(() => {
                enqueueSnackbar('Something went wrong!', { variant: 'warning' });
                setLoading(false);
            });
        } else if (reqStatus === 2) {
            setLoading(true);
            setOpenDialog(true);
        }
    };

    const updateBin = (data) => {
        setLoading(false);
        if (data) {
            if (data.status === 1) {
                setLoading(true);
                updateRequestStatus(
                    reqData._id,
                    3
                ).then(() => {
                    setLoading(false);
                    setStatusUpdated(true);
                    setOpen(false);
                }).catch(() => {
                    enqueueSnackbar('Something went wrong!', { variant: 'warning' });
                    setLoading(false);
                });
            }
        }
    };

    const handleDeleteButtonClick = () => {
        Confirm('Are you Sure ?', 'Do you really want to Delete ?', 'Ok').then(() => {
            removeRequest(reqData._id)
                .then(() => {
                    enqueueSnackbar('Request removed.', { variant: 'success' });
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
                                    { `Request ID:  ${reqId}` }
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
                                    reqData && reqData.name &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Name :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.name ? name : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.email &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Email :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.email ? email : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.phone &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Phone :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.phone ? phone : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.pinCode &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Pin-Code :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.pinCode ? pinCode : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} alignItems={'center'}>
                            <Box>
                                {
                                    reqData && reqData.address &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Address :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.address ? address : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.street &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Street :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.street ? street : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.landmark &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Landmark :</Typography>
                                        <Box mt={1}/>
                                        <Typography className={classes.nameTypo}>
                                            {reqData && reqData.landmark ? landmark : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                                {
                                    reqData && reqData.mapLink !== undefined &&
                                    <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                        <Typography className={classes.userNameTypo}>Map-Link :</Typography>
                                        <Box mt={1}/>
                                        <Typography
                                            className={classes.nameTypo}
                                        >
                                            {reqData && reqData.mapLink ? mapLink : 'N/A'}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} alignItems={'center'}>
                            <Box bgcolor={'#E8F5F8'} p={1} pl={1.5} borderRadius={3} mb={2}>
                                <Typography className={classes.userNameTypo}>Message :</Typography>
                                <Box mt={1}/>
                                <Typography className={classes.nameTypo}>
                                    {reqData && reqData.message ? message : 'N/A'}
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
                                        reqStatus === 1 ? 'Inspect' : 'Allocate Bin'
                                    )
                                }
                            </Button>
                        </Box>
                    </Grid>
                </DialogActions>
            </Dialog>
            {
                openDialog ? (
                    <BinAddDialog
                        open={openDialog}
                        setOpen={setOpenDialog}
                        pinCode={pinCode}
                        address={address}
                        street={street}
                        updateBin={updateBin}
                    />
                ) : null
            }
        </>
    );
};

RequestBinDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    reqData: PropTypes.object,
    setStatusUpdated: PropTypes.func
};

export default RequestBinDetailsDialog;