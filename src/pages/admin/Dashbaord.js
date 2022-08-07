import { Box } from '@mui/system';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getpayments } from '../../services/record';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography'

const Dashbaord = () => {
  const [payments, sePayemnts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [labels, seLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', "Auguest", "September", "November", "December"])
  const chartRef = useRef()

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options_revenue = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Vs Month' },
    }
  }

  const data_revenue = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue (LKR)',
        data: payments,
        borderColor: '#B4B4B4',
        backgroundColor: '#525151',
        hoverBackgroundColor: '#FF8B03'
      },
    ],
  };

  const getData = async () => {
    let { data } = await getpayments()

    data = data.map(d => {
      const db_data_date = new Date(d.date).getTime()
      const from_date = new Date(from).getTime()
      const to_date = new Date(to).getTime()

      if (to_date && from_date) {
        if (db_data_date <= to_date && db_data_date >= from_date)
          return {
            date: new Date(d.date).getMonth() + 1,
            payment: d.payment,
          }
      }
    })

    if (data){
      data.forEach(d => {payments[d.date] += d.payment})
      sePayemnts(payments)
    }
    else
      sePayemnts([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    chartRef.current.update()
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [from, to])


  return (
    <>
      <Box display="flex" flexDirection="column" m="auto">
        <LocalizationProvider dateAdapter={AdapterDateFns} >

          <Box display="flex" alignItems="center" mt={5}>

            <DatePicker
              label="From"
              value={from}
              onChange={(newValue) => { setFrom(newValue) }}
              renderInput={(params) => <TextField
                {...params}
                variant="outlined"
                size='small'
                type="text"
                placeholder={"From"}
                sx={style_txtbox}
              />}
            />
            <Typography fontSize={18} fontWeight={500} sx={{ mx: 2 }}> To</Typography>
            <DatePicker
              label="To"
              value={to}
              onChange={(newValue) => { setTo(newValue) }}
              renderInput={(params) => <TextField
                {...params}
                variant="outlined"
                size='small'
                type="text"
                placeholder={"From"}
                sx={style_txtbox}
              />}
            />

          </Box>

        </LocalizationProvider>

        <Box width={900} mt={4} mx="auto" border="1px solid #525151">
          <Line ref={chartRef} options={options_revenue} data={data_revenue} redraw={true} />
        </Box>
      </Box>
    </>
  )
}


export default Dashbaord

const style_txtbox = {
  width: 200,
  ".MuiOutlinedInput-root": {
    bgcolor: "white",
    borderRadius: 10
  }
}
