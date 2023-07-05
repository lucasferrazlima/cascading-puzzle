"use client"

export interface Dot {
    color: string;
    position: {
        rowIndex: number;
        colIndex: number;
    };
}

export interface GameState {
    gameBoard: Dot[][];
    score: number;
    isGameStarted: boolean;
    selectedDots: Dot[];
}


    