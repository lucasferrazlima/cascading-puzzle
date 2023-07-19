"use client"

export interface Dot {
    color: string;
    position: {
        rowIndex: number;
        colIndex: number;
    };
}

export interface GameState {
    gameBoard: (Dot | null)[][];
    score: number;
    isGameStarted: boolean;
    isGameOver: boolean;
    selectedDots: Dot[];
    endGameParams: {
        rounds: number;
        blueDots: number;
        greenDots: number;
        pinkDots: number;
        purpleDots: number;
        orangeDots: number;
    };
}


    