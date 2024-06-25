import React from 'react';
import usePlayer from '../contexts/PlayerContext';

function Header() {

    const { currentPlayer, data } = usePlayer();

    return (
        <div className='flex flex-row justify-around gap-6 py-2 items-center bg-blue-800 w-full h-max text-white font-bold'>
            <div className='grid grid-cols-1'>
                <div>Player 1</div>
                <div>Wins : {data.player1.wins}</div>
            </div>

            <div className='h-100 flex flex-row justify-center items-center'>
                <div>Move : {currentPlayer === 'X' ? 'Player 1 ( X )' : 'Player 2 ( O )'}</div>
            </div>

            <div className='grid grid-cols-1'>
                <div>Player 2</div>
                <div>Wins : {data.player2.wins}</div>
            </div>
        </div>
    )
}

export default Header