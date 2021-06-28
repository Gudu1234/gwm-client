/**
 * Created by Soumya (soumya@smarttersstudio.com) on 16/05/21 at 5:00 PM.
 */

import {makeStyles, TextField} from '@material-ui/core';

const useStyles = makeStyles({
    focused: {
        color: '#FFFFFF',
        '& .MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#124954',
            color: '#FFFFFF'
        },
        '& .MuiOutlinedInput-input': {
            color: '#124954',
            fontSize: '13px',
            '&:-webkit-autofill': {
                WebkitTextFillColor: '#124954',
            },
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
            color: '#124954'
        },
    },
});

const GreenTextField = (
    {
        label,
        name,
        value,
        onChange = null,
        onKeyDown = null,
        required= true,
        multiline = false,
        rows = 1,
        rowsMax = 1,
        InputProps,
        SelectProps,
        type = 'text',
        select = false,
        children = null,
        size = 'large',
        inputProps = {},
    }
) => {

    const classes = useStyles();

    return (
        <TextField
            className={classes.focused}
            type={type}
            color={'primary'}
            variant="outlined"
            fullWidth
            focused
            label={label}
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            onKeyDown={(e) => onKeyDown ? onKeyDown(e) : null}
            required={!!required}
            multiline={!!multiline}
            rows={rows}
            rowsMax={rowsMax}
            InputProps={InputProps ? InputProps : null}
            select={!!select}
            size={size}
            SelectProps={SelectProps ? SelectProps : null}
            inputProps={inputProps}
        >
            {children}
        </TextField>
    );
};

export default GreenTextField;