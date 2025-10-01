import React, { Component } from 'react'
import {Modal,Box} from "@mui/material"

const CustomModal = ({open,setOpen,activeItem,component:Component,setRoute}) => {
  return (
    <Modal
      className='z-999'
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
      className = "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] md:w-[30%] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute}  />
      </Box>
    </Modal>
  )
}

export default CustomModal