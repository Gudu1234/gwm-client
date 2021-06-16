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
import {Box, Button, CircularProgress, MenuItem} from '@material-ui/core';
import GreenTextField from '../GreenTextField';
import NumberFormat from 'react-number-format';
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

const AddLocationDialog = ({setActiveStep, binData, setBinData}) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [address, setAddress] = useState('');

    const [street, setStreet] = useState('');

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [data, setData] = useBinAddData();

    const validate = () => {
        if (address.trim() === '') {
            enqueueSnackbar('Please give an address', { variant: 'warning' });
            return false;
        }
        if (street.trim() === '') {
            enqueueSnackbar('Please give a street', { variant: 'warning' });
            return false;
        }
        if (
            !/^([+-])?((\d((\.)|\.\d{1,6})?)|(0*?[0-8]\d((\.)|\.\d{1,6})?)|(0*?90((\.)|\.0{1,6})?))$/.test(latitude.toString())
        ) {
            enqueueSnackbar('Please provide a valid latitude', { variant: 'warning' });
            return false;
        }
        if (
            !/^([+-])?((\d((\.)|\.\d{1,6})?)|(0*?\d\d((\.)|\.\d{1,6})?)|(0*?1[0-7]\d((\.)|\.\d{1,6})?)|(0*?180((\.)|\.0{1,6})?))$/.test(longitude.toString())
        ) {
            enqueueSnackbar('Please provide a valid longitude', { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validate()) {
            setBinData({
                ...binData,
                address,
                street,
                coordinates: [longitude, latitude]
            });
            setActiveStep(2);
        }
    };

    function NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                isNumericString
            />
        );
    }

    NumberFormatCustom.propTypes = {
        inputRef: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    return (
        <div>
            <GreenTextField
                label={'Address'}
                name={'address'}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Box pb={2} />
            <GreenTextField
                label={'Street'}
                name={'street'}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <Box my={2} />
            <Box display={'flex'} flexDirection={'row'}>
                <GreenTextField
                    label={'Latitude'}
                    name={'latitude'}
                    value={latitude}
                    type={'number'}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <Box p={1}/>
                <GreenTextField
                    label={'Longitude'}
                    name={'longitude'}
                    value={longitude}
                    type={'number'}
                    onChange={(e) => setLongitude(e.target.value)}
                />
            </Box>
            <Box my={2} />
            <Button
                color="secondary"
                size="medium"
                variant="contained"
                fullWidth
                onClick={handleNext}
                style={{textTransform: 'none'}}
            >
                {
                    'Next'
                }
            </Button>
        </div>
    );
};

export default AddLocationDialog;