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
      className={`w-6 h-6 rounded-full m-2 hover:opacity-75 transition duration-150 ease-in-out hover:shadow-lg hover:scale-110 ${
        selectedDots.some((selectedDot) => selectedDot === dot) ? 'opacity-50' : ''
      }`}
    >
    </div>
    </>
  );
};

export default Dot;
