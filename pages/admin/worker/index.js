import React, {useState} from 'react';
import {
    Box, Button,
    Grid,
} from '@material-ui/core';
import CleanerTable from '../../../src/components/Workers/CleanerTable';
import DriverTable from '../../../src/components/Workers/DriverTable';
import {makeStyles} from '@material-ui/core/styles';
import WorkerAddDialog from '../../../src/components/Dialog/WorkerAddDialog';
import ImageUploadDialog from '../../../src/components/ImageUploadDialog';

const useStyles = makeStyles((theme) => ({
    addButton: {
        textTransform: 'none',
        // float: 'right',
        letterSpacing: '0.1em',
        marginLeft: '40px'
    }
}));

const Worker = () => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [newCleanerAdded, setNewCleanerAdded] = useState(false);
    const [newDriverAdded, setNewDriverAdded] = useState(false);

    const handleAddWorker = () => {
        setOpen(true);
    };

    const updateWorker = (data) => {
        if (data.role === 1) {
            setNewCleanerAdded(true);
        } else if (data.role === 2) {
            setNewDriverAdded(true);
        }
    };

    return (
        <div style={{marginTop: '0px'}}>
            <Box style={{marginTop: '0px'}}>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    onClick={handleAddWorker}
                    // disabled={loading}
                    className={classes.addButton}
                >
                    {'Add Worker'}
                </Button>
                <Box pb={4} />
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <CleanerTable
                            newCleanerAdded={newCleanerAdded}
                        />
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12}>
                        <DriverTable
                            newDriverAdded={newDriverAdded}
                        />
                    </Grid>
                </Grid>
                <WorkerAddDialog setOpen={setOpen} open={open} updateWorker={updateWorker}/>
                {/*<ImageUploadDialog setOpenDialog={setOpen} openDialog={open}/>*/}
            </Box>
        </div>
    );
};

export default Worker;
