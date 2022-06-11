import { createLobbyRoom, addPlayerToLobby } from './firebaseUtils';

export async function createLobby(title, host, setStates) {
	try {
		const id = await createLobbyRoom(title, host);
		if (id === null) {
			const error = 'Attempt to create lobby failed';
			throw error;
		}
		setStates({ enterRoom: true, title, id, name: host });
		return id;
	} catch (error) {
		setStates({ enterRoom: false, title: null, id: null, name: null });
		throw Error('Attempt to create lobby failed:', error);
	}
}

export async function joinLobby(id, name, setStates) {
	try {
		if (!id.length || !name.length) {
			const error = 'Both Nickname and Invite_code are required';
			throw error;
		}

		const player = { name, isHost: false, isReadyToPlay: false };

		const { title, error } = await addPlayerToLobby(id, player);

		if (error) {
			throw error;
		}

		setStates({ enterRoom: true, title, id, name });
	} catch (error) {
		setStates({ enterRoom: false, title: null, id: null, name: null });
		throw Error(error);
	}
}
