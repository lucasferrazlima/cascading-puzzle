"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Dot from './Dot';



const GameBoard = () => {
    const board = useSelector((state: RootState) => state.game.gameBoard);

    return (
        <div className='w-96 h-40 grid grid-cols-6 grid-rows-6'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((dot, colIndex) => (
                        <Dot key={`${rowIndex}-${colIndex}`} dot={dot}  />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameBoard;