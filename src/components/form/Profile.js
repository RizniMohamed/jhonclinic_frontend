import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { createProfile, updateProfile } from '../../services/user';
import { dialogActions } from '../../store/dialogSlice';
import { messageActions } from '../../store/messageSlice';
import Autocomplete from '../core/AutoComplete';

const initVals = {
    name: "",
    address: "",
    mobile: "",
    image: "",
    gender: "",
}

const Schema = yup.object().shape({
    name: yup.string().required("Required*"),
    address: yup.string().required("Required*"),
    mobile: yup.string().required("Required*"),
    gender: yup.string().required("Required*"),
    image: yup.mixed().required("Required*"),
})

const Profile = ({ status, data }) => {
    const [image, setImage] = useState("")
    const dispatch = useDispatch()

    const onSubmit = async (dataInput) => {

        console.log(dataInput);

        try {
            const formData = new FormData()
            formData.append("userID", data?.userID)
            formData.append("name", dataInput.name)
            formData.append("gender", dataInput.gender)
            formData.append("address", dataInput.address)
            formData.append("mobile", dataInput.mobile)
            formData.append("image", dataInput.image)

            dispatch(messageActions.show({ msg: "Request has been sent please wait a moment...", variant: "info" }))
            if (data !== "create") { // update
                const { status } = await updateProfile(formData)
                if (status !== 200)
                    dispatch(messageActions.show({ msg: "Error on updating profile", variant: "error" }))
                else {
                    dispatch(messageActions.show({ msg: "Profile updated successfully" }))
                    dispatch(dialogActions.hide('profile'))
                }
            } else {
                const { data: res, status } = await createProfile(formData)
                if (status !== 201)
                    dispatch(messageActions.show({ msg: res.image[0], variant: "error" }))
                else {
                    dispatch(messageActions.show({ msg: "Profile created successfully, ID : " + res.userID }))
                    dispatch(dialogActions.hide('profile'))
                }
            }
        } catch (error) {
            dispatch(messageActions.show({ msg: error.message, variant: "error" }))
        }

    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    const renderData = [
        { name: "Name", value: "name", options: { defaultValue: data?.name } },
        { name: "Address", value: "address", options: { defaultValue: data?.address } },
        { name: "Mobile", value: "mobile", options: { placeholder: "Enter without leading zero", type: "number", defaultValue: data?.mobile } },
    ];

    const onImageChange = (e) => {
        formik.values.image = e.target.files[0]
        const image = URL.createObjectURL(e.target.files[0])
        setImage(image)
    }

    useEffect(() => {
        formik.values.address = data?.address
        formik.values.mobile = data?.mobile
        formik.values.name = data?.name
        formik.values.gender = data?.gender
        setImage(data?.image)
        // eslint-disable-next-line
    }, [status, data])



    const renderGender = {
        name: "Gender",
        value: "gender",
        defaultValue: data?.gender,
        list: [
            { name: "Male", value: "male" },
            { name: "Female", value: "female" }
        ]
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <Box display="flex" justifyContent="center">
                    <IconButton color="primary" component="label" size="small" sx={{ p: 0 }} >
                        <Avatar src={image} sx={{ height: 150, width: 150, border: Boolean(formik.errors.image) && "2px solid red" }} />
                        <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={onImageChange} />
                    </IconButton>
                </Box>

                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={2} width={"100%"} >
                            <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                            <TextField
                                variant="outlined"
                                size='small'
                                type="text"
                                placeholder={data.name.toString()}
                                name={data.value.toString()}
                                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                                onChange={formik.handleChange}
                                error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                                onBlur={formik.handleBlur}
                                {...data?.options}
                            />
                        </Box>
                    )
                })}

                <Box mb={2} width={"100%"} >
                    <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Gender</Typography>
                    <Autocomplete formik={formik} data={renderGender} />
                </Box>

                <Box display="flex" justifyContent="end">
                    <Button
                        variant='contained'
                        type="submit"
                        color='secondary'
                        sx={{ width: 100, mt: 3, mb: 1 }}
                    >
                        Update
                    </Button>
                </Box>

            </form>
        </>

    )
}

export default Profile

