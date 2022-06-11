import './lobby-room.css';
import { trackLobbyPlayers } from '../../../helpers/firebaseUtils.js';
import { useState, useEffect, useRef } from 'react';

function LobbyRoom({ lobbyId, lobbyName }) {
	const [players, setPlayers] = useState([]);
	const unsubscribe = useRef(null);
	const getReadyPlayers = () => players.filter(({ isReadyToPlay }) => isReadyToPlay);
	const isAbleToStartGame = () => getReadyPlayers().length === players.length;

	useEffect(() => {
		async function trackPlayers() {
			try {
				const unsub = await trackLobbyPlayers(lobbyId, setPlayers);
				if (unsub !== null) {
					unsubscribe.current = unsub;
				}
			} catch (error) {
				setPlayers([]);
				console.error(error);
			}
		}
		trackPlayers();
	}, [lobbyId]);

	return (
		<div>
			<h2>{'{ Lobby Room }'}</h2>
			<div className='lobby_room_info'>
				<p>
					Lobby name: <span>{lobbyName}</span>
				</p>
				<p>
					Invite code:{' '}
					<span onClick={() => window.navigator.clipboard.writeText(lobbyId)}>{lobbyId}</span>
				</p>
			</div>
			<div className='lobby_room_players'>
				<h3>{'{ Players online }'}</h3>
				{players.length > 0 && <LobbyRoomPlayers players={players} />}
			</div>
			<div className='lobby_room_start_game'>
				<button disabled={!isAbleToStartGame()} onClick={() => {}} className='start_game_button'>
					Start game 🚀
				</button>
				<p className='lobby_room_ready_players'>
					{getReadyPlayers().length + '/' + players.length} players are ready
				</p>
			</div>
		</div>
	);
}

function LobbyRoomPlayers({ players }) {
	return players.map(({ name, isHost, isReadyToPlay }, index) => (
		<p key={index} className='lobby_room_player'>
			<span className='lobby_room_player_name'>
				{isHost && <span>👑</span>}
				{name}
			</span>
			<span className='lobby_room_player_status'>{isReadyToPlay ? '✅' : '🙈'}</span>
		</p>
	));
}

export default LobbyRoom;
