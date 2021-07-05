import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import {Button} from '@material-ui/core';
import Locator from '../../../../public/Locator.svg';

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

const MapView = ({google, binData}) => {

    const classes = useStyles();

    const { coordinates, address, street, landmark, pinCode, binId, currentAddress } = binData;

    const latitude = coordinates[1];
    const longitude = coordinates[0];

    const [loading, setLoading] = useState(false);
    const [visibleInfoWindow, setVisibleInfoWindow] = useState(true);
    const [activeMarker, setActiveMarker] = useState(null);
    const [binLatitude, setBinLatitude] = useState(null);
    const [binLongitude, setBinLongitude] = useState(null);
    const [binAddress, setBinAddress] = useState(currentAddress);

    const getLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLatitude = position.coords.latitude;
                const currentLongitude = position.coords.longitude;
                setLoading(false);

                let link = `https://www.google.com/maps/dir/${currentLatitude},%20${currentLongitude}/${latitude},%20${longitude}`;

                window.open(link, '_blank');
            });
        } else {
            setLoading(false);
        }
    };

    const handleMarkerClick = (props, marker) => {
        const { coordinates, currentAddress } = binData;
        const latitude = coordinates[1];
        const longitude = coordinates[0];
        setBinAddress(currentAddress);
        setBinLatitude(latitude);
        setBinLongitude(longitude);
        setActiveMarker(marker);
        setVisibleInfoWindow(true);
    }

    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main} pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography style={{color: '#fff'}}>
                        { 'Map View' }
                    </Typography>
                    <Box flex={1} />
                    <Button
                        variant={'contained'}
                        size="small"
                        color={'secondary'}
                        disabled={loading}
                        // component={Link}
                        target={'_blank'}
                        onClick={getLocation}
                        style={{textTransform: 'none', marginRight: '10px'}}
                    >
                        {'View Direction'}
                    </Button>
                </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Map
                    zoom={15}
                    google={google}
                    initialCenter={{
                        lat: latitude.toString(),
                        lng: longitude.toString()
                    }}
                    containerStyle={{
                        width: '100%',
                        height: '60vh',
                        position: 'relative',
                        margin: '8px 8px'
                    }}
                    center={{
                        lat: latitude.toString(),
                        lng: longitude.toString()
                    }}
                >
                    <Marker
                        title={`${address}, ${street}, ${landmark} - ${pinCode}`}
                        name={`${binId}`}
                        position={{lat: latitude.toString(), lng: longitude.toString()}}
                        onClick = {
                            (props, marker) =>
                                handleMarkerClick(props, marker)
                        }
                        icon={{
                            url: Locator,
                            // anchor: new google.maps.Point(32,32),
                            scaledSize: new google.maps.Size(30, 40)
                        }}
                    />
                    <InfoWindow
                        visible={visibleInfoWindow}
                        marker={activeMarker}
                        onClose={() => setVisibleInfoWindow(false)}
                    >
                        <div style={{maxWidth: '400px', borderRadius: '10px', background: '#E8F5F8'}}>
                            <b>Latitude: </b>{binLatitude}<br/>
                            <b>Longitude: </b>{binLongitude}<br/>
                            <b>Address: </b>{binAddress}
                        </div>
                    </InfoWindow>
                </Map>
            </Grid>
        </Grid>
    );
};

MapView.propTypes = {
    google: PropTypes.any,
    binData: PropTypes.any
};

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
})(MapView);