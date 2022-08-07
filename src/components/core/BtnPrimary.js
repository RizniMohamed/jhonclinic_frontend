import { Button } from '@mui/material'
import React from 'react'

function BtnPrimary({ type, onClick, sx, name }) {
    return (
        <Button
            variant='contained'
            type={type}
            onClick={onClick}
            sx={{ ...style_btn, ...sx }}>
            {name}
        </Button>
    )
}

export default BtnPrimary

const style_btn = { width: 180, alignSelf: "center", color: "white", my: 2 }