import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WcIcon from '@mui/icons-material/Wc';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../services/user';
import { dialogActions } from '../../store/dialogSlice';
import { messageActions } from '../../store/messageSlice';
import TextBox_Plain from '../../components/core/TextBox_Plain';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Patients = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const message = useSelector(state => state.message)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(undefined)
  const [PatientID, setPatientID] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    if (PatientID)
      (async () => {
        setLoading("Loading...")
        const { data, status } = await getUsers(PatientID)
        if (status === 200)
          setUser({
            image: data.image,
            name: data.name,
            gender: data.gender,
            mobile: data.mobile,
            userID: data.userID,
            address: data.address,
          })
        else
          setUser({})
        setLoading(undefined)
      })()
  }, [PatientID, message.status])


  const onDelete = async () => {
    const response = await deleteUser({ userID: user.userID })
    if (response.status !== 200)
      dispatch(messageActions.show({ msg: "Error on deletion", variant: "error" }))
    else {
      dispatch(messageActions.show({ msg: "Account deleted successfully" }))
      dispatch(dialogActions.hide('delete'))
    }
  }

  const deleteDialogData = {
    name: "delete",
    onSubmit: onDelete,
    data: "Are you sure do you want to delete this patient profile?"
  }


  const handleChange = (e) => { setPatientID(e.target.value) }
  const searchTxtBxData = {
    placeholder: "Patient ID",
    name: "patientID",
    handleChange: handleChange
  }

  const handleAddClick = () => {
    dispatch(dialogActions.show({ name: "profile", data: "create" }))
  }


  if (!PatientID)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>
        <Box display="flex" alignItems="center" mb={4}>
          <Typography fontSize={16} fontWeight={500} sx={{ mr: 1, width: 120 }}>Patient ID</Typography>
          <TextBox_Plain data={searchTxtBxData} />
        </Box>

        <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
          <AddIcon onClick={handleAddClick} />
        </Fab>

      </Box>
    )

  if (Object.entries(user).length === 0)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>
        <Box display="flex" alignItems="center" mb={4}>
          <Typography fontSize={16} fontWeight={500} sx={{ mr: 1, width: 120 }}>Patient ID</Typography>
          <TextBox_Plain data={searchTxtBxData} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh" >
          <Typography fontSize={20} textAlign="center" fontWeight={900}>{loading ?? "No patient assoicated with this ID"}</Typography>
        </Box>
        <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
          <AddIcon onClick={handleAddClick} />
        </Fab>
      </Box>
    )

  if (Object.entries(user).length !== 0)
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>
          <Box display="flex" alignItems="center" mb={4}>
            <Typography fontSize={16} fontWeight={500} sx={{ mr: 1, width: 120 }}>Patient ID</Typography>
            <TextBox_Plain data={searchTxtBxData} />
          </Box>

          <Avatar
            sx={{ width: 200, height: 200 }}
            alt="Profile picture"
            src={user.image} />
          <Typography fontSize={16} fontWeight={700} sx={{ my: 2 }}>{user.name}</Typography>

          <Box my={2}>
            <Box display="flex" alignItems="center" mt={1} >
              <LocationOnIcon />
              <Typography fontSize={16} sx={{ ml: 1 }}>{user.address}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1} >
              <LocalPhoneIcon />
              <Typography fontSize={16} sx={{ ml: 1 }}>{user.mobile}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1} >
              <WcIcon />
              <Typography fontSize={16} sx={{ ml: 1 }}>{user.gender}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1} >
              <BrandingWatermarkIcon />
              <Typography fontSize={16} sx={{ ml: 1 }}>{user.userID}</Typography>
            </Box>
          </Box>

          <Box my={5}>
            
            <Button
              variant='contained'
              size='small'
              onClick={() => dispatch(dialogActions.show(deleteDialogData))}
              sx={{ ...buttonStyle, "&:hover": { bgcolor: "red" } }}>
              Delete
            </Button>

            <Button
              variant='contained'
              size='small'
              onClick={() => {
                dispatch(dialogActions.show({ name: "profile", data: user }))
              }}
              sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }}>
              Update
            </Button>

            <Button
              variant='contained'
              size='small'
              onClick={() => {navigate(`${user.userID}/records`)}}
              sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }}>
              View Records
            </Button>

          </Box>
          <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
            <AddIcon onClick={handleAddClick} />
          </Fab>
        </Box>

      </>
    )
}

export default Patients

const buttonStyle = {
  width: 150,
  borderRadius: 0.2,
  bgcolor: "background.mainbg",
  color: "white",
  mx: 1
}