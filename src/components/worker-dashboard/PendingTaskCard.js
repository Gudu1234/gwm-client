/**
 * Created by Soumya (soumya@smarttersstudio.com) on 03/07/21 at 1:43 AM.
 */
import {makeStyles} from '@material-ui/styles';
import {Box, Typography} from '@material-ui/core';
import CardBody from '../Card/CardBody';
import Card from '../Card/Card';
import React from 'react';
import PropTypes from 'prop-types';

const useStyle = makeStyles((theme) => ({
    pendingTaskDiv: {
        background: '#124954',
        borderRadius: '50px 0px 0px 50px',
        height: '35px',
        marginTop: '30px',
        marginLeft: '30px'
    },
    pendingTaskText: {
        color: '#124954',
        fontSize: '50px',
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: '0.06em',
        lineHeight: '140.1%'
    },
}));

const PendingTaskCard = ({tasks}) => {

    const classes = useStyle();

    const getTask = (tasks) => {
        return tasks > 9 ? '' + tasks : '0' + tasks;
    };

    return (
        <Card style={{marginLeft: '0px', marginRight: '0px', width: '100%'}}>
            <Box
                fullWidth
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                className={classes.pendingTaskDiv}
            >
                <Typography style={{color: '#fff'}} align={'right'}>
                    {'Pending Tasks :'}
                </Typography>
            </Box>
            <CardBody>
                <Box p={1}>
                    <Typography className={classes.pendingTaskText} align={'center'}>
                        {getTask(tasks)}
                    </Typography>
                </Box>
            </CardBody>
        </Card>
    );
};

PendingTaskCard.propTypes = {
    tasks: PropTypes.any
};

export default PendingTaskCard;