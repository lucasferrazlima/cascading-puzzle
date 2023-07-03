import { createSlice } from "@reduxjs/toolkit";

interface Dot {
    color: string;
    position: {
        x: number;
        y: number;
    };
}

interface GameState {
    gameBoard: Dot[][];
    score: number;
    isGameStarted: boolean;
}

const initialState: GameState = {
    gameBoard: [],
    score: 0,
    isGameStarted: false,
};
    

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        // ...
    },
});

export const { actions, reducer } = gameSlice;
export default reducer;
