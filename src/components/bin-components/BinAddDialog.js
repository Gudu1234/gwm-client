/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/06/21 at 12:49 AM.
 */

import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/styles';
import theme from '../../theme';
import PropTypes from 'prop-types';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BusinessIcon from '@material-ui/icons/Business';
import AddAddressDialog from './AddAddressDialog';
import AddLocationDialog from './AddLocationDialog';
import AddWorkerDialog from './AddWorkerDialog';

const useStyles = makeStyles(() => ({
    button: {
        marginTop: theme.spacing(2),
    },
}));

const BinAddDialog = ({open, setOpen, updateBin, pinCode = '', address = '', street = ''}) => {

    const classes = useStyles();

    // console.log(pinCode, address, street);

    const handleClose = () => {
        setOpen(false);
        updateBin();
    };

    const title = [
        'Enter Address Details To Continue',
        'Enter Bin Location To Continue',
        'Assign The Worker'
    ];

    const steps = [
        'Give Address',
        'Bin Location',
        'Assign Worker'
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [binData, setBinData] = React.useState({});

    // console.log(activeStep);

    const ColorLibConnector = withStyles({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        completed: {
            '& $line': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        line: {
            height: 4,
            border: 0,
            margin: '0 15px',
            backgroundColor: theme.palette.background.stepper,
            // borderRadius: 1,
        },
    })(StepConnector);

    const useColorLibStepIconStyles = makeStyles({
        root: {
            backgroundColor: theme.palette.background.dialogInActiveStepper,
            zIndex: 1,
            color: theme.palette.common.white,
            width: 50,
            height: 50,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        active: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
            backgroundColor: theme.palette.primary.dark,
        },
    });

    function ColorLibStepIcon(props) {
        const classes = useColorLibStepIconStyles();
        const { active, completed } = props;

        const icons = {
            1: <BusinessIcon />,
            2: <AddLocationIcon />,
            3: <PersonAddIcon />,
            // 4: <VideoLabelIcon />,
        };

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {icons[String(props.icon)]}
            </div>
        );
    }

    return (
        <Dialog fullWidth maxWidth={'sm'} onClose={handleClose} open={open}>
            <DialogTitle onClose={handleClose}>
                <Typography>
                    {title[activeStep]}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<ColorLibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorLibStepIcon}>
                                    <Typography>{label}</Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === 0 ? (
                            <AddAddressDialog
                                setActiveStep={(value) => {
                                    console.log(value);
                                    setActiveStep(value);
                                }}
                                setBinData={setBinData}
                                pin={pinCode}
                            />
                        ) : (
                            ''
                        )}
                        {activeStep === 1 ? <AddLocationDialog
                            setActiveStep={setActiveStep}
                            binData={binData}
                            setBinData={setBinData}
                            addressData={address}
                            streetData={street}
                        /> : ''
                        }
                        {activeStep === 2 ? (
                            <AddWorkerDialog
                                setActiveStep={setActiveStep}
                                binData={binData}
                                setOpen={setOpen}
                                updateBin={updateBin}
                                setBinData={setBinData}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <Box mb={1} />
            </DialogContent>
        </Dialog>
    );
};

BinAddDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    updateBin: PropTypes.any,
    pinCode: PropTypes.any,
    address: PropTypes.any,
    street: PropTypes.any
};

export default BinAddDialog;