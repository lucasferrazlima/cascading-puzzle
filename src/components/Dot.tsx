import { Dot as DotType } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { actions } from '../store/gameSlice';

interface DotProps {
  dot: DotType;
}

const Dot = ({ dot }: DotProps) => {
  const dispatch = useDispatch();
  const selectedDots = useSelector((state: RootState) => state.game.selectedDots);
  const lastDot = selectedDots[selectedDots.length - 1];

  const handleMouseDown = () => {
    // initially any dot can be selected
    if (selectedDots.length === 0) {
      dispatch(actions.selectDot(dot));
      console.log(`Dot of row ${dot.position.rowIndex} and col ${dot.position.colIndex} clicked!`);
    }
  };

  const handleSelect = () => {
    if (selectedDots.length > 0) {
      if (lastDot.color === dot.color) {
        // if the dot is adjacent to the last dot, it can be selected
        const isAdjacent =
          (Math.abs(lastDot.position.rowIndex - dot.position.rowIndex) === 0 &&
            Math.abs(lastDot.position.colIndex - dot.position.colIndex) === 1) ||
          (Math.abs(lastDot.position.rowIndex - dot.position.rowIndex) === 1 &&
            Math.abs(lastDot.position.colIndex - dot.position.colIndex) === 0);

        // check if dot has not been already selected
        const isAlreadySelected = selectedDots.some(
          (selectedDot) =>
            selectedDot.position.rowIndex === dot.position.rowIndex &&
            selectedDot.position.colIndex === dot.position.colIndex
        );

        if (isAdjacent && !isAlreadySelected) {
          dispatch(actions.selectDot(dot));
          console.log(`Dot of row ${dot.position.rowIndex} and col ${dot.position.colIndex} clicked!`);
        }
      }
    }
  };

const handleMouseUp = () => {
    if (selectedDots.length <= 1) {
        // if only one dot is selected, reset the selected dots
        dispatch(actions.resetSelectedDots());
    } else {
        // if more than one dot is selected, clear the selected dots and account for score
        dispatch(actions.resolveSelectedDots(selectedDots));
    }
}

  return (
    <div
      style={{ backgroundColor: dot ? dot.color : 'transparent' }}
      onMouseDown={handleMouseDown}
      onMouseOver={handleSelect}
      onMouseUp={handleMouseUp}
    >
      dot
    </div>
  );
};

export default Dot;