import React, {useEffect} from 'react';
import {Box, FormControl, Grid, makeStyles, MenuItem, Select} from '@material-ui/core';
import CardHeader from '../../../src/components/Card/CardHeader';
import GreenSearchField from '../../../src/components/GreenSearchField';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import Card from '../../../src/components/Card/Card';
import {useSnackbar} from 'notistack';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import {getAllComplaints} from '../../../src/apis/contact';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import moment from 'moment';

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

const Mail = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(10);
    const [complaints, setComplaints] = React.useState([]);
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

    const loadComplaints = (skip) => {
        setLoading(true);
        getAllComplaints(skip, rowsPerPage, search, status)
            .then((res) => {
                if (res.data) {
                    let _allComplaints = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            // status: each.status === 1 ? 'Feedback' : 'Suggestion'
                        }
                    })
                    setRows(_allComplaints);
                    setComplaints([...complaints, _allComplaints]);
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
        if (value * rowsPerPage > complaints.length) {
            setRows([]);
            if (complaints.length === total) {
                setRows(complaints.slice((value - 1) * rowsPerPage, total));
            } else {
                loadComplaints((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(complaints.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllComplaints(0, rowsPerPage, search, status)
            .then((res) => {
                setTotal(res.total);
                let _allComplaints = res.data.map(each => {
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        // status: each.status === 1 ? 'Feedback' : 'Suggestion'
                    }
                })
                setComplaints(_allComplaints);
                setRows(_allComplaints);
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

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <CardHeader color="primary">
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    <Box display={'flex'} flexDirection={'column'}>
                                        <h4 className={headerClasses.cardTitleWhite}>Complaints</h4>
                                        <p className={headerClasses.cardCategoryWhite}>
                                            from your zone
                                        </p>
                                    </Box>
                                    <Box flex={1}/>
                                    <FormControl variant={'outlined'} >
                                        <Select
                                            labelId = "demo-simple-select-outlined-label"
                                            id = "demo-simple-select-outlined"
                                            autoFocus={true}
                                            value={status}
                                            onChange={handleStatusChange}
                                            IconComponent={KeyboardArrowDownIcon}
                                            style={{
                                                background: '#fff',
                                                border: 'none',
                                                borderRadius: '10px',
                                                height: '40px'
                                            }}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                getContentAnchorEl: null
                                            }}
                                        >
                                            <MenuItem value = {1} style={{borderBottom: '1px solid #7AE3B1'}}>Active</MenuItem>
                                            <MenuItem value = {2}>Resolved</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box flex={1} />
                                    <GreenSearchField
                                        placeholder={'Search'}
                                        searchValue={search}
                                        onChange={(val) => {
                                            setRows([]);
                                            setSearch(val);
                                        }}
                                    />
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <TableComponent
                                    columns={columns}
                                    rows={rows}
                                    loading={loading}
                                    notFound={'No complaints Found'}
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
