import React from 'react';
import Providers from '../store/provider';
import GameBoard from '../components/GameBoard';
import GameConditions from '../components/GameConditions';
import Image from 'next/image'
import logo from '../../public/logo.png'


export default function Home() {
  return (
    <Providers>
      <div className='flex flex-col h-screen w-[500px] mx-auto  self-center justify-center'>
        <Image src={logo} alt="logo" width={200} height={20} className='mx-auto mb-2'/>
        <GameConditions />
        <GameBoard />
      </div>
    </Providers>
  );
}
