
import React from 'react';
import { useRouter } from 'next/router';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SwapDetails = () => {
  const router = useRouter();

  return (
    <div style={{ padding: '20px' }}>
      <IconButton onClick={() => router.back()} style={{ marginBottom: '20px', color: '#1976d2' }}>
        <ArrowBackIcon />
      </IconButton>
      <h1>Swap Details</h1>
      <p>Here are the details of your swap transaction:</p>
      {/* 展示交易细节 */}
    </div>
  );
};

export default SwapDetails;
