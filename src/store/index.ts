"use client"

import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export default store;