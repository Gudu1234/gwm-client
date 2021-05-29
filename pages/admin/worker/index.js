import React from 'react';
import {
    Box,
    Grid,
    makeStyles,
} from '@material-ui/core';
import Card from '../../../src/components/Card/Card';
import CardHeader from '../../../src/components/Card/CardHeader';
import CardBody from '../../../src/components/Card/CardBody';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import CleanerTable from '../../../src/components/Workers/CleanerTable';
import DriverTable from '../../../src/components/Workers/DriverTable';

const Worker = () => {
    const useStyles = makeStyles(styles);

    const classes = useStyles();

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>List of Cleaners</h4>
                                <p className={classes.cardCategoryWhite}>
                                    Of your zone
                                </p>
                            </CardHeader>
                            <CardBody>
                                <CleanerTable />
                            </CardBody>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>List of Drivers</h4>
                                <p className={classes.cardCategoryWhite}>
                                    Of your zone
                                </p>
                            </CardHeader>
                            <CardBody>
                                <DriverTable />
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Worker;
