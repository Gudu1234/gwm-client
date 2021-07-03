import React, {useEffect, useState} from 'react';
import {Box, Chip, Divider, FormControl, Grid, IconButton, makeStyles, Menu, MenuItem, Select} from '@material-ui/core';
import GreenSearchField from '../../../src/components/GreenSearchField';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import Card from '../../../src/components/Card/Card';
import {useSnackbar} from 'notistack';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import {getAllRequests} from '../../../src/apis/request';
import moment from 'moment';
import RequestBinDetailsDialog from '../../../src/components/request-bin/RequestBinDetailsDialog';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';

const BinRequest = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(10);
    const [requests, setRequests] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [status, setStatus] = React.useState({ $in: [1, 2] });
    const [clickedRow, setClickedRow] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [statusUpdated, setStatusUpdated] = React.useState(false);
    const [data, setData] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { enqueueSnackbar } = useSnackbar();

    const headerStyles = makeStyles(styles);
    const headerClasses = headerStyles();

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
            setStatus({$in: [1, 2]});
        } else {
            setStatus(event.target.value);
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
                {'Requested'}
            </MenuItem>
            <MenuItem value={2} onClick={handleStatusChange}>
                {'Inspection'}
            </MenuItem>
        </Menu>
    );

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
        // {
        //     id: 'pinCode',
        //     label: 'PIN',
        //     minWidth: 150,
        //     align: 'left',
        // },
        {
            id: 'status',
            label: 'Status',
            component: (
                <>
                    <IconButton size={'small'} onClick={handleStatusMenuOpen}>
                        <FilterListIcon color={'secondary'} />
                    </IconButton>
                    {renderMenu}
                </>
            ),
            minWidth: 150,
            align: 'left'
        }
    ];

    const loadRequests = (skip) => {
        setLoading(true);
        getAllRequests(skip, rowsPerPage, search, status)
            .then((res) => {
                if (res.data) {
                    let _allRequests = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            status: statusComponent(each.status),
                            requestStatus: each.status,
                        };
                    });
                    setRows(_allRequests);
                    setRequests([...requests, _allRequests]);
                    setData([...data, ..._allRequests]);
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

    const statusComponent = (status) => {
        let label = status === 1 ? 'Requested' : (status === 2) ? 'Inspection' : 'Completed';
        // console.log(status);
        let color = status === 1 ?
            'rgba(59, 196, 131, 0.3)' :
            status === 2 ?
                'rgba(153, 152, 226, 0.25)' :
                'rgba(255, 154, 62, 0.3)';
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

    useEffect(() => {
        setLoading(true);
        getAllRequests(0, rowsPerPage, search, status)
            .then((res) => {
                setTotal(res.total);
                let _allRequests = res.data.map(each => {
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        status: statusComponent(each.status),
                        requestStatus: each.status,
                    };
                });
                setRequests(_allRequests);
                setRows(_allRequests);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
                setData(_allRequests);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, status, statusUpdated]);

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const setRow = (req) => {
        const index = data.findIndex(e => e.reqId === req.reqId);
        setClickedRow(data[index]);
        setOpenDetails(true);
    };

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <div
                                style={{
                                    background: '#124954',
                                    borderRadius: '10px 10px 0px 0px',
                                    height: '65px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    alignItems: 'center'
                                }}
                            >
                                <Box display={'flex'} flexDirection={'column'}>
                                    <h4 className={headerClasses.cardTitleWhite}>Bin Requests</h4>
                                    <p className={headerClasses.cardCategoryWhite}>
                                        Of your zone
                                    </p>
                                </Box>
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
                            <CardBody>
                                <TableComponent
                                    columns={columns}
                                    rows={rows}
                                    loading={loading}
                                    notFound={'No data found'}
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
                    <RequestBinDetailsDialog
                        open={openDetails}
                        setOpen={setOpenDetails}
                        reqData={clickedRow}
                        setStatusUpdated={setStatusUpdated}
                    />
                ) : null
            }
        </div>
    );
};

export default BinRequest;
