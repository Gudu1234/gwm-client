/**
 * Created By Soumya(soumya@smarttersstudio.com) on 05/07/21 at 1:46 AM.
 */

import {Box, Button} from '@material-ui/core';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import theme from '../../../src/theme';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from 'react';
import {monitorDrivers} from '../../../src/apis/user';
import TableLoader from '../../../src/components/Skeleton/TableLoader';
import axios from 'axios';
import InfoDialog from '../../../src/components/monitor-driver/InfoDialog';
import Locator from '../../../public/Locator.svg';

const MonitorDrivers = ({google}) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [visibleInfoWindow, setVisibleInfoWindow] = useState(true);
    const [activeMarker, setActiveMarker] = useState(null);
    const [driverLatitude, setDriverLatitude] = useState(null);
    const [driverLongitude, setDriverLongitude] = useState(null);

    const handleMarkerClick = (props, marker, e, each) => {
        const { coordinates, currentAddress } = each;
        const latitude = coordinates[1];
        const longitude = coordinates[0];
        setAddress(currentAddress);
        setDriverLatitude(latitude);
        setDriverLongitude(longitude);
        setActiveMarker(marker);
        setVisibleInfoWindow(true);
    }

    useEffect(() => {
        setLoading(true);
        monitorDrivers()
            .then((res) => {
                setUsers(res);
                setRefresh(false);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const currentLatitude = position.coords.latitude;
                        const currentLongitude = position.coords.longitude;
                        setCurrentLatitude(currentLatitude);
                        setCurrentLongitude(currentLongitude);
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }, [refresh]);

    return (
        <>
            {
                !loading ? (
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <Box display={'flex'} mb={1} width={'100%'}
                                 bgcolor={theme.palette.primary.main} pl={1.5} pt={1.5} pb={1.5}
                                 borderRadius={3}
                                 justifyContent={'center'}
                                 alignItems={'center'}
                            >
                                <Typography style={{color: '#fff'}}>
                                    { 'Monitor Drivers' }
                                </Typography>
                                <Box flex={1} />
                                <Button
                                    variant={'contained'}
                                    size="small"
                                    color={'secondary'}
                                    onClick={() => setRefresh(true)}
                                    style={{textTransform: 'none', marginRight: '10px'}}
                                >
                                    {'Refresh'}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Map
                                zoom={12}
                                google={google}
                                initialCenter={{
                                    lat: currentLatitude,
                                    lng: currentLongitude
                                }}
                                containerStyle={{
                                    width: '100%',
                                    height: '70vh',
                                    position: 'relative',
                                    margin: '8px 8px'
                                }}
                                center={{
                                    lat: currentLatitude,
                                    lng: currentLongitude
                                }}

                            >
                                {
                                    users.map((each) => {
                                        const { name, username, phone, coordinates } = each;
                                        return (
                                            <Marker
                                                title={`${username}, +91-${phone}`}
                                                name={`${name}`}
                                                position={{lat: coordinates[1], lng: coordinates[0]}}
                                                onClick={
                                                    (props, marker, e) =>
                                                        handleMarkerClick(props, marker, e, each)
                                                }
                                                icon={{
                                                    url: Locator,
                                                    // anchor: new google.maps.Point(32,32),
                                                    scaledSize: new google.maps.Size(30, 40)
                                                }}
                                            >
                                            </Marker>
                                        )
                                    })
                                }
                                <InfoWindow
                                    visible={visibleInfoWindow}
                                    marker={activeMarker}
                                    onClose={() => setVisibleInfoWindow(false)}
                                >
                                    <div style={{maxWidth: '400px', borderRadius: '10px', background: '#E8F5F8'}}>
                                        <b>Latitude: </b>{driverLatitude}<br/>
                                        <b>Longitude: </b>{driverLongitude}<br/>
                                        <b>Address: </b>{address}
                                    </div>
                                </InfoWindow>
                            </Map>
                        </Grid>
                        <InfoDialog open={open} setOpen={setOpen} user={user} address={address}/>
                    </Grid>
                ) : (
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                    >
                        <TableLoader />
                    </Box>
                )
            }
        </>
    )

};

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
})(MonitorDrivers);