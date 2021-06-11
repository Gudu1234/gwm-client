/**
 * Created by Soumya (soumya@smarttersstudio.com) on 23/05/21 at 11:46 PM.
 */
import {Box, Card, CardContent, Divider, makeStyles, Typography} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    divider: {
        border: '1px solid #7AE3B1'
    },
    cardContentComponent: {
        marginTop: '15px',
        padding: '0px',
        paddingBottom: '25px'
    },
    typo1Font: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        // color: '#124954'
    },
    typo2Font: {
        fontSize: '14px',
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        // color: '#124954'
    },
    typo3Font: {
        fontSize: '10px',
        fontWeight: '500',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: '#5D97A2'
    }
}));

const DashboardStatsCard = ({icon, typo1, typo2, typo3}) => {

    const classes = useStyles();

    return (
        <Card
            style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '2px 2px 6px rgba(18, 73, 84, 0.15)',
                width: '90%',
                height: '90%'
            }}
        >
            <CardContent className={classes.cardContentComponent}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={3}>
                    <Box width={'30%'}>
                        <img src={icon} alt={'Worker'}/>
                    </Box>
                    <Box flex={1}/>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography align={'right'} className={classes.typo1Font} >
                            {typo1}
                        </Typography>
                        <Box my={1}/>
                        <Typography align={'right'} className={classes.typo2Font}>
                            {typo2}
                        </Typography>
                    </Box>
                </Box>
                <Box my={3}/>
                <Divider className={classes.divider} />
                <Box my={1}/>
                <Box px={3}>
                    <Typography className={classes.typo3Font}>
                        {typo3}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DashboardStatsCard;