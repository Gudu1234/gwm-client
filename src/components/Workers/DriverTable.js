import React, {useEffect} from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import TableSkeleton from '../Skeleton/TableSkeleton';
import {getAllDrivers} from '../../apis/user';
import {useSnackbar} from 'notistack';

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

const DriverTable = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(6);
    const [cleaners, setCleaners] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const loadCleaners = (skip) => {
        setLoading(true);
        getAllDrivers(skip, rowsPerPage, '')
            .then((res) => {
                if (res.data) {
                    setRows(res.data);
                    setCleaners([...cleaners, ...res.data]);
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
        if (value * rowsPerPage > cleaners.length) {
            setRows([]);
            if (cleaners.length === total) {
                setRows(cleaners.slice((value - 1) * rowsPerPage, total));
            } else {
                loadCleaners((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(cleaners.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllDrivers(0, rowsPerPage, '')
            .then((res) => {
                setTotal(res.total);
                setCleaners(res.data);
                setRows(res.data);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
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
                                                <TableCell key={column.id} align={column.align} style={{
                                                    fontWeight: '500', fontSize: '14px', color: '#3A8899', cursor: 'pointer'
                                                }}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
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
                                        {'No Drivers found.'}
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
        </div>
    );
};

export default DriverTable;