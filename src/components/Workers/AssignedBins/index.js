import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {getBinsOfWorker} from '../../../apis/bin';
import TableComponent from '../../TableComponent';

const useStyles = makeStyles((theme) => ({
    caption: {
        fontWeight: 'bold',
        color: 'grey'
    },
    heading:{
        color: '#ffffff'
    },
    nameTypo: {
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        overflowWrap: 'break-word',
        color: '#124954'
    },
    userNameTypo: {
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)'
    },
}));

const AssignedBins = ({userId}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [clickedRow, setClickedRow] = React.useState(null);
    const [bins, setBins] = useState([]);
    const [rowsPerPage] = React.useState(30);

    const setRow = (req) => {
        const index = bins.findIndex(e => e._id.toString() === req._id.toString());
        setClickedRow(bins[index]);
    };

    useEffect(() => {
        setLoading(true);
        getBinsOfWorker(userId)
            .then((res) => {
                let _allBins = res.data.map(each => {
                    return {
                        ...each,
                        type: each.type === 1 ? 'Parent' : 'Child'
                    };
                });
                setLoading(false);
                setBins(_allBins);
            });
    }, []);
    
    const columns = [
        {
            id: 'type',
            label: 'Bin Type',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'binId',
            label: 'Bin ID',
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
    
    return(
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Box display={'flex'} mb={1} width={'100%'}
                    bgcolor={theme.palette.primary.main}pl={1.5} pt={1.5} pb={1.5}
                    borderRadius={3}>
                    <Typography style={{color: '#fff'}}>
                        { 'Assigned Bins' }
                    </Typography>
                </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <TableComponent
                    columns={columns}
                    rows={bins}
                    loading={loading}
                    notFound={'No bins found'}
                    pageLimit={rowsPerPage}
                    setRow={setRow}
                />
            </Grid>
        </Grid>
    );
};

AssignedBins.propTypes = {
    userId: PropTypes.any
};

export default AssignedBins;