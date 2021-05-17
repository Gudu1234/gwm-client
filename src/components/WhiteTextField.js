/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/05/21 at 5:00 PM.
 */

import {makeStyles, TextField} from '@material-ui/core';

const useStyles = makeStyles({
    focused: {
        color: '#FFFFFF',
        '& .MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        "& .MuiOutlinedInput-input": {
            color: "#fff",
            fontSize: '13px'
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#fff"
        }
    },
});

const WhiteTextField = (
    {
        label,
        name,
        value,
        onChange,
        required= true,
        multiline = false,
        rows = 1,
        rowsMax = 1,
        InputProps,
        SelectProps,
        type = 'text',
        select = false,
        children = null,
    }
) => {

    const classes = useStyles();

    return (
        <TextField
            className={classes.focused}
            type={type}
            color={'secondary'}
            variant="outlined"
            fullWidth
            focused
            label={label}
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            required={!!required}
            multiline={!!multiline}
            rows={rows}
            rowsMax={rowsMax}
            InputProps={InputProps ? InputProps : null}
            select={!!select}
            SelectProps={SelectProps ? SelectProps : null}
        >
            {children}
        </TextField>
    )
};

export default WhiteTextField;