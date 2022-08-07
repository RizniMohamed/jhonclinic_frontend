import { Autocomplete, Paper, TextField } from '@mui/material'
import React from 'react'

const AutoComplete = ({ formik,  data }) => {

    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)
    return (
        <Autocomplete
            size='small'
            options={data.list}
            defaultValue={{ name: data.defaultValue ? capitalizeFirstLetter(data.defaultValue) : "", value: data.defaultValue }}
            onChange={(e, value) => { formik.values.gender = value.value }}
            getOptionLabel={option => option.name}
            PaperComponent={params => <Paper {...params} sx={paperStyle} />}
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
            renderInput={(params) => (
                < TextField
                    {...params}
                    name={data.value}
                    placeholder={data.name}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    sx={{ minWidth: 200, }}
                />
            )}
        />)
}

export default AutoComplete


const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}