"use client"

import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";
import { Dot as DotType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const colors = ['red', 'green', 'yellow', 'purple'];

const generateColor = (colors: string[]): string => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]

}

const initialBoard: DotType[][] = [];

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
        }
            
            
    },
});

export const { actions, reducer } = gameSlice;
export default reducer;
