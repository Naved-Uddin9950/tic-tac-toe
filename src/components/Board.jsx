import React, { useEffect, useState } from 'react';
import x from '/x.svg';
import o from '/o.svg';
import usePlayer from '../contexts/PlayerContext';

function Board() {
    const [box, setBox] = useState(Array(9).fill(0));
    const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const { currentPlayer, setCurrentPlayer, data, setData } = usePlayer();

    const fillBox = (index) => {
        if (box[index] !== 0) return;

        const arr = box.slice();
        arr[index] = {
            sign: currentPlayer === 'X' ? x : o,
            tag: currentPlayer,
            player: currentPlayer === 'X' ? 1 : 2
        };

        setBox(arr);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const gameOver = () => {
        setBox(Array(9).fill(0));
        setCurrentPlayer('X');
    }

    useEffect(() => {
        let winner = null;

        for (const combo of combinations) {
            const [a, b, c] = combo;
            if (box[a] && box[a].player === box[b].player && box[a].player === box[c].player) {
                winner = box[a].player;
                break;
            }
        }

        if (winner) {
            alert(`Player ${winner} wins`);
            const newData = {
                ...data,
                [`player${winner}`]: {
                    ...data[`player${winner}`],
                    wins: data[`player${winner}`].wins + 1
                }
            };
            setTimeout(() => {
                gameOver();
                setData(newData);
            }, 1000);
        } else if (box.every(item => item !== 0)) {
            alert("It's a tie!");
            setTimeout(gameOver, 1000);
        }
    }, [box, combinations, data, setData]);

    useEffect(() => {
        localStorage.setItem('react-tic-tac-toe-game-data', JSON.stringify(data));
    }, [data]);

    return (
        <div className='w-full h-3/4 flex flex-row justify-center mt-12'>
            <div className='w-4/5 h-full grid grid-rows-3 grid-cols-3 border'>
                {
                    box.map((item, index) => (
                        <div className='border cursor-pointer' onClick={() => fillBox(index)} key={index}>
                            {item !== 0 && (
                                <img
                                    src={item.sign}
                                    alt={item.tag}
                                    className='w-full h-full'
                                />
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Board;
