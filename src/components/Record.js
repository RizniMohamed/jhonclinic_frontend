import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Record = ({ data }) => {
    return (
        <Box width={500} border="1px solid #b4b4b4" borderRadius={2} mt={2} p={1} sx={{ boxShadow: 700 }}>
            <Typography textAlign="end" fontSize={16} fontWeight={500} sx={{ m: 1 }}>{data.date}</Typography>
            {data.tableData.map((tdata, i) => {
                return (
                    <Box key={i} display="flex" flexWrap="wrap">
                        <Typography fontSize={16} fontWeight={500} sx={{ mb: 1, width: 80 }}>{tdata.name}</Typography>
                        <Typography textAlign="center" fontSize={16} fontWeight={500} sx={{ mb: 1, width: 50 }}>:</Typography>
                        <Typography fontSize={16} fontWeight={500} sx={{ mb: 1 }}>{tdata.value}</Typography>
                    </Box>
                )
            })}
            <Typography textAlign="center" fontSize={16} fontWeight={500} sx={{ mb: 1, width: 50 }}>Prescription</Typography>
            {data.prescription.map((tdata, i) => {
                return (
                    <Box key={i} display="flex" flexWrap="wrap" ml={5}>
                        <Typography fontSize={16} fontWeight={500} sx={{ mb: 1, minWidth: 70 }}>{tdata.name}</Typography>
                        <Typography textAlign="center" fontSize={16} fontWeight={500} sx={{ mb: 1, width: 50 }}>:</Typography>
                        <Typography fontSize={16} fontWeight={500} sx={{ mb: 1 }}>{tdata.value}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}

export default Record