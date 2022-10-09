import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePrepareContractWrite, useContractWrite, useAccount, useNetwork } from 'wagmi'
import dCOPABI from '../constants/ABI.json'
import Image from 'next/image'
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const dCOPAddress = '0x1a2BcD22BAdd4AcF274A15a81B2a23Fc53232B32';

const Home: NextPage = () => {

  const [amountToMint, setAmountToMint] = useState(0);
  const [amountToDeposit, setAmountToDeposit] = useState(0);

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
      value: ethers.utils.parseEther(amountToDeposit.toString())
    }
  })

  const { write: depositCollateralWrite } = useContractWrite(depositCollateralConfig)

  const { config: borrowTokensConfig } = usePrepareContractWrite({
    addressOrName: dCOPAddress,
    contractInterface: dCOPABI,
    functionName: 'borrowToken',
    args: ["0", ethers.utils.parseEther(amountToMint.toString()).toString()],
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
      <div className="flex flex-col gap-2 items-center justify-center">
        <Image src={'/dcop.png'} height={200} width={200} alt="dCOP"/>
        <div className='flex gap-3'>
          <div className='flex justify-center items-center'>
            <div>
          <div className="p-2 bg-yellow-300 cursor-pointer" onClick={() => createVault()}>Create vault</div></div>
          </div>
          <div className='flex flex-col gap-2 border rounded-md'><input value={amountToDeposit} onChange={(e) => setAmountToDeposit(Number(e.target.value))}/><div className="p-2 bg-yellow-300 cursor-pointer" onClick={() => depositCollateral()}>Deposit collateral</div></div>
          
          <div className='flex flex-col gap-2 border rounded-md'>
            <input value={amountToMint} onChange={(e) => setAmountToMint(Number(e.target.value))}/>
          <div className="p-2 bg-yellow-300 cursor-pointer" onClick={() => borrowTokens()}>Mint dCOP</div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Home
