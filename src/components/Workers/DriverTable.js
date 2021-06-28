import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {getAllDrivers} from '../../apis/user';
import {useSnackbar} from 'notistack';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import Card from '../Card/Card';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import GreenSearchField from '../GreenSearchField';
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

const DriverTable = ({newDriverAdded, newDriver}) => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(6);
    const [drivers, setDrivers] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [clickedRow, setClickedRow] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [data, setData] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const headerStyles = makeStyles(styles);
    const headerClasses = headerStyles();

    const setRow = (req) => {
        const index = drivers.findIndex(e => e._id.toString() === req._id.toString());
        setClickedRow(drivers[index]);
        setOpenDetails(true);
    };

    const loadDrivers = (skip) => {
        setLoading(true);
        getAllDrivers(skip, rowsPerPage, search)
            .then((res) => {
                if (res.data) {
                    let _allDrivers = res.data.map(each => {
                        return {
                            ...each,
                            locality: each.address.street
                        };
                    });
                    setRows(_allDrivers);
                    setDrivers([...drivers, _allDrivers]);
                    setData([...data, ..._allDrivers]);
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
                    };
                });
                setDrivers(_allDrivers);
                setRows(_allDrivers);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
                setData(_allDrivers);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, newDriverAdded]);

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
                    notFound={'No Drivers Found'}
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
    );
};

export default DriverTable;