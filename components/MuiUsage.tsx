import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckBox from '@mui/material/CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const MuiUsage = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [swtAmount, setSwtAmount] = useState(''); // 假设 1 ETH = 3000 SWT
  const router = useRouter();
  const [isCrossChain, setIsCrossChain] = useState(false); // 新状态来标识是否跨链

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCrossChainChange = (event) => {
    setIsCrossChain(event.target.checked);
  };

  const handleEthAmountChange = (event) => {
    const amountInEth = event.target.value;
    setEthAmount(amountInEth);
    const amountInSwt = convertEthToSwt(amountInEth);
    setSwtAmount(amountInSwt);
  };

  const handleSwap = () => {
    // 根据是否跨链选择不同的页面
    if (isCrossChain) {
      // 进入跨链交易详情页面
      router.push('/cross-chain-swap-details');
    } else {
      // 进入普通交易详情页面
      router.push('/swap-details');
    }
  };

  const convertEthToSwt = (amountInEth) => {
    // 这里使用静态的汇率示例，1 ETH = 3000 SWT
    return amountInEth * 3000;
  };

  return (
    <div>
            <div>
        <FormControlLabel
          control={
            <CheckBox
              checked={isCrossChain}
              onChange={handleCrossChainChange}
              name="crossChainCheckbox"
              color="primary"
            />
          }
          label="Cross-Chain Transfer"/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16 }}>
        <IconButton onClick={handleGoBack} style={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <p>Sign Up</p>
      <TextField
        label="Amount in ETH"
        type="number"
        value={ethAmount}
        onChange={handleEthAmountChange}
        helperText={`Approximately ${swtAmount} SWT`}
      />
      <Button variant='contained' className='text-red-700' onClick={handleSwap}>
        proceed with Swap
      </Button>
    </div>
  );
}

export default MuiUsage;