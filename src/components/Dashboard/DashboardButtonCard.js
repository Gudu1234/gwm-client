/**
 * Created by Soumya (soumya@smarttersstudio.com) on 26/05/21 at 5:36 PM.
 */
import {Box, ButtonBase, Card, CardContent, makeStyles, Typography, Button} from '@material-ui/core';
import React, {useState} from 'react';
import BinAddDialog from '../bin-components/BinAddDialog';
import {useSnackbar} from 'notistack';
import RequestCollectionDialog from './RequestCollectionDialog';

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

    const [addBinOpen, setAddBinOpen] = useState(false);
    const [requestCollection, setRequestCollectionOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleCardClick = (e, cardLabel) => {
        if (cardLabel === 'Add Bin') {
            setAddBinOpen(!addBinOpen);
        } else if (cardLabel === 'Request Collection') {
            setRequestCollectionOpen(!requestCollection);
        }
    }

    const updateBin = (data) => {
        if (data && data.status === 1) {
            enqueueSnackbar('Bin Added Successfully.', { variant: 'success' });
        }
        setAddBinOpen(false);
    }

    return (
        <>
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
                onClick={(e) => handleCardClick(e, typo1)}
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
            <BinAddDialog open={addBinOpen} setOpen={setAddBinOpen} updateBin={updateBin}/>
            <RequestCollectionDialog open={requestCollection} setOpen={setRequestCollectionOpen}/>
        </>
    );

};

export default DashboardButtonCard;