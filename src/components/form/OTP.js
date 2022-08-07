import React, { useState } from 'react'
import { dialogActions } from '../../store/dialogSlice'
import { messageActions } from '../../store/messageSlice'
import BtnSecondary from '../core/BtnSecondary'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, Typography } from '@mui/material'
import TextBox from '../core/TextBox'
import { sendMail } from '../../services/mail'
import { getUser_FP } from '../../services/user'

const OTP = () => {

    const dispatch = useDispatch()
    const [OTP, setOTP] = useState(undefined)

    const initVals = {
        email: "",
        OTP: "",
    }

    const Schema = yup.object().shape({
        email: yup.string().required("Required*").email("Email must be in valid format"),
        OTP: yup.number(),
    })

    const onSubmit = async (data) => {

        //check user
        const user = await getUser_FP(`${data.email}`)
        if (user.status !== 200) {
            dispatch(messageActions.show({ msg: "Invalid email", variant: "error" }))
            return
        }

        //prepare email data
        const email_data = {
            to: data.email,
            name: "User",
            subject: `Login OTP Verification`,
            OTP: Math.floor(Math.random() * 100000)
        };

        // send OTP
        if (!OTP) {
            try {
                const res = await sendMail(email_data)
                if (res === "OK") {
                    setOTP(email_data.OTP)
                    dispatch(messageActions.show({ msg: 'Email has been sent successfully', variant: "info" }))
                }
                else
                    dispatch(messageActions.show({ msg: res, variant: "error" }))
            } catch (error) {
                dispatch(messageActions.show({ msg: error.message, variant: "error" }))
            }
        }

        //verfy OTP
        if (OTP) {
            if (data.OTP) {
                if (Number.parseInt(data.OTP) !== OTP)
                    dispatch(messageActions.show({ msg: "Invalid OTP", variant: "error" }))
                else {
                    // eslint-disable-next-line
                    dispatch(dialogActions.show({ name: "UpdatePassword", data: user.data }))
                    dispatch(dialogActions.hide('OTP'))
                }
            } else {
                dispatch(messageActions.show({ msg: "OTP required", variant: "error" }))
            }
        }

    }

    const renderData = [
        { name: "Email", value: "email", placeholder: "example@example.com", options: { type: "email" } },
        { name: "OTP", value: "OTP", placeholder: "OTP", options: { ype: "number", disabled: OTP ? false : true } },
    ]

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            {renderData.map((data, i) => {
                return (
                    <Box key={i} mb={1} width={"100%"} >
                        <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                        <TextBox data={data} formik={formik} />
                    </Box>
                )
            })}

            <Box display="flex" justifyContent="end">
                <BtnSecondary type="submit" name="Verify" />
            </Box>

        </form>
    )
}

export default OTP