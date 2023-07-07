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
    selectedDots: Dot[];
}


    