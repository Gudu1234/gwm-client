/**
 * Created by Soumya (soumya@smarttersstudio.com) on 02/07/21 at 11:30 PM.
 */
import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useStore} from 'laco-react';
import UserStore from '../../../src/store/userStore';
import WorkerProfileCard from '../../../src/components/worker-dashboard/WorkerProfileCard';
import PendingTaskCard from '../../../src/components/worker-dashboard/PendingTaskCard';
import CollectionRequestCard from '../../../src/components/worker-dashboard/CollectionRequestCard';
import TableLoader from '../../../src/components/Skeleton/TableLoader';
import {getAllTasks} from '../../../src/apis/task';

const useStyle = makeStyles((theme) => ({
    gridItemStyle: {
        paddingLeft: '0px',
        paddingRight: '0px',
    },
}));

const Dashboard = () => {

    const classes = useStyle();

    const { user } = useStore(UserStore);

    const [task, setTask] = useState(7);

    const [loading, setLoading] = useState(false);

    const {
        _id: userId,
        name,
        username,
    } = user;

    useEffect(() => {
        setLoading(true);
        getAllTasks(1)
            .then((res) => {
                setTask(res.length);
                setLoading(false)
            });
    }, []);

    return (
        <>
            {
                !loading ? (
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item container xs={12} sm={6} md={4} justify={'center'} alignItems={'center'} className={classes.gridItemStyle}>
                                <WorkerProfileCard avatar={user.avatar} name={name} username={username}/>
                            </Grid>
                            <Grid item container xs={12} sm={6} md={4} justify={'center'} alignItems={'center'} className={classes.gridItemStyle}>
                                <PendingTaskCard tasks={task}/>
                            </Grid>
                            {
                                user.role === 1 ? (
                                    <Grid item container xs={12} sm={6} md={6} justify={'center'} alignItems={'center'} className={classes.gridItemStyle}>
                                        <CollectionRequestCard />
                                    </Grid>
                                ) : null
                            }
                        </Grid>
                    </Box>
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
    );
};

export default Dashboard;