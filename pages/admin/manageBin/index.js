import React, {useEffect, useState} from 'react';
import {Box, Button, Chip, Divider, Grid, IconButton, Menu, MenuItem} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import {getAllBins} from '../../../src/apis/bin';
import moment from 'moment';
import WhiteSearchField from '../../../src/components/WhiteSearchField';
import Card from '../../../src/components/Card/Card';
import CardBody from '../../../src/components/Card/CardBody';
import TableComponent from '../../../src/components/TableComponent';
import {Pagination} from '@material-ui/lab';
import {withStyles} from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from '@material-ui/core/styles';
import BinAddDialog from '../../../src/components/bin-components/BinAddDialog';
import GreenSearchField from '../../../src/components/GreenSearchField';
import {useRouter} from 'next/router';
import FilterListIcon from '@material-ui/icons/FilterList';

const columns = [
    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'binId',
        label: 'ID',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'landmark',
        label: 'Landmark',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'pinCode',
        label: 'PIN',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'binType',
        label: 'Type',
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
    addButton: {
        textTransform: 'none',
        // float: 'right',
        letterSpacing: '0.1em',
        marginLeft: '40px'
    },
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
        // '& .MuiDivider-root': {
        //     backgroundColor: '#26DF86'
        // }
        backgroundColor: '#26DF86'
    },
}));

const ManageBin = () => {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [rowsPerPage] = React.useState(10);
    const [bins, setBins] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [type, setType] = React.useState({ $ne: 'null' });
    const [binType, setBinType] = React.useState({ $in: [1, 2] });
    const [open, setOpen] = useState(false);
    const [newBinAdded, setNewBinAdded] = useState(false);
    const [clickedRow, setClickedRow] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [data, setData] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    const [dialogValue, setDialogValue] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

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
            setBinType({$in: [1, 2]});
        } else {
            console.log(value);
            setBinType(event.target.value);
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
                {'Parent'}
            </MenuItem>
            <MenuItem value={2} onClick={handleStatusChange}>
                {'Child'}
            </MenuItem>
        </Menu>
    );

    const columns = [
        {
            id: 'date',
            label: 'Date',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'binId',
            label: 'ID',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'landmark',
            label: 'Landmark',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'pinCode',
            label: 'PIN',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'binType',
            label: 'Type',
            component: (
                <>
                    <IconButton size={'small'} onClick={handleStatusMenuOpen}>
                        <FilterListIcon color={'secondary'} />
                    </IconButton>
                    {renderMenu}
                </>
            ),
            minWidth: 170,
            align: 'left',
        },
    ];

    const typeComponent = (binType) => {
        let label = binType === 1 ? 'Parent' : 'Child';
        // console.log(status);
        let color = binType === 1 ?
            'rgba(59, 196, 131, 0.3)' :
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

    const classes = useStyles();

    const setRow = (req) => {
        const index = data.findIndex(e => e._id.toString() === req._id.toString());
        setClickedRow(data[index]);
        Router.push('/admin/manageBin/' + data[index]._id);
    };

    const handleChangeDialogValue = (e, newValue) => {
        setDialogValue(newValue);
        if (newValue === 1) {
            setType('null');
        } else if (newValue === 0) {
            setType({ $ne: 'null' });
        }
        setRows([]);
    };

    const updateBin = () => {
        setNewBinAdded(true);
    };

    const loadBins = (skip) => {
        setLoading(true);
        getAllBins(skip, rowsPerPage, search, type, binType)
            .then((res) => {
                if (res.data) {
                    let _allBins = res.data.map(each => {
                        return {
                            ...each,
                            date: moment(each.createdAt).format('DD-MM-YYYY'),
                            binType: typeComponent(each.type),
                            // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                        };
                    });
                    setRows(_allBins);
                    setBins([...bins, _allBins]);
                    setData([...data, ..._allBins]);
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
        if (value * rowsPerPage > bins.length) {
            setRows([]);
            if (bins.length === total) {
                setRows(bins.slice((value - 1) * rowsPerPage, total));
            } else {
                loadBins((value - 1) * rowsPerPage);
            }
        } else {
            setRows([]);
            setRows(bins.slice((value - 1) * rowsPerPage, value * rowsPerPage));
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllBins(0, rowsPerPage, search, type, binType)
            .then((res) => {
                setTotal(res.total);
                let _allBins = res.data.map(each => {
                    return {
                        ...each,
                        date: moment(each.createdAt).format('DD-MM-YYYY'),
                        binType: typeComponent(each.type),
                        // feedbackType: each.feedbackType === 1 ? 'Feedback' : 'Suggestion'
                    };
                });
                setBins(_allBins);
                setRows(_allBins);
                setTotalPages(Math.ceil(res.total / rowsPerPage));
                setPage(1);
                setData(_allBins);
            })
            .catch((e) => {
                enqueueSnackbar(e && e.message ? e.message : 'Something went wrong!', { variant: 'warning' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search, type, newBinAdded, binType]);

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Box>
                <Box display={'flex'} flexDirection={'row'}>
                    <Box flex={1} />
                    <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        onClick={() => setOpen(true)}
                        // disabled={loading}
                        className={classes.addButton}
                    >
                        {'Add Bin'}
                    </Button>
                </Box>
                <Grid container>
                    <Grid item container xs={12} sm={12} md={12}>
                        <Card table>
                            <div className={classes.headerDiv}>
                                <AntTabs aria-label="disabled tabs example" onChange={handleChangeDialogValue} value={dialogValue}>
                                    <AntTab label="Assigned" {...a11yProps(0)} />
                                    <AntTab label="Unassigned" {...a11yProps(1)} />
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
                                    notFound={'No bins found'}
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
                <BinAddDialog setOpen={setOpen} open={open} updateBin={updateBin}/>
            </Box>
        </div>
    );
};


export default ManageBin;
