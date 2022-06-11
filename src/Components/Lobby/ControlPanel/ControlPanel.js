import './control-panel.css';
import { useState, useEffect } from 'react';
import { removeStorageUserName, removeStorageLobbyId } from '../../../helpers/storageUtils';
import { removePlayerFromLobby } from '../../../helpers/firebaseUtils';

function ControlPanel({ resetState, isLobbyRoom, lobbyId, playerName }) {
	const [isLobby, setIsLobby] = useState(false);

	useEffect(() => {
		setIsLobby(isLobbyRoom);
	}, [isLobbyRoom]);

	async function leaveLobby() {
		try {
			const confirmation = window.confirm('Are you sure you want to leave the lobby?');
			if (!confirmation) return;

			await removePlayerFromLobby(lobbyId, playerName);

			removeStorageUserName();
			removeStorageLobbyId();
			resetState();
		} catch (error) {
			window.alert('Error leaving lobby...', error);
		}
	}

	function xBtnHandler() {
		window.alert('Wtf dude...?');
	}

	return (
		<section className='lobby_control_panel'>
			<button onClick={isLobby ? leaveLobby : xBtnHandler}>{isLobby ? '⇦' : '✕'}</button>
		</section>
	);
}

export default ControlPanel;
