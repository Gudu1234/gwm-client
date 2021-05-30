/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 11/5/2020 at 2:42 AM
 * @description Search Field
 */
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    search: {
        display:'flex',
        justifyContent:'space-between',
        position: 'relative',
        // marginTop:5,
        height: 40,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#E8F5F8',
        '&:hover': {
            backgroundColor: '#E8F5F8',
        },
        width: 260,
    },
    searchIcon: {
        padding: theme.spacing(1, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'gray',
        float: 'right'
    },
    inputRoot: {
        color: '#124954',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 2 , 1, 4),
        fontSize: 13,
        width: '100%',
    },
}));

const SearchField = (props) => {

    const { placeholder, searchValue, onChange } = props;

    const classes = useStyles();
    
    return (
        <div className={classes.search}>
            <InputBase
                placeholder = { placeholder }
                value = { searchValue }
                onChange = {
                    (e) => onChange(e.target.value)
                }
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.searchIcon}>
                <SearchIcon style={{color: '#124954', fontSize: 19}}/>
            </div>
        </div>
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchValue: PropTypes.string
};