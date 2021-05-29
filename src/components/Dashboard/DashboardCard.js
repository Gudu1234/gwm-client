/**
 * Created by Soumya (soumya@smarttersstudio.com) on 24/05/21 at 10:35 PM.
 */
import {Avatar, Box, CardContent, Divider, Icon, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import RequestBinIcon from '../../../public/DashboradButtonAssets/Request bin green.svg';
import CardHeader from '../Card/CardHeader';
import CardIcon from '../Card/CardIcon';
import Card from '../Card/Card';
import {blackColor, hexToRgb, whiteColor} from '../../../public/assets/jss/nextjs-material-dashboard';

const useStyles = makeStyles(theme => ({
    divider: {
        border: '1px solid #7AE3B1'
    },
    cardContentComponent: {
        marginTop: '15px',
        padding: '0px',
        paddingBottom: '10px',
        '& .MuiCardContent-root:last-child': {
            paddingBottom: '10px'
        }
    },
    typo1Font: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
    },
    typo2Font: {
        fontSize: '12px',
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
    },
    typo3Font: {
        fontSize: '10px',
        fontWeight: '500',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: '#5D97A2',
    }
}));

const DashboardCard = ({icon, text, more}) => {

    const classes = useStyles();

    return (
        <Card
            style={{
                border: "0",
                marginBottom: "20px",
                marginTop: "30px",
                borderRadius: "15px",
                color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
                background: whiteColor,
                width: "90%",
                boxShadow: '2px 2px 6px rgba(18, 73, 84, 0.15)',
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minWidth: "0",
                wordWrap: "break-word",
                fontSize: ".875rem",
            }}
        >
            <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                    <Typography align={'center'} style={{fontWeight: '500', fontSize: '24px', lineHeight: '140.1%'}}>
                        {'+'+more}
                    </Typography>
                </CardIcon>
                <Box my={3} />
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <img src={icon} alt={'Request bin'} width={'%'}/>
                    <Typography style={{color: '#124954', fontWeight: 'normal', fontSize: '12px', lineHeight: '140.1%'}}>
                        {text}
                    </Typography>
                </Box>
            </CardHeader>
            <CardContent className={classes.cardContentComponent} style={{padding: '0px 0px 10px'}}>
                <Divider className={classes.divider} />
                <Box my={1}/>
                <Box px={3}>
                    <Typography className={classes.typo3Font}>
                        {'Last updated 4 minutes ago'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

};

export default DashboardCard;