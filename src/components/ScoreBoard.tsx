"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ScoreBoard = () => {

    const score = useSelector((state: RootState) => state.game.score);
        

    return (
        <div >
            {score}
        </div>
    )
}

export default ScoreBoard