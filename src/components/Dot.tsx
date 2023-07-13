import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { actions } from '../store/gameSlice';
import { Dot as DotType } from '../store/types';

interface DotProps {
  dot: DotType | null;
}

const Dot = ({ dot }: DotProps) => {
  const dispatch = useDispatch();
  const selectedDots = useSelector((state: RootState) => state.game.selectedDots);
  const lastDot = selectedDots[selectedDots.length - 1];

  const handleMouseDown = () => {
    if (selectedDots.length === 0 && dot) {
      dispatch(actions.selectDot(dot));
    }
  };

  const handleSelect = () => {
    if (selectedDots.length > 0 && dot) {
      if (
        lastDot.color === dot.color &&
        ((Math.abs(lastDot.position.rowIndex - dot.position.rowIndex) === 0 &&
          Math.abs(lastDot.position.colIndex - dot.position.colIndex) === 1) ||
          (Math.abs(lastDot.position.rowIndex - dot.position.rowIndex) === 1 &&
            Math.abs(lastDot.position.colIndex - dot.position.colIndex) === 0))
      ) {
        dispatch(actions.selectDot(dot));
      }
    }
  };

  const handleMouseUp = () => {
    if (selectedDots.length <= 1) {
      dispatch(actions.resetSelectedDots());
    } else {
      dispatch(actions.resolveSelectedDots(selectedDots));
    }
  };

  return (
    <>
      <div
      style={{ backgroundColor: dot ? dot.color : 'transparent' }}
      onMouseDown={handleMouseDown}
      onMouseOver={handleSelect}
      onMouseUp={handleMouseUp}
      className={`w-6 h-6 my-4 rounded-full hover:opacity-75 transition duration-150 ease-in-out hover:shadow-lg hover:scale-110 ${
        selectedDots.some((selectedDot) => selectedDot === dot) ? 
          dot?.color === '#acd8aa' ? 
          'ring-2 ring-lime-400 ring-offset-4 ring-offset-gray-400' : 
          dot?.color === '#ffadad' ? 
          'ring-2 ring-red-300 ring-offset-4 ring-offset-gray-400' :
          dot?.color === '#fdffb6' ? 
          'ring-2 ring-yellow-200 ring-offset-4 ring-offset-gray-400' :
          dot?.color === '#bdb2ff' ? 
          'ring-2 ring-violet-300 ring-offset-4 ring-offset-gray-400' :
          dot?.color === '#a0c4ff' ? 
          'ring-2 ring-blue-300 ring-offset-4 ring-offset-gray-400' :
          ''
         : ''
      }`}
    >
    </div>
    </>
  );
};

export default Dot;
