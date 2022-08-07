
import { TextField } from '@mui/material'
import React from 'react'

const TextBox_Plain = ({ data, sx }) => {
    return (
        <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder={data.placeholder}
            name={data.value}
            sx={{ ...style_txtbox, ...sx }}
            onChange={data.handleChange}
        />)
}

export default TextBox_Plain

const style_txtbox = {
    width: "100%",
    ".MuiOutlinedInput-root": {
        bgcolor: "white",
        borderRadius: 10
    }
}
