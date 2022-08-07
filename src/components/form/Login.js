import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { loginUser } from '../../services/user';
import BtnPrimary from '../core/BtnPrimary';
import TextBox from '../core/TextBox';
import { useDispatch } from 'react-redux';
import { messageActions } from '../../store/messageSlice';
import { authActions } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    let initVals = {
        username: "",
        password: ""
    }

    const Schema = yup.object().shape({
        username: yup.string().required("Required*"),
        password: yup.string().required("Required*"),
    })

    const renderData = [
        { username: "Email", value: "username", placeholder: "username"},
        { name: "Password", value: "password", placeholder: "password", options: { type: "password" } },
    ]

    const onSubmit = async ({ username, password }) => {
        const sendData = { username, password }
        const { data, status } = await loginUser(sendData)

        if (status !== 200) {
            dispatch(messageActions.show({ msg: data, variant: "error" }))
            return
        }
        dispatch(authActions.set())
        naviagte('admin')
    }


    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", alignSelf: "center", width: 300, }}>
                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={1} width={"100%"} >
                            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                            <TextBox data={data} formik={formik} />
                        </Box>
                    )
                })}
                <BtnPrimary name="Login" type="submit" />
            </Box >
        </form>
    )
}

export default Login
