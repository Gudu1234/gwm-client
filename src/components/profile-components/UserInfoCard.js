/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/06/21 at 7:19 PM.
 */
import CardBody from '../../../src/components/Card/CardBody';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Card from '../../../src/components/Card/Card';
import {makeStyles} from '@material-ui/styles';
import {Box, Grid, Hidden, IconButton, Typography} from '@material-ui/core';
import React, {useState} from 'react';
import ChangePasswordDialog from '../Dialog/ChangePasswordDialog';

const useStyle = makeStyles((theme) => ({
    nameTypo: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        maxWidth: '24ch',
        wordWrap: 'break-word',
        color: '#124954'
    },
    userNameTypo: {
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)'
    },
}));

const UserInfoCard = ({label, value, userId}) => {

    const classes = useStyle();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid
                item
                container
                xs={12}
                sm={12}
                md={3}
                justify={'center'}
                alignItems={'center'}
            >
                <Hidden smDown>
                    <Card>
                        <CardBody>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                            >
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Typography className={classes.userNameTypo}>
                                        {`${label}:`}
                                    </Typography>
                                    <Box flex={1} />
                                    {
                                        label === 'Password' ? (
                                            <IconButton onClick={() => setOpen(true)}>
                                                <EditOutlinedIcon fontSize={'small'}/>
                                            </IconButton>
                                        ) : ''
                                    }
                                </Box>
                                <Box my={0.5} />
                                <Box fullWidth>
                                    <Typography className={classes.nameTypo} display={'block'}>
                                        {`${value}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardBody>
                    </Card>
                </Hidden>
                <Hidden mdUp>
                    {/*<Card>*/}
                    {/*    <CardBody>*/}
                    {/*        */}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        width={'100%'}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            fullWidth
                        >
                            <Typography className={classes.userNameTypo}>
                                {`${label}:`}
                            </Typography>
                            <Box flex={1} />
                            {
                                label === 'Password' ? (
                                    <IconButton onClick={() => setOpen(true)}>
                                        <EditOutlinedIcon fontSize={'small'}/>
                                    </IconButton>
                                ) : ''
                            }
                            {/*<IconButton>*/}
                            {/*    <EditOutlinedIcon fontSize={'small'}/>*/}
                            {/*</IconButton>*/}
                        </Box>
                        <Box my={0.5} />
                        <Box fullWidth>
                            <Typography className={classes.nameTypo} display={'block'}>
                                {`${value}`}
                            </Typography>
                        </Box>
                        <Box my={1}/>
                    </Box>
                </Hidden>
            </Grid>
            <ChangePasswordDialog open={open} setOpen={setOpen} userId={userId}/>
        </>
    );

};

export default UserInfoCard;