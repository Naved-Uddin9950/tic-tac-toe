import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import { useState } from 'react';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  
  const noData = JSON.stringify({player1 : { wins: 0 }, player2 : { wins: 0 } });
    
  const gameData = localStorage.getItem('react-tic-tac-toe-game-data') ?? noData;
  
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [data, setData] = useState(JSON.parse(gameData));

  return (
    <div className='w-full h-screen'>
      <PlayerProvider value={{currentPlayer, setCurrentPlayer, data, setData}}>
        <Header />
        <Board />
      </PlayerProvider>
    </div>
  )
}

export default App
