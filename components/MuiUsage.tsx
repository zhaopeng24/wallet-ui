import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MuiUsage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div style= {{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',marginBottom: 16 }}>
        <IconButton onClick= {handleGoBack}>
        <ArrowBackIcon />
        </IconButton>
        </div>
      <p>Sign Up </p>
    <Button variant='contained' className='text-red-700'>
      Hello world
    </Button>
    </div>
  )
}

export default MuiUsage
