import { Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import RecordForm from '../form/Record';

const Record = () => {
  const { status } = useSelector(state => state.dialog.record)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={status} onClose={() => { dispatch(dialogActions.hide("record")) }} sx={style_dialog}>
      <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">Create Patient Record</Typography>
      <RecordForm />
    </Dialog >
  )
}

export default Record

const style_dialog = {
  "& .MuiPaper-root": {px: 0}
}