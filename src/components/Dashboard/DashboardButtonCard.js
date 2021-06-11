/**
 * Created by Soumya (soumya@smarttersstudio.com) on 26/05/21 at 5:36 PM.
 */
import {Box, ButtonBase, Card, CardContent, makeStyles, Typography} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    cardContentComponent: {
        marginTop: '20px',
        padding: '0px',
        paddingBottom: '0px'
    },
    typo1Font: {
        fontSize: '16px',
        fontWeight: '500',
        fontStyle: 'normal',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
    },
    card: {
        '&:hover': {
            background: '#124954 radial-gradient(circle, transparent 50%, #124954 100%) center/15000%'
        },
        '&:active': {
            transition: 'background 0s',
        }
    }
}));

const DashboardButtonCard = ({icon, typo1}) => {

    const classes = useStyles();

    return (
        <Card
            // className={classes.card}
            style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '2px 2px 6px rgba(18, 73, 84, 0.15)',
                width: '90%',
                // marginBottom: '20px',
                cursor: 'pointer',
            }}
            onClick={(e) => alert(`${typo1} is Clicked.`)}
        >
            <CardContent className={classes.cardContentComponent}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={2}>
                    <Box width={'30%'}>
                        <img src={icon} alt={'Icon'}/>
                    </Box>
                    <Box mx={1}/>
                    <Typography className={classes.typo1Font} >
                        {typo1}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

};

export default DashboardButtonCard;