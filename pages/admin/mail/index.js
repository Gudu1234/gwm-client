import React, {useEffect, useState} from 'react';
import {
    Box,
    // Card,
    CardContent,
    // CardHeader,
    Divider,
    FormControl,
    Grid,
    makeStyles,
    MenuItem,
    Select
} from '@material-ui/core';
import CardHeader from '../../../src/components/Card/CardHeader';
import GreenSearchField from '../../../src/components/GreenSearchField';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import Card from '../../../src/components/Card/Card';
import {useSnackbar} from 'notistack';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import {getAllFeedbacks} from '../../../src/apis/contact';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/styles';
import WhiteSearchField from '../../../src/components/WhiteSearchField';

const columns = [
    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'name',
        label: 'Name of Sender',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'pinCode',
        label: 'PIN',
        minWidth: 170,
        align: 'left',
    },
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
        textTransform: 'none',
        height: '60px'
    },
    selected: {
        color: '#fff',
        background: theme.palette.primary.dark,
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    headerDiv: {
        background: '#124954',
        borderRadius: '10px 10px 0px 0px',
        display: 'flex',
        height: '60px',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: '20px'
    },
    divider: {
        border: '3px solid #26DF86',
        '& .MuiDivider-root': {
            backgroundColor: '#26DF86'
        }
    },
}));

const Mail = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(10);
    const [feedbacks, setFeedbacks] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [feedbackType, setFeedBackType] = React.useState(1);
    const { enqueueSnackbar } = useSnackbar();
    
    const [dialogValue, setDialogValue] = useState(0);

    const classes = useStyles();
    
    const handleChangeDialogValue = (e, newValue) => {
        setDialogValue(newValue);
        setFeedBackType(newValue + 1);
        setRows([]);
    };

    const loadFeedbacks = (skip) => {
        setLoading(true);
        getAllFeedbacks(skip, rowsPerPage, search, feedbackType)
            .then((res) => {
                if (res.data) {
                    let _allFeedbacks = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                        };
                    });
                    setRows(_allFeedbacks);
                    setFeedbacks([...feedbacks, _allFeedbacks]);
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
        if (value * rowsPerPage > feedbacks.length) {
            setRows([]);
            if (feedbacks.length === total) {
                setRows(feedbacks.slice((value - 1) * rowsPerPage, total));
            } else {
                loadFeedbacks((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(feedbacks.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllFeedbacks(0, rowsPerPage, search, feedbackType)
            .then((res) => {
                setTotal(res.total);
                let _allFeedbacks = res.data.map(each => {
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                    };
                });
                setFeedbacks(_allFeedbacks);
                setRows(_allFeedbacks);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, feedbackType]);

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }
    
    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <div className={classes.headerDiv}>
                                <AntTabs aria-label="disabled tabs example" onChange={handleChangeDialogValue} value={dialogValue}>
                                    <AntTab label="Feedbacks" {...a11yProps(0)} />
                                    <AntTab label="Suggestions" {...a11yProps(1)} />
                                    <AntTab label="Complaints" {...a11yProps(2)} />
                                </AntTabs>
                                <Box flex={1} />
                                <GreenSearchField
                                    placeholder={'Search'}
                                    searchValue={search}
                                    onChange={(val) => {
                                        setRows([]);
                                        setSearch(val);
                                    }}
                                />
                            </div>
                            <Divider className={classes.divider}/>
                            <CardBody>
                                <TableComponent
                                    columns={columns}
                                    rows={rows}
                                    loading={loading}
                                    notFound={
                                        feedbackType === 1 ?
                                            'No feedbacks Found' :
                                            feedbackType === 2 ?
                                                'No suggestions Found' :
                                                'No complaints Found'
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

export default Mail;
