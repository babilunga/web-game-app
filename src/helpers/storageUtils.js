// User Name

export function setStorageUserName(username) {
	window.sessionStorage.setItem('MemeDrawUserName', username);
}

export function getStorageUserName() {
	return window.sessionStorage.getItem('MemeDrawUserName');
}

export function removeStorageUserName() {
	const name = getStorageUserName();
	window.sessionStorage.removeItem('MemeDrawUserName');
	return name;
}

// Lobby Id

export function setStorageLobbyId(lobbyId) {
	window.sessionStorage.setItem('MemeDrawLobbyId', lobbyId);
}

export function getStorageLobbyId() {
	return window.sessionStorage.getItem('MemeDrawLobbyId');
}

export function removeStorageLobbyId() {
	const id = getStorageLobbyId();
	window.sessionStorage.removeItem('MemeDrawLobbyId');
	return id;
}
