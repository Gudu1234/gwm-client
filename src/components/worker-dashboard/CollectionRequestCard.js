/**
 * Created by Soumya (soumya@smarttersstudio.com) on 03/07/21 at 1:54 AM.
 */
import {makeStyles} from '@material-ui/styles';
import {Box, Button, InputBase, Typography} from '@material-ui/core';
import CardBody from '../Card/CardBody';
import Card from '../Card/Card';
import React, {useState} from 'react';

const useStyle = makeStyles((theme) => ({
    collectionRequestDiv: {
        background: '#124954',
        borderRadius: '0px 50px 50px 00px',
        height: '35px',
        marginTop: '30px',
        marginRight: '30px'
    },
}));

const CollectionRequestCard = () => {

    const classes = useStyle();

    const [parentBinId, setParentBinId] = useState('');

    return (
        <Card style={{marginLeft: '0px', marginRight: '0px', width: '100%'}}>
            <Box
                fullWidth
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                className={classes.collectionRequestDiv}
            >
                <Typography style={{color: '#fff'}} align={'right'}>
                    {'Collection Request :'}
                </Typography>
            </Box>
            <CardBody>
                <Box p={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <InputBase
                        placeholder={'Parent Bin Id'}
                        name={'binId'}
                        value={parentBinId}
                        size={'medium'}
                        // variant={'outlined'}
                        onChange={(e) => setParentBinId(e.target.value)}
                        required={true}
                        style={{
                            borderRadius: '10px',
                            background: '#fff',
                            boxShadow: 'inset 2px 2px 6px rgba(18, 73, 84, 0.1)',
                            borderColor: '#fff',
                            height: '45px',
                            paddingLeft: '10px'
                        }}
                    />
                    <Box my={1.5} />
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        {'Request'}
                    </Button>
                </Box>
            </CardBody>
        </Card>
    );
};

export default CollectionRequestCard;