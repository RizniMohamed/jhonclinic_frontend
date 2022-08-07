import { DialogContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { createRecord } from '../../services/record';
import { dialogActions } from '../../store/dialogSlice';
import { messageActions } from '../../store/messageSlice';
import BtnSecondary from '../core/BtnSecondary';
import TextBox from '../core/TextBox';

const initVals = {
    disease: "",
    diagnosis: "",
    payment: "",
    prescription: "",
}

const Schema = yup.object().shape({
    disease: yup.string().required("Required*"),
    diagnosis: yup.string().required("Required*"),
    payment: yup.string().required("Required*"),
    prescription: yup.mixed().required("Required*")
})

const renderData = [
    { name: "Disease", value: "disease", placeholder: "Disease" },
    { name: "Diagnosis", value: "diagnosis", placeholder: "Diagnosis", options: { multiline: true, rows: 3 } },
    { name: "Payment", value: "payment", placeholder: "LKR", options: { type: "number" } },
    { name: "Prescription", value: "prescription", placeholder: "name-dose,name-dose...", options: { multiline: true, rows: 3 } },
]


const Record = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const onSubmit = async (inputData) => {
        const prescription = []
        const presctiptionsPairs = inputData.prescription.split(',')
        presctiptionsPairs.forEach(pair => {
            const temp = pair.split('-')
            prescription.push({ "name": temp[0], "value": temp[1] })
        })

        const sendData = {
            "userID": location.pathname.split('/')[3],
            "disease": inputData.disease,
            "diagnosis": inputData.diagnosis,
            "prescription": prescription,
            "payment": inputData.payment
        }

        const { data, status } = await createRecord(sendData)

        if (status !== 201) {
            console.log(data);
            // dispatch(messageActions.show({ msg: data, variant: "error" }))
            return
        }

        dispatch(messageActions.show({ msg: "Record created successfully" }))
        dispatch(dialogActions.hide('record'))

    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    return (

        <form onSubmit={formik.handleSubmit}>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 400 }}>

                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={1} width={"100%"} >
                            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1 }} >{data.name}</Typography>
                            <TextBox data={data} formik={formik} sx={{
                                ".MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                    borderRadius: 0.3
                                }
                            }} />
                        </Box>
                    )
                })}

                <BtnSecondary name="Create" type="submit" sx={{ width: 50, display: "flex", alignSelf: "end" }} />

            </DialogContent>

        </form>

    )
}


export default Record