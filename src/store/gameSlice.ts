"use client"

import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";
import { Dot as DotType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: GameState = {
    gameBoard: [
        [{ color: 'red', position: { rowIndex: 0, colIndex: 0 } }, { color: 'blue', position: { rowIndex: 0, colIndex: 1 } }, { color: 'green', position: { rowIndex: 0, colIndex: 2 } }],
        [{ color: 'yellow', position: { rowIndex: 1, colIndex: 0 } }, { color: 'purple', position: { rowIndex: 1, colIndex: 1 } }, { color: 'orange', position: { rowIndex: 1, colIndex: 2 } }],
        [{ color: 'pink', position: { rowIndex: 2, colIndex: 0 } }, { color: 'teal', position: { rowIndex: 2, colIndex: 1 } }, { color: 'brown', position: { rowIndex: 2, colIndex: 2 } }],
      ],
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
        }
            
            
    },
});

export const { actions, reducer } = gameSlice;
export default reducer;
