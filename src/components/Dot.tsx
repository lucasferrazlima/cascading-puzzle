import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { actions } from '../store/gameSlice';
import { Dot as DotType } from '../store/types';
import checkForSquare from '../utils/checkForSquare';
import { flatten } from 'lodash'

interface DotProps {
  dot: DotType | null;
}

const Dot = ({ dot }: DotProps) => {
  const dispatch = useDispatch();
  const selectedDots = useSelector((state: RootState) => state.game.selectedDots);
  const allDots = useSelector((state: RootState) => state.game.gameBoard);
  const lastDot = selectedDots[selectedDots.length - 1];
  const isGameOver = useSelector((state: RootState) => state.game.isGameOver);

  
  const handleMouseDown = () => {
    if (selectedDots.length === 0 && dot && !isGameOver) {
      dispatch(actions.selectDot(dot));
    }
  };

  const handleSelect = () => {
    if (
      selectedDots.length > 0 && 
      dot &&
      selectedDots.every((selectedDot) => selectedDot !== dot) && // Check if the dot is not already selected) 
      !isGameOver
      ) {
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

    if (checkForSquare(selectedDots)) {

      // get every dot of same color
      const dotsOfSameColor = flatten(allDots).filter((dot) => dot.color === lastDot.color);

      dispatch(actions.selectManyDots(dotsOfSameColor))
    }

    
  };

  const handleMouseUp = () => {
    if (selectedDots.length <= 1 && !isGameOver) {
      dispatch(actions.resetSelectedDots());
    } else {
      dispatch(actions.resolveSelectedDots(selectedDots));
      dispatch(actions.checkGameOver());
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
        dot?.color === '#8AB6D6' ? 
        'ring-2 ring-blue-300 ring-offset-4 ring-offset-background' : 
        dot?.color === '#A4D9B2' ? 
        'ring-2 ring-green-400 ring-offset-4 ring-offset-background' :
        dot?.color === '#E8B3C7' ? 
        'ring-2 ring-pink-300 ring-offset-4 ring-offset-background' :
        dot?.color === '#BFA9D6' ? 
        'ring-2 ring-purple-300 ring-offset-4 ring-offset-background' :
        dot?.color === '#FFC89E' ? 
        'ring-2 ring-orange-300 ring-offset-4 ring-offset-background' :
          ''
         : ''
      }`}
    >
    </div>
    </>
  );
};

export default Dot;
