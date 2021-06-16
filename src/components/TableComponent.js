/**
 * Created by Soumya (soumya@smarttersstudio.com) on 30/05/21 at 9:04 PM.
 */
import {
    Divider,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import TableSkeleton from './Skeleton/TableSkeleton';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    tableCell: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#3A8899',
        cursor: 'pointer'
    },
});

const TableComponent = ({columns, rows, notFound, loading, pageLimit}) => {

    const classes = useStyles();

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
                    <Divider style={{border: '1px solid #124954', fill: '1px solid #124954', width: `${columns.length * 100}%`}}/>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => {
                                return (
                                    <TableRow hover role="button" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
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
                                <TableCell align="center" colSpan={columns.length}>
                                    <Typography>
                                        {notFound}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={columns.length}>
                                    <TableSkeleton length={pageLimit}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    notFound: PropTypes.string,
    loading: PropTypes.bool,
    pageLimit: PropTypes.number,
};

export default TableComponent;