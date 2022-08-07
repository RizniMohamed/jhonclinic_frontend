import React from 'react'
import Delete from './Delete'
import Message from './Message'
import Profile from './Profile'
import Record from './Record'

const index = () => {
  return (
    <>
      <Message />
      <Profile/>
      <Delete />
      <Record/>
    </>
  )
}

export default index