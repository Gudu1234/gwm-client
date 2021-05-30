import React from 'react';
import {
    Box,
    Grid,
} from '@material-ui/core';
import CleanerTable from '../../../src/components/Workers/CleanerTable';
import DriverTable from '../../../src/components/Workers/DriverTable';

const Worker = () => {

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <CleanerTable />
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12}>
                        <DriverTable />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Worker;
