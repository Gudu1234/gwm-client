/**
 * Created by Soumya (soumya@smarttersstudio.com) on 02/07/21 at 11:30 PM.
 */
import React, {useState} from 'react';
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

const Dashboard = () => {

    const [pendingOpen, setPendingOpen] = useState(true);
    const [checked, setChecked] = useState(false);

    const handlePendingCheckClick = () => {
        setChecked(!checked);
    }

    return (
        <Box>
            <Grid container>
                <Grid item container xs={12} sm={12} md={12}>
                    <List style={{background: 'transparent'}}>
                        <ListItem button>
                            <ListItemText primary={'Pending'} />
                            {pendingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={pendingOpen} timeout="auto" unmountOnExit>
                            <List component="div">
                                <ListItem button component={Card} style={{background: '#fff', marginTop: '10px', borderRadius: '10px', boxShadow: '4px 4px 8px rgba(18, 73, 84, 0.1)'}}>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon fontSize={'small'} color={'primary'}/>}
                                            checkedIcon={<CheckCircleIcon fontSize={'small'} color={'primary'}/>}
                                            checked={checked}
                                            onChange={handlePendingCheckClick}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItem>
                                <ListItem button component={Card} style={{background: '#fff', marginTop: '10px', borderRadius: '10px', boxShadow: '4px 4px 8px rgba(18, 73, 84, 0.1)'}}>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon fontSize={'small'} color={'primary'}/>}
                                            checkedIcon={<CheckCircleIcon fontSize={'small'} color={'primary'}/>}
                                            checked={checked}
                                            onChange={handlePendingCheckClick}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItem>
                                <ListItem button component={Card} style={{background: '#fff', marginTop: '10px', borderRadius: '10px', boxShadow: '4px 4px 8px rgba(18, 73, 84, 0.1)'}}>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon fontSize={'small'} color={'primary'}/>}
                                            checkedIcon={<CheckCircleIcon fontSize={'small'} color={'primary'}/>}
                                            checked={checked}
                                            onChange={handlePendingCheckClick}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;