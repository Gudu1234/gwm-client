/**
 * Created By Soumya(soumya@smarttersstudio.com) on 07/07/21 at 11:22 AM.
 */
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    InputBase,
    Typography
} from '@material-ui/core';
import React, {useState} from 'react';
import {requestTask} from '../../apis/task';
import {useSnackbar} from 'notistack';

const RequestCollectionDialog = ({open, setOpen}) => {

    const [binId, setBinId] = useState('');
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setBinId('');
        setOpen(false);
    }

    const handleRequest = () => {
        if (binId.trim() === '') {
            enqueueSnackbar('Please Enter Bin ID.', { variant: 'warning' });
            return ;
        }
        setLoading(true);
        requestTask(binId)
            .then(() => {
                enqueueSnackbar('Successfully request for collection.', { variant: 'success' });
            })
            .catch((e) => {
                enqueueSnackbar(e.message, { variant: 'warning' })
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'} aria-labelledby="form-dialog-title">
            <DialogTitle onClose={handleClose}>
                <Typography>
                    {'Emergency Request For Collection'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box p={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <InputBase
                        placeholder={'Parent Bin Id'}
                        name={'binId'}
                        value={binId}
                        size={'medium'}
                        // variant={'outlined'}
                        onChange={(e) => setBinId(e.target.value)}
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
                        disabled={loading}
                        style={{
                            textTransform: 'none',
                        }}
                        onClick={handleRequest}
                    >
                        {loading ? <CircularProgress
                            size={24} color={'secondary'}
                        /> : 'Request'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );

};

export default RequestCollectionDialog;