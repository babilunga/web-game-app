/* eslint-disable react-hooks/exhaustive-deps */
import './styles/main.scss';
import React, { useState, useEffect } from 'react';

import HomePage from './Pages/Home/HomePage';
import GamePage from './Pages/Game/GamePage';

import { getStorageUserName, getStorageLobbyId } from './helpers/storageUtils';

export const RootContext = React.createContext();

function App() {
	const [nickname, setNickname] = useState(null);
	const [lobbyId, setLobbyId] = useState(null);

	useEffect(() => {
		const name = getStorageUserName();
		if (name) setNickname(name);

		const id = getStorageLobbyId();
		if (id) setLobbyId(id);
	}, []);

	return (
		<RootContext.Provider value={{ nickname, lobbyId }}>
			<div className='app'>
				<HomePage />
				<GamePage />
			</div>
		</RootContext.Provider>
	);
}

export default App;
