import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/form/Login'
import logo from '../localData/image/logo.png'
import wall from '../localData/image/login wall.jpg'

const Login = () => {

    const dispatch = useDispatch()

    return (
        <>
            <Box display="flex" p={0} m={0}>

                {/* left image */}
                <Box component="img" src={wall} alt='login Image' width="70%" height="100vh" />

                {/* right box */}
                <Box width="30%" display="flex" flexDirection="column" alignItems="center"  >
                    <Box component="img" src={logo} alt='login Image' width={100} height={100} mt={12} mb={6} />
                    <Typography fontWeight={700} fontSize={34} sx={{ my: 2 }} textAlign="center">Login</Typography>
                    <LoginForm />
                </Box>

            </Box>
        </>
    )
}

export default Login