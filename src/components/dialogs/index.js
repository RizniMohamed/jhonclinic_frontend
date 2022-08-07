import React from 'react'
import Message from './Message'
import OTP from './OTP'
import Signup from './Signup'
import UpdatePassword from './UpdatePassword'

const index = () => {
  return (
    <>
      <Message />
      <Signup />
      <OTP />
      <UpdatePassword />
    </>
  )
}

export default index