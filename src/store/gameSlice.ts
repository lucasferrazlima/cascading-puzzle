"use client"

import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";
import { Dot as DotType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateColor } from "../utils/generateColors";
import handleCascadingEffect from "../utils/cascadingEffect";
import refillBoard from "../utils/refillBoard";

const colors = [
    '#8AB6D6', // Pastel Blue
    '#A4D9B2', // Pastel Green
    '#E8B3C7', // Pastel Pink
    '#BFA9D6', // Pastel Purple
    '#FFC89E', // Pastel Orange
  ];
  
const initialBoard: (DotType | null)[][] = [];

if (typeof window !== 'undefined') {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
        const row: DotType[] = [];
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
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

// Let's define possible combinations of parameters for ending the game
const predefinedEndGameParams = [
    { rounds: 10, blueDots: 20, greenDots: 0, pinkDots: 20, purpleDots: 0, orangeDots: 0 },
    { rounds: 10, blueDots: 0, greenDots: 20, pinkDots: 0, purpleDots: 20, orangeDots: 0 },
    { rounds: 12, blueDots: 15, greenDots: 10, pinkDots: 5, purpleDots: 8, orangeDots: 12 },
    { rounds: 8, blueDots: 10, greenDots: 15, pinkDots: 10, purpleDots: 0, orangeDots: 0 },
    { rounds: 10, blueDots: 8, greenDots: 8, pinkDots: 16, purpleDots: 8, orangeDots: 8 },
    { rounds: 15, blueDots: 10, greenDots: 10, pinkDots: 10, purpleDots: 10, orangeDots: 10 },
    { rounds: 12, blueDots: 12, greenDots: 12, pinkDots: 12, purpleDots: 12, orangeDots: 12 },
    { rounds: 10, blueDots: 5, greenDots: 5, pinkDots: 5, purpleDots: 5, orangeDots: 30 },
    { rounds: 12, blueDots: 8, greenDots: 10, pinkDots: 12, purpleDots: 14, orangeDots: 10 },
    { rounds: 10, blueDots: 18, greenDots: 10, pinkDots: 12, purpleDots: 14, orangeDots: 8 },
    { rounds: 8, blueDots: 0, greenDots: 20, pinkDots: 20, purpleDots: 0, orangeDots: 0 },
    { rounds: 10, blueDots: 12, greenDots: 12, pinkDots: 12, purpleDots: 12, orangeDots: 15 },
    { rounds: 12, blueDots: 8, greenDots: 10, pinkDots: 8, purpleDots: 16, orangeDots: 12 },
    { rounds: 10, blueDots: 13, greenDots: 8, pinkDots: 15, purpleDots: 5, orangeDots: 10 },
    { rounds: 8, blueDots: 12, greenDots: 18, pinkDots: 10, purpleDots: 0, orangeDots: 10 },
    { rounds: 12, blueDots: 10, greenDots: 10, pinkDots: 10, purpleDots: 10, orangeDots: 10 },
    { rounds: 10, blueDots: 16, greenDots: 8, pinkDots: 8, purpleDots: 8, orangeDots: 8 },
    { rounds: 15, blueDots: 20, greenDots: 0, pinkDots: 10, purpleDots: 10, orangeDots: 30 },
    { rounds: 10, blueDots: 16, greenDots: 0, pinkDots: 16, purpleDots: 8, orangeDots: 8 },
    { rounds: 10, blueDots: 5, greenDots: 10, pinkDots: 0, purpleDots: 5, orangeDots: 30 },
    { rounds: 12, blueDots: 8, greenDots: 10, pinkDots: 12, purpleDots: 14, orangeDots: 8 },
    { rounds: 12, blueDots: 18, greenDots: 16, pinkDots: 12, purpleDots: 14, orangeDots: 10 },
    { rounds: 8, blueDots: 0, greenDots: 20, pinkDots: 0, purpleDots: 20, orangeDots: 0 },
    { rounds: 10, blueDots: 12, greenDots: 12, pinkDots: 12, purpleDots: 12, orangeDots: 10 },
    { rounds: 12, blueDots: 8, greenDots: 8, pinkDots: 8, purpleDots: 16, orangeDots: 12 },
    { rounds: 10, blueDots: 15, greenDots: 5, pinkDots: 15, purpleDots: 5, orangeDots: 10 },
    { rounds: 8, blueDots: 10, greenDots: 20, pinkDots: 10, purpleDots: 0, orangeDots: 10 },
    { rounds: 12, blueDots: 12, greenDots: 10, pinkDots: 12, purpleDots: 10, orangeDots: 6 },
    { rounds: 10, blueDots: 8, greenDots: 8, pinkDots: 8, purpleDots: 8, orangeDots: 16 },
    { rounds: 12, blueDots: 15, greenDots: 10, pinkDots: 15, purpleDots: 5, orangeDots: 0 },
  ];


const getRandomEndGameParams = () => {
    const randomIndex = Math.floor(Math.random() * predefinedEndGameParams.length);
    return predefinedEndGameParams[randomIndex];
};  

const initialState: GameState = {
    gameBoard: initialBoard,
    score: 0,
    isGameStarted: false,
    isGameOver: false,
    selectedDots: [],
    endGameParams: getRandomEndGameParams(),
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
        selectManyDots: (state, action: PayloadAction<DotType[]>) => {
            const dots: DotType[] = action.payload;
            return {
                ...state,
                selectedDots: [...state.selectedDots, ...dots],
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
            
            const eliminatedDotsColor = eliminatedDots[0].color;

            const colorKeyMap = {
                '#8AB6D6': 'blueDots',
                '#A4D9B2': 'greenDots',
                '#E8B3C7': 'pinkDots',
                '#BFA9D6': 'purpleDots',
                '#FFC89E': 'orangeDots',
            };

            const colorKey = colorKeyMap[eliminatedDotsColor];


            const addScore = (eliminatedDots: DotType[]): number => {
                const arrayLength = eliminatedDots.length;

                if (arrayLength <= 4) {
                    return arrayLength * 2;
                } else if (arrayLength <= 10) {
                    return arrayLength * 4;
                } else {
                    return arrayLength * 10;
                }
            };


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
                score: state.score + addScore(eliminatedDots),
                selectedDots: [],
                endGameParams: {
                    ...state.endGameParams,
                    [colorKey]: state.endGameParams[colorKey] - eliminatedDots.length,
                    rounds: state.endGameParams.rounds - 1,
                },
            };
        },
        checkGameOver: (state) => {
            
            if (state.endGameParams.rounds <= 0) {
                return {
                    ...state,
                    isGameOver: true,
                };
            } else {
                if (state.endGameParams.blueDots <= 0 && state.endGameParams.greenDots <= 0 && state.endGameParams.pinkDots <= 0 && state.endGameParams.purpleDots <= 0 && state.endGameParams.orangeDots <= 0) {
                    return {
                        ...state,
                        isGameOver: true,
                    };
                }
            }
        },
    },
});



export const { actions, reducer } = gameSlice;
export default reducer;
