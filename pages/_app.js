import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import app from '../src/apis/index';
import {SnackbarProvider} from 'notistack';
import AppLoader from '../src/components/loaders/AppLoader';
import Layout from '../src/layouts/Layout';
import UserStore from '../src/store/userStore';
import 'cropperjs/dist/cropper.css';
import {editDetails} from '../src/apis/user';


export default function MyApp(props) {
    const { Component, pageProps } = props;
    const Router = useRouter();

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        console.log('app useEffect called');
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        const token = localStorage.getItem('feathers-jwt');

        if (token) {
            let query = {
                $populate: 'zone'
            };
            app
                .authenticate({
                    strategy: 'jwt',
                    accessToken: token
                }, {
                    query: query
                })
                .then(response => {
                    const { accessToken, user } = response;
                    // console.log('app accesstoken',accessToken, user);
                    localStorage.setItem('feathers-jwt', accessToken);
                    UserStore.set(() => ({ token: accessToken, user }), 'login');
                    console.log(user.role);
                    if (user.role === 3 || user.role === 4 || user.role === 1 || user.role === 2) {
                        // Router.replace('/admin/dashboard').then(() => {
                        //     setLoading(false);
                        // });
                        setLoading(false);
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                const currentLatitude = position.coords.latitude;
                                const currentLongitude = position.coords.longitude;

                                editDetails(user._id, {
                                    coordinates: [currentLongitude, currentLatitude]
                                });
                            });
                        }
                        setInterval(() => {
                            const { role } = user;
                            if (role === 2) {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition((position) => {
                                        const currentLatitude = position.coords.latitude;
                                        const currentLongitude = position.coords.longitude;

                                        editDetails(user._id, {
                                            coordinates: [currentLongitude, currentLatitude]
                                        });
                                    });
                                }
                            }
                        }, 60000);
                    }
                })
                .catch((e) => {
                    // console.log(e);
                    // console.log('catch method called');
                    app.logout();
                    Router.push('/login');
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                    // app.logout();
                    // localStorage.removeItem('feathers-jwt');
                    // Router.replace('/').then(() => {
                    // });
                });
        } else {
            // if (Router.pathname !== '/login') {
            //     Router.replace('/login').then(() => {
            //         setLoading(false);
            //     });
            // } else {
            //     setLoading(false);
            // }
            if (Router.pathname.startsWith('/admin') || Router.pathname.startsWith('/worker')) {
                Router.replace('/').then(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>GWM</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {
                        loading ?
                            <AppLoader /> :
                            (
                                Router.pathname.startsWith('/admin') || Router.pathname.startsWith('/worker') ?
                                    <Layout title={Component.title ? Component.title : ''}>
                                        <Component {...pageProps} />
                                    </Layout>
                                    : <Component {...pageProps} />
                            )
                    }
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};