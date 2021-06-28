import React, {useEffect, useState} from 'react';
import {
    Box, Chip,
    Divider,
    Grid, IconButton,
    makeStyles, Menu, MenuItem,
} from '@material-ui/core';
import GreenSearchField from '../../../src/components/GreenSearchField';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import Card from '../../../src/components/Card/Card';
import {useSnackbar} from 'notistack';
import {getAllFeedbacks} from '../../../src/apis/contact';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/styles';
import FeedbackDetailsDialog from '../../../src/components/contact/FeedbackDetailsDialog';
import ComplaintDetailsDialog from '../../../src/components/contact/ComplaintDetailsDialog';
import FilterListIcon from '@material-ui/icons/FilterList';

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
        backgroundColor: '#26DF86'
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
    const [clickedRow, setClickedRow] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [statusUpdated, setStatusUpdated] = React.useState(false);
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState({ $in: [1, 2, 3] });
    const [complaintStatus, setComplaintStatus] = useState({ $in: [1, 2, 3] });
    const { enqueueSnackbar } = useSnackbar();
    
    const [dialogValue, setDialogValue] = useState(0);

    const classes = useStyles();

    const handleStatusMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleStatusChange = (event) => {
        let value = event.target.value;
        if (value === 0) {
            setStatus({$in: [1, 2, 3]});
            setComplaintStatus({$in: [1, 2, 3]});
        } else {
            setStatus(event.target.value);
            setComplaintStatus(event.target.value);
        }
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            id={'user-account'}
            keepMounted
            onClose={handleMenuClose}
            open={isMenuOpen}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MenuItem value={0} style={{borderBottom: '1px solid #7AE3B1'}} onClick={handleStatusChange}>
                {'None'}
            </MenuItem>
            <MenuItem value={1} style={{borderBottom: '1px solid #7AE3B1'}} onClick={handleStatusChange}>
                {'Active'}
            </MenuItem>
            <MenuItem value={3} onClick={handleStatusChange} style={{borderBottom: '1px solid #7AE3B1'}}>
                {'Inspection'}
            </MenuItem>
            <MenuItem value={2} onClick={handleStatusChange}>
                {'Resolved'}
            </MenuItem>
        </Menu>
    );

    const statusComponent = (status) => {
        let label = status === 1 ? 'Active' : (status === 2) ? 'Resolved' : 'Inspection';
        // console.log(status);
        let color = status === 1 ?
            'rgba(59, 196, 131, 0.3)' :
            status === 2 ?
                'rgba(255, 154, 62, 0.3)' :
                'rgba(153, 152, 226, 0.25)';
        return (
            <Chip
                label={label}
                style={{
                    background: color,
                    color: '#3A8899',
                    fontWeight: '700',
                    fontSize: '14px',
                }}
            />
        );
    };

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

    const complaintColumns = [
        ...columns,
        {
            id: 'feedbackStatus',
            label: 'Status',
            component: (
                <>
                    <IconButton size={'small'} onClick={handleStatusMenuOpen}>
                        <FilterListIcon color={'secondary'} />
                    </IconButton>
                    {renderMenu}
                </>
            ),
            minWidth: 170,
            align: 'left'
        }
    ];

    const handleChangeDialogValue = (e, newValue) => {
        setDialogValue(newValue);
        if (newValue + 1 !== 3) {
            setStatus({ $in: [1] });
        } else {
            setStatus({ $in: [1, 2, 3] });
        }
        setFeedBackType(newValue + 1);
        setRows([]);
    };

    const setRow = (req) => {
        const index = data.findIndex(e => e._id.toString() === req._id.toString());
        setClickedRow(data[index]);
        setOpenDetails(true);
    };

    const loadFeedbacks = (skip) => {
        setLoading(true);
        getAllFeedbacks(skip, rowsPerPage, search, feedbackType, status)
            .then((res) => {
                if (res.data) {
                    let _allFeedbacks = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            feedbackStatus: statusComponent(each.status),
                            // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                        };
                    });
                    setRows(_allFeedbacks);
                    setFeedbacks([...feedbacks, _allFeedbacks]);
                    setData([...data, ..._allFeedbacks]);
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
        getAllFeedbacks(0, rowsPerPage, search, feedbackType, status)
            .then((res) => {
                setTotal(res.total);
                let _allFeedbacks = res.data.map(each => {
                    console.log(each.status);
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        feedbackStatus: statusComponent(each.status),
                        // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                    };
                });
                setFeedbacks(_allFeedbacks);
                setRows(_allFeedbacks);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
                setData(_allFeedbacks);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, feedbackType, statusUpdated, status]);

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
                                    columns={feedbackType === 3 ? complaintColumns : columns}
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
                                    setRow={setRow}
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
            {
                openDetails ? (
                    clickedRow.feedbackType !== 3 ? (
                        <FeedbackDetailsDialog
                            setOpen={setOpenDetails}
                            open={openDetails}
                            feedbackData={clickedRow}
                            setStatusUpdated={setStatusUpdated}
                        />
                    ) : (
                        <ComplaintDetailsDialog
                            setOpen={setOpenDetails}
                            open={openDetails}
                            feedbackData={clickedRow}
                            setStatusUpdated={setStatusUpdated}
                        />
                    )
                ) : null
            }
        </div>
    );
};

export default Mail;
