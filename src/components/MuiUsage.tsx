import React from 'react'
import Button from '@mui/material/Button'
import { usePublicClient } from 'wagmi'

const MuiUsage = () => {
  return (
    <Button variant='contained' className='text-red-700'>
      Hello world Dev
    </Button>
  )
}

export default MuiUsage
