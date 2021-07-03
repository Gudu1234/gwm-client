/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/06/21 at 1:29 AM.
 */

import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Typography
} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import {editBinDetails, getNearbyCleaners, getNearbyWorkers} from '../../apis/bin';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    nextButton: {
        marginTop: theme.spacing(2),
    },
    select2: {
        '& .MuiSelect-iconOutlined': {
            color: '#124954'
        }
    },
    menuPaper: {
        maxHeight: 150,
        maxWidth: 50,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    }
}));

const EditWorkerDialog = ({ 
    open,
    setOpen,
    binData,
    setBinData,
    setUserData,
}) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [workers, setWorkers] = useState(binData.worker ? [binData.worker] : []);
    const [worker, setWorker] = useState(binData.worker ? binData.worker._id : null);
    
    const [loading, setLoading] = useState(false);

    const handleAssign = () => {
        setLoading(true);
        let data = {
            worker
        };
        editBinDetails(binData._id, data)
            .then((res) => {
                setBinData(res);
                setUserData(res.worker);
                setOpen(false);
                enqueueSnackbar('Worker details edited successfully.', { variant: 'success' });
            }).catch((e) => {
                enqueueSnackbar(e.message ? e.message : 'Worker can not be edited', { variant: 'error' });
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const { zone, coordinates, type: binType, parent } = binData;
        setLoading(true);
        if (binType === 1) {
            getNearbyWorkers(coordinates, binType, zone._id)
                .then(res => {
                    setWorkers(res);
                    setLoading(false);
                });
        } else if (binType === 2) {
            getNearbyCleaners(coordinates, binType, zone._id, parent._id)
                .then(res => {
                    setWorkers(res);
                    setLoading(false);
                });
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <Dialog open={open} fullWidth maxWidth={'xs'} onClose={handleClose}>
                <DialogTitle
                    onClose={() => {
                        handleClose();
                    }}
                >
                    <Typography color={'primary'}>
                        {'Edit Worker'}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <GreenTextField
                        label={'Select Worker'}
                        name={'worker'}
                        select={true}
                        value={worker}
                        onChange={(e) => setWorker(e.target.value)}
                        SelectProps={{
                            MenuProps: {
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
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
                        children = {
                            loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress size={24} color={'primary'} />
                            </div> : workers.map((each, i) => (
                                <MenuItem
                                    value={each._id}
                                    style={i !== workers.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                >
                                    {
                                        `${each.name} (${!each.assigned ? 'unassigned' : `${each.distance}m away`})`
                                    }
                                </MenuItem>
                            ))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        size="medium"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        onClick={handleAssign}
                        style={{textTransform: 'none'}}
                    >
                        {
                            loading ? (
                                <CircularProgress size={24} color={'secondary'}/>
                            ) : (
                                'Assign'
                            )
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

EditWorkerDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    binData: PropTypes.any,
    setOpen: PropTypes.func.isRequired,
    setBinData: PropTypes.any,
    setUserData: PropTypes.any,
};

export default EditWorkerDialog;