"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Dot from './Dot';



const GameBoard = () => {
    const board = useSelector((state: RootState) => state.game.gameBoard);

    return (
        <div className='w-52 h-12 grid grid-cols-3 grid-rows-3'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((dot, colIndex) => (
                        <Dot key={`${rowIndex}-${colIndex}`} dot={dot} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameBoard;