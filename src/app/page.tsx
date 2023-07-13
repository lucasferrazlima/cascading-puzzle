import React from 'react';
import Providers from '../store/provider';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

export default function Home() {
  return (
    <Providers>
      <h1 >Game Board</h1>
      <ScoreBoard />
      <GameBoard />
    </Providers>
  );
}
