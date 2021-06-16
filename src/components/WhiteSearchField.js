/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 11/5/2020 at 2:42 AM
 * @description Search Field
 */
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import {IconButton, InputAdornment} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    search: {
        display:'flex',
        justifyContent:'space-between',
        position: 'relative',
        // marginTop:5,
        height: 40,
        // borderRadius: theme.shape.borderRadius,
        borderBottom: '2px solid #124954',
        border: 'none',
        backgroundColor: '#E8F5F8',
        '&:hover': {
            backgroundColor: '#E8F5F8',
        },
        width: 260,
    },
    inputRoot: {
        color: '#124954',
        width: '100%',
        float: 'left',
        textAlign: 'right'
    },
    inputInput: {
        padding: theme.spacing(1, 1 , 1, 4),
        fontSize: 13,
        width: '100%',
        '&::placeholder': {
            textAlign: 'right'
        }
    },
}));

const WhiteSearchField = (props) => {

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
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon style={{color: '#124954', fontSize: 30, float: 'right', marginRight: '10px'}}/>
                    </InputAdornment>
                }
                inputProps={{ 'aria-label': 'search' }}
            />
            {/*<div className={classes.searchIcon}>*/}
            {/*    <SearchIcon style={{color: '#124954', fontSize: 19, float: 'right'}}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default WhiteSearchField;

WhiteSearchField.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchValue: PropTypes.string
};