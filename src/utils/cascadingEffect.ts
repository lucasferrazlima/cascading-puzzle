import { Dot as DotType } from "../store/types";

export default function handleCascadingEffect(gameBoard: (DotType | null)[][]): (DotType | null)[][] {
  // Iterate over each column
  for (let colIndex = 0; colIndex < gameBoard.length; colIndex++) {
    // Iterate over every dot from bottom to top
    for (let rowIndex = gameBoard[colIndex].length - 1; rowIndex >= 0; rowIndex--) {
      let dot = gameBoard[colIndex][rowIndex];

      // If the dot is empty, find the first non-empty dot above it
      if (!dot) {
        let x = 1;
        while (!dot && rowIndex - x >= 0) {
          if (gameBoard[colIndex][rowIndex - x]) {
            // Move the non-empty dot down
            gameBoard[colIndex][rowIndex] = gameBoard[colIndex][rowIndex - x];
            gameBoard[colIndex][rowIndex - x] = null;
            dot = gameBoard[colIndex][rowIndex];
          }
          x++;
        }
      }
    }
  }

  return gameBoard;
}
