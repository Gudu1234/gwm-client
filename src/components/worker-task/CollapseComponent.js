/**
 * Created By Soumya(soumya@smarttersstudio.com) on 03/07/21 at 4:14 PM.
 */

import {makeStyles} from '@material-ui/styles';
import {Card, Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {changeTaskStatus} from '../../apis/task';
import {useRouter} from 'next/router';

const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': {
            backgroundColor: '#fff',
        }
    },
    listItemStyle: {
        background: '#fff',
        marginTop: '10px',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px rgba(18, 73, 84, 0.1)',
    },
    listItemText: {
        paddingLeft: '30px'
    }
});

const CollapseComponent = ({pendingOpen, tasks, status, setStatusChanged}) => {

    const classes = useStyles();

    const Router = useRouter();

    const handleChangeStatus = (id, status) => {
        let statusToBeChanged = status === 1 ? 2 : 1;
        changeTaskStatus(id, statusToBeChanged)
            .then(() => {
                setStatusChanged(true);
            });
    }

    const getBinDetails = (id) => {
        Router.push('/admin/manageBin/' + id);
    };

    return (
        <div className={classes.root}>
            <Collapse in={pendingOpen} timeout="auto" unmountOnExit>
                <List component="div">
                    {
                        tasks.map((each) => {
                            if (each.status === status) {
                                return (
                                    <ListItem
                                        button
                                        component={Card}
                                        className={classes.listItemStyle}
                                    >
                                        <ListItemIcon onClick={() => handleChangeStatus(each._id, each.status)}>
                                            <Checkbox
                                                icon={
                                                    <RadioButtonUncheckedIcon
                                                        fontSize={'small'}
                                                        color={'primary'}
                                                    />
                                                }
                                                checkedIcon={
                                                    <CheckCircleIcon
                                                        fontSize={'small'}
                                                        color={'primary'}
                                                    />
                                                }
                                                checked={each.status === 2}
                                            />
                                        </ListItemIcon>
                                        {
                                            each.bin ? (
                                                <ListItemText
                                                    primary={each.bin.binId}
                                                    className={classes.listItemText}
                                                    style={each.status === 2 ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                                                    onClick={() => getBinDetails(each.bin._id)}
                                                />
                                            ) : (
                                                <ListItemText
                                                    primary={'Disposal Task'}
                                                    className={classes.listItemText}
                                                    style={each.status === 2 ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                                                />
                                            )
                                        }
                                    </ListItem>
                                );
                            }
                        })
                    }
                </List>
            </Collapse>
        </div>
    );
};

CollapseComponent.propTypes = {
    pendingOpen: PropTypes.any,
    tasks: PropTypes.any,
    setTasks: PropTypes.any,
    setStatusChanged: PropTypes.any
};

export default CollapseComponent;