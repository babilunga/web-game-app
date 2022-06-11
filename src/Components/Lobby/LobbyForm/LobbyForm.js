import './lobby-form.css';
import CreateLobby from './CreateLobby';
import JoinLobby from './JoinLobby';
import { useState } from 'react';

function LobbyForm({ createLobbyAsHost, joinExistedLobby }) {
	const [focus, setFocus] = useState('');

	function joinLobby(lobbyId, nickname) {
		joinExistedLobby(lobbyId, nickname);
	}

	function createLobby(lobbyTitle, nickname) {
		createLobbyAsHost(lobbyTitle, nickname);
	}

	return (
		<>
			<CreateLobby focus={focus} setFocus={setFocus} btnHandler={createLobby} />
			<JoinLobby focus={focus} setFocus={setFocus} btnHandler={joinLobby} />
		</>
	);
}

export default LobbyForm;
