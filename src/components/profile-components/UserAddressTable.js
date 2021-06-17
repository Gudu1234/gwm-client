/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/06/21 at 12:22 AM.
 */
import {makeStyles} from '@material-ui/styles';
import {TableCell} from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles((theme) => ({
    tableCellLabel: {
        paddingLeft: '20px',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: 'rgba(18, 73, 84, 0.75)',
        '@media (max-width:960px)': {
            paddingLeft: '0px',
        },
    },
    tableCell: {
        paddingLeft: '20px',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '140.1%',
        letterSpacing: '0.06em',
        color: '#124954',
        '@media (max-width:960px)': {
            paddingLeft: '0px',
        },
    }
}));

const UserAddressTable = ({label, value}) => {

    const classes = useStyle();

    return (
        <>
            <TableCell
                key={1}
                align={'left'}
                className={classes.tableCellLabel}
                style={{border: 'none', width: '150px'}}
            >
                {`${label}:`}
            </TableCell>
            <TableCell
                key={2}
                align={'left'}
                className={classes.tableCell}
                style={{border: 'none'}}
            >
                {value}
            </TableCell>
        </>
    );
};

export default UserAddressTable;