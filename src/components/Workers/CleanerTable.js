import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {getAllCleaners} from '../../apis/user';
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
        label: 'Name of Cleaner',
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

const CleanerTable = ({newCleanerAdded, newCleaner}) => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(20);
    const [rowsPerPage] = React.useState(6);
    const [cleaners, setCleaners] = React.useState([]);
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
        const index = data.findIndex(e => e._id.toString() === req._id.toString());
        setClickedRow(data[index]);
        setOpenDetails(true);
    };

    const loadCleaners = (skip) => {
        setLoading(true);
        getAllCleaners(skip, rowsPerPage, search)
            .then((res) => {
                if (res.data) {
                    let _allCleaners = res.data.map(each => {
                        return {
                            ...each,
                            locality: each.address.street
                        };
                    });
                    setRows(_allCleaners);
                    setCleaners([...cleaners, _allCleaners]);
                    setData([...data, ..._allCleaners]);
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
        getAllCleaners(0, rowsPerPage, search)
            .then((res) => {
                setTotal(res.total);
                let _allCleaners = res.data.map(each => {
                    return {
                        ...each,
                        locality: each.address.street
                    };
                });
                setCleaners(_allCleaners);
                setRows(_allCleaners);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
                setData(_allCleaners);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, newCleanerAdded]);

    return (
        <Card table>
            <CardHeader color="primary">
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <h4 className={headerClasses.cardTitleWhite}>List of Cleaners</h4>
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
                    notFound={'No Cleaners Found'}
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

export default CleanerTable;