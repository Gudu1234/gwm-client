/**
 * Created by Soumya (soumya@smarttersstudio.com) on 19/05/21 at 6:02 PM.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loadingImage from '../../../public/GWMstrLogo.svg';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Box} from '@material-ui/core';

const useStyle = makeStyles(() => ({
    root: {
        width: '22%',
        marginTop: 10,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img: {
        width: '50%',
        marginTop: 140,
    },
}));
const AppLoader = () => {
    const classes = useStyle();

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        // <div
        //     style={{
        //         position: 'absolute',
        //         width: '100%',
        //         height: '100%',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         display: 'flex',
        //     }}
        // >
        //     <CircularProgress size={120} thickness={2.5} />
        // </div>
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={{xs: 13, sm: 10, md: 7}}
            >
                <img alt="logo" className={classes.img} src={loadingImage} />
                <div className={classes.root}>
                    <LinearProgress value={progress} variant="determinate" />
                </div>
            </Box>
        </>
    );
};

export default AppLoader;
