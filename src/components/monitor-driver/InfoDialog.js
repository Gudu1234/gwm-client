/**
 * Created By Soumya(soumya@smarttersstudio.com) on 05/07/21 at 2:56 AM.
 */

import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/styles';
import theme from '../../theme';
import {Dialog, DialogContent, DialogTitle, Typography} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';

const InfoDialog = ({open, setOpen, user, address}) => {

    // const { coordinates, name, phone } = user;
    //
    // const latitude = coordinates[1];
    // const longitude = coordinates[0];

    const handleSetClose = () => {
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog fullWidth maxWidth={'xs'} open={open} onClose={handleSetClose}>
                <DialogTitle onClose={handleSetClose}>
                    <Typography style={{color: 'rgba(18, 73, 84, 0.75)'}}>
                        {'Driver Current Location'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: '#124954'}}>
                        {`Latitude: ${user?.coordinates[1]}`}
                    </DialogContentText>
                    <DialogContentText style={{color: '#124954'}}>
                        {`Longitude: ${user?.coordinates[0]}`}
                    </DialogContentText>
                    <DialogContentText style={{color: '#124954'}}>
                        {`Address: ${address}`}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )

};

InfoDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.any,
    user: PropTypes.any
};

export default InfoDialog;