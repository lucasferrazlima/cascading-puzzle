"use client"

import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";
import { Dot as DotType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateColor } from "../utils/generateColors";
import handleCascadingEffect from "../utils/cascadingEffect";
import refillBoard from "../utils/refillBoard";

const colors = ['red', 'green', 'yellow', 'purple', 'blue'];

const initialBoard: (DotType | null)[][] = [];

if (typeof window !== 'undefined') {
    for (let colIndex = 0; colIndex < 6; colIndex++) {
        const row: DotType[] = [];
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            const dot: DotType = {
                color: generateColor(colors),
                position: {
                    rowIndex,
                    colIndex,
                },
            };
            
            row.push(dot);
        }
        initialBoard.push(row);
    }
}

const initialState: GameState = {
    gameBoard: initialBoard,
    score: 0,
    isGameStarted: false,
    selectedDots: [],
};
    

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        startGame: (state) => {
            state.isGameStarted = true;
        },
        selectDot: (state, action: PayloadAction<DotType>) => {
            const dot: DotType = action.payload
            return {
                ...state,
                selectedDots: [...state.selectedDots, dot],
            };
        },
        resetSelectedDots: (state) => {
            return {
                ...state,
                selectedDots: [],
            };
        },
        resolveSelectedDots: (state, action: PayloadAction<DotType[]>) => {
            const eliminatedDots: DotType[] = action.payload;
            const addScore = eliminatedDots.length * 2;

            const newGameBoard: (DotType | null)[][] = state.gameBoard.map((row) => {
                return row.map((dot) => {
                  const eliminatedDot = eliminatedDots.find(
                    (eliminatedDot) =>
                        dot &&
                        eliminatedDot.position.rowIndex === dot.position.rowIndex &&
                        eliminatedDot.position.colIndex === dot.position.colIndex
                  );
                  return eliminatedDot ? null : dot;
                });
              });

            const updatedGameBoard = handleCascadingEffect(newGameBoard);

            const refilledGameboard = refillBoard(updatedGameBoard);


            return {
                ...state,
                gameBoard: refilledGameboard,
                score: state.score + addScore,
                selectedDots: [],
            };
        }   
    },
});

export const { actions, reducer } = gameSlice;
export default reducer;
