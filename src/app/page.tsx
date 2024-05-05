import { ConnectButton } from "@rainbow-me/rainbowkit";

function handleMetaMaskConnect(){
  if(typeof window.ethereum !== 'undefined'){
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log('Connected to MetaMask:', accounts);
    })
    .catch(error => {
      console.error('Fialed to connect to MetaMask:', error);
    });
  }else{
    console.log('MetaMask is not installed in this browser. ');
  }
}

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <button onClick={handleMetaMaskConnect}>连接MetaMask</button>
      <ConnectButton />
    </div>
  );
}
