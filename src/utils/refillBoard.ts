import { Dot as DotType } from "../store/types";
import { generateColor } from "./generateColors";

const colors = ['red', 'green', 'yellow', 'purple', 'blue'];

export default function refillBoard(gameBoard: (DotType | null)[][]): (DotType | null)[][] {
  const columnsCount = gameBoard.length;

  // Iterate over each column
  for (let colIndex = 0; colIndex < columnsCount; colIndex++) {
    const column = gameBoard[colIndex];
    const dotsCount = column.length;

    // Iterate over each dot in the column
    for (let rowIndex = 0; rowIndex < dotsCount; rowIndex++) {

      // If the dot is empty, generate a new one  
      if (column[rowIndex] === null) {
        const dot: DotType = {
          color: generateColor(colors),
          position: {
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
        };

        column[rowIndex] = dot;
      }
    }
  }

  return gameBoard;
}