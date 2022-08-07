import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        status: false,
        data: "",
        onSubmit: ""
    },
    signup: {
        status: false,
        data: "",
        onSubmit: ""
    },
    OTP: {
        status: false,
        data: "",
        onSubmit: ""
    },
    UpdatePassword: {
        status: false,
        data: "",
        onSubmit: ""
    },
   
}
const DialogSlice = createSlice({
    name: "Dialog Slice",
    initialState,
    reducers: {
        show: (state, payload) => {
            const {name, onSubmit, data} = payload?.payload
            state[name] = {
                status: true,
                data: data,
                onSubmit: onSubmit
            }
        },
        hide: (state, payload) => {
            state[payload?.payload] = {
                status: false,
                data: "",
                onSubmit: undefined
            }
        },
    }
})

export const dialogActions = DialogSlice.actions
export default DialogSlice


/**
 * import {dialogActions} from 'path from your file'
 * import { useDispatch } from 'react-redux';
 *
 * const ComponentName = (params) => {
 *  const dispatch = useDispatch()
 *  const onSubmit = () => { <-- run this function on dialog submit action
 *      your login on submit
 *  }
 *  const dialogData = ......... <-- string or object or array or whatever you going to send into the dialog
 * 
 *  const dialog = ['dialogName', onSubmit, dialogData] <-- this order need to keep it in this way
 * 
 *  const handleClick = () => {
 *      dispatch(dialogActions.show(dialog))        <-- pass array to show function
 *      dispatch(dialogActions.hide("dialogName"))  <-- pass string to hide function
 *  }
 * 
 *  return (
 *      <Button onSubmit={handleClick}>Click Me</Button>
 *      JSX...
 *  )
 * }
 * 
 * export default ComponentName
 */