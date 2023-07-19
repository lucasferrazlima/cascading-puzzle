import React from 'react';
import Providers from '../store/provider';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

export default function Home() {
  return (
    <Providers>
      <ScoreBoard />
      <GameBoard />
    </Providers>
  );
}
