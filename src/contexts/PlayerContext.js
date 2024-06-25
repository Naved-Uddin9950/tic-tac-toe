import { createContext, useContext } from "react";


export const PlayerContext = createContext({
    currentPlayer: 'X',
    setCurrentPlayer: () => {},
    data: {},
    setData: () => {}
});

export const PlayerProvider = PlayerContext.Provider;

export default function usePlayer () {
    return useContext(PlayerContext);
}