"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import '@fontsource/poppins';

const GameConditions = () => {

    const endGameParams = useSelector((state: RootState) => state.game.
    endGameParams);
        
    if (typeof window === 'undefined') return null

    return (
        <div className='flex z-10 h-16 font-poppins bg-primary rounded-t-3xl'>
            <div className='flex flex-col w-1/6 text-black justify-center bg-primary rounded-tl-3xl  '>
                <span className='self-center text-sm'>
                    Rounds
                </span>
                <div className='self-center'>
                    {endGameParams.rounds}
                </div>

            </div>

            <div className='flex flex-1 text-black bg-secondary justify-evenly rounded-3xl h-4/5 self-center'>
                {endGameParams.blueDots > 0 && 
                <div className='flex flex-col self-center '>
                    <div 
                        style={{backgroundColor: '#8AB6D6'}}
                        className={`w-5 h-5 rounded-full self-center`} >
                    </div>
                    <span className='self-center'>
                        {endGameParams.blueDots}
                    </span>
                </div>
                }
                {endGameParams.greenDots > 0 &&
                <div className='flex flex-col self-center '>
                    <div 
                        style={{backgroundColor: '#A4D9B2'}}
                        className={`w-5 h-5 rounded-full self-center`} >
                    </div>
                    <span className='self-center'>
                        {endGameParams.greenDots}
                    </span>
                </div>
                }
                { endGameParams.pinkDots > 0 &&
                <div className='flex flex-col self-center '>
                    <div 
                        style={{backgroundColor: '#E8B3C7'}}
                        className={`w-5 h-5 rounded-full self-center`} >
                    </div>
                    <span className='self-center'>
                        {endGameParams.pinkDots}
                    </span>
                </div>
                }
                { endGameParams.purpleDots > 0 &&
                <div className='flex flex-col self-center '>
                    <div 
                        style={{backgroundColor: '#BFA9D6'}}
                        className={`w-5 h-5 rounded-full self-center`} >
                    </div>
                    <span className='self-center'>
                        {endGameParams.purpleDots}
                    </span>
                </div>
                }
                { endGameParams.orangeDots > 0 &&
                <div className='flex flex-col self-center '>
                    <div 
                        style={{backgroundColor: '#FFC89E'}}
                        className={`w-5 h-5 rounded-full self-center`} >
                    </div>
                    <span className='self-center'>
                        {endGameParams.orangeDots}
                    </span>
                </div>
                }
            </div>
            <div className='flex w-1/6 text-black justify-center bg-primary rounded-tr-3xl '>
                <RestartAltIcon className='self-center hover:cursor-pointer hover:animate-pulse' style={{ fontSize: '2rem' }}/>
            </div>
        </div>
    )
}

export default GameConditions