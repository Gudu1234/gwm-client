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
import TableComponent from '../TableComponent';

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
    const [drivers, setDrivers] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const headerStyles = makeStyles(styles);
    const headerClasses = headerStyles();

    const loadDrivers = (skip) => {
        setLoading(true);
        getAllDrivers(skip, rowsPerPage, search)
            .then((res) => {
                if (res.data) {
                    let _allDrivers = res.data.map(each => {
                        return {
                            ...each,
                            locality: each.address.street
                        }
                    });
                    setRows(_allDrivers);
                    setDrivers([...drivers, _allDrivers]);
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
                let _allDrivers = res.data.map(each => {
                    return {
                        ...each,
                        locality: each.address.street
                    }
                });
                setDrivers(_allDrivers);
                setRows(_allDrivers);
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
                <TableComponent
                    columns={columns}
                    rows={rows}
                    loading={loading}
                    notFound={'No Drivers Found'}
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
    );
};

export default DriverTable;