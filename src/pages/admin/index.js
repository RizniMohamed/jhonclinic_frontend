import React from 'react'
import { Box } from '@mui/system'
import { Outlet } from 'react-router-dom'
import SidePanel from '../../components/SidePanel'
import Header from "../../components/Header"
import { Toolbar } from '@mui/material'

const Index = () => {
    return (
        <Box p={1} >
            <Header />
            <Toolbar />
            <Box display="flex">
                <SidePanel />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Index