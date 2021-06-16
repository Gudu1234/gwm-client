/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/06/21 at 1:29 AM.
 */

import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import {useBinAddData} from '../../store/BinAddContext';
import {getAllZones} from '../../apis/all_zone';
import {useStore} from 'laco-react';
import UserStore from '../../store/userStore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Box, Button, CircularProgress, MenuItem, Select} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import {createBin, getNearbyCleaners, getNearbyWorkers, getParentBins} from '../../apis/bin';

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

const AddWorkerDialog = ({ setActiveStep, setOpen, binData, updateBin, setBinData }) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [binTypes] = useState([{value: 1, name: 'Parent'}, {value: 2, name: 'Child'}]);
    const [binType, setBinType] = useState(1);

    const [parentBins, setParentBins] = useState([]);
    const [parentBin, setParentBin] = useState('');
    const [parentBinSelected, setParentBinSelected] = useState(false);

    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState('');

    const [parentLoading, setParentLoading] = useState(false);
    const [workerLoading, setWorkerLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useStore(UserStore);

    const handleBinTypeChange = (e) => {
        let value = e.target.value;
        console.log(value);
        setBinType(value);
        setParentBinSelected(false);
    };

    const handleParentBinChange = (e) => {
        setParentBin(e.target.value);
        setParentBinSelected(true);
    };

    const validate = () => {
        if (binType === 2 && parentBin.trim() === '') {
            enqueueSnackbar('Please select a parent bin.', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validate()) {
            setLoading(true);
            createBin({
                ...binData,
                type: binType,
                parent: parentBin.trim() === '' ? null : parentBin,
                worker: worker.trim() === '' ? null : worker,
            }).then(res => {
                enqueueSnackbar('Bin created Successfully.', { variant: 'success' });
                updateBin(res, true);
                setActiveStep(0);
                setOpen(false);
                setBinData({});
            }).catch((e) => {
                enqueueSnackbar(e.message(), { variant: 'warning' });
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        console.log(binData);
        const { zone, coordinates, landmark } = binData;
        if (binType === 1) {
            setWorkerLoading(true);
            getNearbyWorkers(coordinates, binType, zone)
                .then(res => {
                    setWorkers(res);
                    setWorkerLoading(false);
                });
        }
        if (binType === 2 && !parentBinSelected) {
            setParentLoading(true);
            setWorkerLoading(false);
            setWorkers([]);
            if (parentBin.trim() !== '') setParentBinSelected(true);
            getParentBins(zone, landmark)
                .then((res) => {
                    console.log(res);
                    setParentBins(res);
                    setParentLoading(false);
                });
        }
        if (parentBinSelected) {
            setWorkerLoading(true);
            getNearbyCleaners(coordinates, binType, zone, parentBin)
                .then(res => {
                    setWorkers(res);
                    setWorkerLoading(false);
                });
        }
    }, [binType, parentBinSelected]);

    return (
        <div>
            <GreenTextField
                label={'Bin Type'}
                name={'binType'}
                select={true}
                value={binType}
                onChange={handleBinTypeChange}
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
                    binTypes.map((each, i) => (
                        <MenuItem
                            value={each.value}
                            style={i !== binTypes.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                        >
                            {each.name}
                        </MenuItem>
                    ))
                }
            />
            <Box pb={2} />
            {
                binType === 2 ? (
                    <>
                        <GreenTextField
                            label={'Parent Bin'}
                            name={'parentBin'}
                            select={true}
                            value={parentBin}
                            size={'medium'}
                            onChange={handleParentBinChange}
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
                                parentLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={24} color={'primary'} />
                                </div> : parentBins.map((each, i) => (
                                    <MenuItem
                                        value={each._id}
                                        style={i !== parentBins.length - 1 ? {borderBottom: '1px solid #7AE3B1'} : null}
                                    >
                                        {each.binId}
                                    </MenuItem>
                                ))
                            }
                        />
                        <Box my={2} />
                    </>
                ) : ''
            }
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
                    workerLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            <Box my={2} />
            <Button
                color="secondary"
                size="medium"
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleNext}
                style={{textTransform: 'none'}}
            >
                {
                    loading ? (
                        <CircularProgress size={24} color={'secondary'}/>
                    ) : (
                        'Confirm'
                    )
                }
            </Button>
        </div>
    );
};

export default AddWorkerDialog;