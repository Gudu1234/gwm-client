/**
 * Created by Soumya (soumya@smarttersstudio.com) on 02/07/21 at 11:30 PM.
 */
import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    Checkbox,
    Collapse,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {getAllTasks} from '../../../src/apis/task';
import TableLoader from '../../../src/components/Skeleton/TableLoader';
import {makeStyles} from '@material-ui/styles';
import CollapseComponent from '../../../src/components/worker-task/CollapseComponent';

const useStyles = makeStyles({
    listItemStyle: {
        background: '#fff',
        marginTop: '10px',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px rgba(18, 73, 84, 0.1)'
    },
    listItemText: {
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '0.06em',
        lineHeight: '140.1%',
    }
});

const Dashboard = () => {

    const classes = useStyles();

    const [pendingOpen, setPendingOpen] = useState(true);
    const [completedOpen, setCompletedOpen] = useState(true);

    const [loading, setLoading] = useState(false);

    const [tasks, setTasks] = useState([]);

    const [pendingTasks, setPendingTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);

    const [statusChanged, setStatusChanged] = useState(false);

    const handlePendingExpandClick = () => {
        setPendingOpen(!pendingOpen);
    }

    const handleCompletedExpandClick = () => {
        setCompletedOpen(!completedOpen);
    }

    useEffect(() => {
        setLoading(true);
        getAllTasks()
            .then((res) => {
                setTasks(res);
                if (!res.some(each => each.status === 1)) {
                    setPendingOpen(false);
                } else {
                    setPendingOpen(true);
                }
                if (!res.some(each => each.status === 2)) {
                    setCompletedOpen(false);
                } else {
                    setCompletedOpen(true);
                }
                setPendingTasks(res.filter(each => each.status === 1).length);
                setCompletedTasks(res.filter(each => each.status === 2).length);
                setLoading(false);
                setStatusChanged(false);
            })
    }, [statusChanged])

    return (
        <>
            {
                !loading ? (
                    <Box>
                        <Grid container>
                            <Grid item container xs={12} sm={12} md={12}>
                                <List style={{background: 'transparent', width: '100%'}}>
                                    <ListItem button onClick={handlePendingExpandClick}>
                                        {pendingOpen ? <ExpandLess /> : <ExpandMore />}
                                        <ListItemText primary={`Pending ${pendingTasks}`} />
                                    </ListItem>
                                    <CollapseComponent pendingOpen={pendingOpen} tasks={tasks} status={1} setStatusChanged={setStatusChanged}/>
                                    <ListItem button onClick={handleCompletedExpandClick}>
                                        {completedOpen ? <ExpandLess /> : <ExpandMore />}
                                        <ListItemText primary={`Completed ${completedTasks}`} />
                                    </ListItem>
                                    <CollapseComponent pendingOpen={completedOpen} tasks={tasks} status={2} setStatusChanged={setStatusChanged}/>
                                </List>
                            </Grid>
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