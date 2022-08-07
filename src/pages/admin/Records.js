import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RecordComp from '../../components/Record'
import { getRecords } from '../../services/record'
import { dialogActions } from '../../store/dialogSlice'

const Records = () => {
  const [records, setRecords] = useState([])
  const { userID } = useParams()
  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const [loading, setLoading] = useState(undefined)


  const getData = async () => {
    setLoading("Loading...")
    const { data } = await getRecords(userID)
    const newData = data.map(record => {
      return {
        date: record.date,
        tableData: [
          { name: "Record ID", value: record.recordID },
          { name: "disease", value: record.disease },
          { name: "diagnosis", value: record.diagnosis },
          { name: "payment", value: record.payment + " LKR" },
        ],
        prescription: record.prescription
      }
    })
    setRecords(newData)
    setLoading(undefined)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [userID, message.status])

  const handleAddClick = () => {
    dispatch(dialogActions.show({ name: "record", data: "create" }))
  }

  if (records.length === 0)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh" >
          <Typography fontSize={20} textAlign="center" fontWeight={900}>{loading ?? "No records assoicated with this patient"}</Typography>
        </Box>
        <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
          <AddIcon onClick={handleAddClick} />
        </Fab>
      </Box>
    )


  if (records.length !== 0)
    return (
      <Box mx={"auto"}>
        {records.map((data, i) => {
          return (
            <>
              <RecordComp key={i} data={data} />
              <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
                <AddIcon onClick={handleAddClick} />
              </Fab>
            </>
          )
        })}
      </Box>
    )
}

export default Records