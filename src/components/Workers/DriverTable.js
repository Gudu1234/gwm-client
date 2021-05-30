import React, {useEffect} from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import TableSkeleton from '../Skeleton/TableSkeleton';
import {getAllDrivers} from '../../apis/user';
import {useSnackbar} from 'notistack';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import Card from '../Card/Card';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import SearchField from '../SearchField';

const columns = [
    {
        id: 'name',
        label: 'Name of Driver',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'username',
        label: 'Username',
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
        id: 'locality',
        label: 'Locality',
        minWidth: 170,
        align: 'left',
    },
];

const useStyles = makeStyles({
    tableCell: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#3A8899',
        cursor: 'pointer'
    },
});

const DriverTable = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(6);
    const [drivers, setDrivers] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();

    const headerStyles = makeStyles(styles);
    const headerClasses = headerStyles();

    const loadDrivers = (skip) => {
        setLoading(true);
        getAllDrivers(skip, rowsPerPage, search)
            .then((res) => {
                if (res.data) {
                    setRows(res.data);
                    setDrivers([...drivers, ...res.data]);
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
        if (value * rowsPerPage > drivers.length) {
            setRows([]);
            if (drivers.length === total) {
                setRows(drivers.slice((value - 1) * rowsPerPage, total));
            } else {
                loadDrivers((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(drivers.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllDrivers(0, rowsPerPage, search)
            .then((res) => {
                setTotal(res.total);
                setDrivers(res.data);
                setRows(res.data);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search]);

    return (
        <Card table>
            <CardHeader color="primary">
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <h4 className={headerClasses.cardTitleWhite}>List of drivers</h4>
                        <p className={headerClasses.cardCategoryWhite}>
                            Of your zone
                        </p>
                    </Box>
                    <Box flex={1}/>
                    <SearchField
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
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '14px' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row) => {
                                    return (
                                        <TableRow hover role="button" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === 'locality') {
                                                    value = row.address.street;
                                                }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        className={classes.tableCell}
                                                    >
                                                        {
                                                            column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                            ) : !loading ? (
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <Typography>
                                            {'No drivers found.'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <TableSkeleton />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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
    );
};

export default DriverTable;