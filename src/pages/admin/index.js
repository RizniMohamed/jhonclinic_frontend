import React from 'react'
import { Box } from '@mui/system'
// import SidePanel from "../../Components/SidePanel"
import { Outlet } from 'react-router-dom'

const Index = () => {
    return (
        <Box display="flex" p={1} >
            {/* <SidePanel /> */}
            <Outlet />
        </Box>
    )
}

export default Index