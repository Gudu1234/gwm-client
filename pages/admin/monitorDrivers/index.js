/**
 * Created By Soumya(soumya@smarttersstudio.com) on 05/07/21 at 1:46 AM.
 */

import {Box, Button} from '@material-ui/core';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import theme from '../../../src/theme';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from 'react';
import {monitorDrivers} from '../../../src/apis/user';
import TableLoader from '../../../src/components/Skeleton/TableLoader';
import axios from 'axios';
import InfoDialog from '../../../src/components/monitor-driver/InfoDialog';

const MonitorDrivers = ({google}) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState('');
    const [refresh, setRefresh] = useState(false);

    const handleMarkerClick = (each) => {
        const { coordinates } = each;
        const latitude = coordinates[1];
        const longitude = coordinates[0];
        const apiKey = process.env.NEXT_PUBLIC_PLACES_KEY;
        const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
        const config = {
            method: 'get',
            url,
            headers: { }
        };
        axios(config)
            .then((res) => {
                setAddress(res.data.display_name);
                setUser(each);
                setOpen(true);
            })
            .catch((e) => {
                console.log(e);
            })
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
                                        console.log('http://maps.google.com/mapfiles/kml/shapes/truck.png');
                                        return (
                                            <Marker
                                                title={`${username}, +91-${phone}`}
                                                name={`${name}`}
                                                position={{lat: coordinates[1], lng: coordinates[0]}}
                                                onClick={() => handleMarkerClick(each)}
                                                // icon={{
                                                //     url: "http://maps.google.com/mapfiles/kml/shapes/truck.png",
                                                //     // anchor: new google.maps.Point(32,32),
                                                //     scaledSize: new google.maps.Size(35,35)
                                                // }}
                                                // position={{lat: 37.778519, lng: -122.405640}}
                                            />
                                        )
                                    })
                                }
                                {/*<Marker*/}
                                {/*    title={`${address}, ${street}, ${landmark} - ${pinCode}`}*/}
                                {/*    name={`${binId}`}*/}
                                {/*    position={{lat: latitude.toString(), lng: longitude.toString()}}*/}
                                {/*/>*/}
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