import { useState } from 'react';
import './lobby.css';

// Components
import LobbyForm from './LobbyForm/LobbyForm';
import LobbyRoom from './LobbyRoom/LobbyRoom';
import ControlPanel from './ControlPanel/ControlPanel';

// utilities
import { createLobby, joinLobby } from '../../helpers/lobbyUtils';

function Lobby() {
	const [lobbyName, setLobbyName] = useState(null);
	const [lobbyId, setLobbyId] = useState(null);
	const [playerName, setPlayerName] = useState(null);
	const [isLobbyRoom, setIsLobbyRoom] = useState(false);

	function setStates({ enterRoom, title, id, name }) {
		setIsLobbyRoom(enterRoom);
		setLobbyName(title);
		setLobbyId(id);
		setPlayerName(name);
	}

	const createLobbyAsHost = async (title, host) => {
		try {
			await createLobby(title, host, setStates);
		} catch (error) {
			window.alert(error);
		}
	};

	const joinExistedLobby = async (roomId, name) => {
		try {
			await joinLobby(roomId, name, setStates);
		} catch (error) {
			window.alert(error);
		}
	};

	function resetState() {
		setLobbyName(null);
		setLobbyId(null);
		setIsLobbyRoom(false);
	}

	return (
		<div className='lobby_wrap table_wrap'>
			<ControlPanel
				lobbyId={lobbyId}
				playerName={playerName}
				resetState={resetState}
				isLobbyRoom={isLobbyRoom}
			/>
			{isLobbyRoom ? (
				<LobbyRoom lobbyId={lobbyId} lobbyName={lobbyName} />
			) : (
				<LobbyForm createLobbyAsHost={createLobbyAsHost} joinExistedLobby={joinExistedLobby} />
			)}
		</div>
	);
}

export default Lobby;
