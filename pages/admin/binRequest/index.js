import React, {useEffect, useState} from 'react';
import {Box, Divider, FormControl, Grid, makeStyles, MenuItem, Select} from '@material-ui/core';
import CardHeader from '../../../src/components/Card/CardHeader';
import GreenSearchField from '../../../src/components/GreenSearchField';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import Card from '../../../src/components/Card/Card';
import {useSnackbar} from 'notistack';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import {getAllRequests} from '../../../src/apis/request';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from 'moment';
import {withStyles} from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WhiteSearchField from '../../../src/components/WhiteSearchField';

const columns = [
    {
        id: 'date',
        label: 'Date',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'reqId',
        label: 'RequestId',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'name',
        label: 'Name of Sender',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'pinCode',
        label: 'PIN',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'street',
        label: 'Locality',
        minWidth: 150,
        align: 'left'
    }
];

const AntTabs = withStyles((theme) => ({
    indicator: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff'
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        background: theme.palette.background.stepper,
        borderRadius: '5px 5px 0px 0px',
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        textTransform: 'none'
    },
    selected: {
        color: '#fff',
        background: theme.palette.primary.dark,
    },
}))((props) => <Tab disableRipple {...props} />);


const BinRequest = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(10);
    const [requests, setRequests] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [status, setStatus] = React.useState(1);
    const { enqueueSnackbar } = useSnackbar();

    const headerStyles = makeStyles(styles);
    const headerClasses = headerStyles();

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const [dialogValue, setDialogValue] = useState(0);

    const handleChangeDialogValue = (e, newValue) => {
        setDialogValue(newValue);
        setStatus(newValue + 1);
        setRows([]);
    };

    const loadRequests = (skip) => {
        setLoading(true);
        getAllRequests(skip, rowsPerPage, search, status)
            .then((res) => {
                if (res.data) {
                    let _allRequests = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            // status: each.status === 1 ? 'Feedback' : 'Suggestion'
                        };
                    });
                    setRows(_allRequests);
                    setRequests([...requests, _allRequests]);
                }
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        if (value * rowsPerPage > requests.length) {
            setRows([]);
            if (requests.length === total) {
                setRows(requests.slice((value - 1) * rowsPerPage, total));
            } else {
                loadRequests((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(requests.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllRequests(0, rowsPerPage, search, status)
            .then((res) => {
                setTotal(res.total);
                let _allRequests = res.data.map(each => {
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        // status: each.status === 1 ? 'Feedback' : 'Suggestion'
                    };
                });
                setRequests(_allRequests);
                setRows(_allRequests);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, status]);

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Box>
                <WhiteSearchField
                    placeholder={'Search'}
                    searchValue={search}
                    onChange={(val) => {
                        setRows([]);
                        setSearch(val);
                    }}
                />
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <div style={{background: '#124954', borderRadius: '10px 10px 0px 0px'}}>
                                <AntTabs
                                    aria-label="disabled tabs example"
                                    onChange={handleChangeDialogValue}
                                    value={dialogValue}
                                >
                                    <AntTab label="Requests" {...a11yProps(0)} />
                                    <AntTab label="Inspections" {...a11yProps(1)} />
                                    <AntTab label="Completed" {...a11yProps(2)} />
                                </AntTabs>
                            </div>
                            <Divider style={{border: '3px solid #26DF86', fill: '3px solid #124954'}}/>
                            <CardBody>
                                <TableComponent
                                    columns={columns}
                                    rows={rows}
                                    loading={loading}
                                    notFound={
                                        status === 1 ?
                                            'No requests Found' :
                                            status === 2 ?
                                                'No inspected requests Found' :
                                                'No completed requests Found'
                                    }
                                    pageLimit={rowsPerPage}
                                />
                                <Box display="flex" justifyContent="flex-end" m={3}>
                                    <Pagination
                                        color="primary"
                                        count={totalPages}
                                        onChange={handleChangePage}
                                        page={page}
                                        shape="rounded"
                                    />
                                </Box>
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default BinRequest;
