import produce from "immer";
import { Dot as DotType } from "../store/types";

export default function handleCascadingEffect(gameBoard: (DotType | null)[][]): (DotType | null)[][] {
  
    return produce(gameBoard, (draft) => {
        const columnsCount = draft.length;

        // Iterate over each column
        for (let colIndex = 0; colIndex < columnsCount; colIndex++) {
        const column = draft[colIndex];
        const dotsCount = column.length;

        // Iterate over every dot from bottom to top
        for (let rowIndex = dotsCount - 1; rowIndex >= 0; rowIndex--) {
            let dot = column[rowIndex];

            // If the dot is empty, find the first non-empty dot above it
            if (!dot) {
                let x = 1;
                while (!dot && rowIndex - x >= 0) {
                    if (column[rowIndex - x]) {
                    const nonEmptyDot = column[rowIndex - x];

                    // Move the non-empty dot down
                    column[rowIndex] = nonEmptyDot;
                    column[rowIndex - x] = null;
                    dot = nonEmptyDot;

                    // Update the position of the dot
                    if (dot) {
                        dot.position = {
                            rowIndex,
                            colIndex,
                        };
                    }
                    }
                    x++;
                }
            }
        }
        }
    });
}
