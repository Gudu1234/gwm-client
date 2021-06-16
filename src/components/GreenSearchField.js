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
        borderBottom: '1px solid #fff',
        border: 'none',
        backgroundColor: '#124954',
        '&:hover': {
            backgroundColor: '#124954',
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
        color: '#fff',
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

const GreenSearchField = (props) => {

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
                        <SearchIcon style={{color: '#fff', fontSize: 30, float: 'right', marginRight: '10px'}}/>
                    </InputAdornment>
                }
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};

export default GreenSearchField;

GreenSearchField.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchValue: PropTypes.string
};