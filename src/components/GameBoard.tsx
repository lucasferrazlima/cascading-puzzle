"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Dot from './Dot';

const GameBoard = () => {
  const board = useSelector((state: RootState) => state.game.gameBoard);

  return (
    <div className='flex flex-col'>
      <div className='w-[500px] h-[500px] -my-2 grid grid-cols-8 grid-rows-8 justify-items-center content-center bg-background rounded-b-3xl'>
        {board.map((col, colIndex) => (
          // wrapper needed to place dots inside grid cells
          <React.Fragment key={colIndex}>
            {board.map((row, rowIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="flex items-center justify-center">
                <Dot dot={row[colIndex]} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <span className='text-sm mt-5 mx-auto text-gray-500'>
        Hint: Form a square of 4 dots to eliminate all other dots of the same color
      </span>
    </div>

  );
};

export default GameBoard;
