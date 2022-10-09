import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePrepareContractWrite, useContractWrite, useAccount, useNetwork } from 'wagmi'
import dCOPABI from '../constants/ABI.json'

import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from 'react';
import { ethers } from 'ethers';

const dCOPAddress = '0x1a2BcD22BAdd4AcF274A15a81B2a23Fc53232B32';

const Home: NextPage = () => {


  const { config: createVaultConfig } = usePrepareContractWrite({
    addressOrName: dCOPAddress,
    contractInterface: dCOPABI,
    functionName: 'createVault',
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(createVaultConfig)


  const { address, isConnected } = useAccount()
  const { chain } = useNetwork();
  
  useEffect(() => {

  }, [address, isConnected, chain])

  const { config: depositCollateralConfig } = usePrepareContractWrite({
    addressOrName: dCOPAddress,
    contractInterface: dCOPABI,
    functionName: 'depositCollateral',
    args: ["0"],
    overrides: {
      value: ethers.utils.parseEther('0.1')
    }
  })

  const { write: depositCollateralWrite } = useContractWrite(depositCollateralConfig)

  const { config: borrowTokensConfig } = usePrepareContractWrite({
    addressOrName: dCOPAddress,
    contractInterface: dCOPABI,
    functionName: 'borrowToken',
    args: ["0", ethers.utils.parseEther('0.002').toString()],
    overrides: {
      gasLimit: 2000000
    }
  })

  const { write: borrowTokensWrite } = useContractWrite(borrowTokensConfig)

  const borrowTokens = () => {
    if(!borrowTokensWrite) return

    borrowTokensWrite()
  }

  const depositCollateral = () => {

    if(!depositCollateralWrite) return
    depositCollateralWrite()
  }

  const createVault = () => {
    if(!write) return;

    write()
  }
  return (
    <div>
      <ConnectButton />
      <div style={{cursor: 'pointer'}} onClick={() => createVault()}>Create vault</div>
      <div onClick={() => depositCollateral()}>Deposit collateral</div>
      <div onClick={() => borrowTokens()}>Mint dCOP</div>
    </div>
  )
}

export default Home
