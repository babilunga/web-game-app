import {
	getFirestore,
	collection,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	onSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

// TODO: make a function for changing/adding host player

export async function createLobbyRoom(title, host) {
	try {
		const hostPlayerObject = {
			name: host,
			isHost: true,
			isReadyToPlay: true,
		};

		const docRef = await addDoc(collection(db, 'rooms'), {
			lobbyName: title,
			players: [hostPlayerObject],
			isGameStarted: false,
			currentRound: 0,
			rounds: [],
			maxRounds: 3,
		});
		const { id } = docRef;

		return id;
	} catch (e) {
		console.error('Error adding document: ', e);
		return null;
	}
}

export async function addPlayerToLobby(lobbyId, player) {
	try {
		const ref = doc(db, 'rooms', lobbyId);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists()) return false;

		const { players } = docSnap.data();
		if (players.filter(p => p.name === player.name).length > 0) {
			return { error: 'Player with that name "' + player.name + '" already exists' };
		}

		await updateDoc(ref, {
			players: arrayUnion(player),
		});
		return { title: docSnap.data().lobbyName };
	} catch (e) {
		return { title: '', error: e };
	}
}

export async function removePlayerFromLobby(lobbyId, playerName) {
	try {
		const ref = doc(db, 'rooms', lobbyId);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists()) return false;

		const { players } = await docSnap.data();
		const player = players.filter(p => p.name === playerName)[0];

		await updateDoc(ref, {
			players: arrayRemove(player),
		});

		if (player.isHost === true) {
			changeLobbyHost(lobbyId);
		}
	} catch (e) {
		console.log("Error removing player's document: " + e);
	}
}

export async function getLobbyPlayers(lobbyId) {
	try {
		const docRef = doc(db, 'rooms', lobbyId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return Promise.resolve(docSnap.data().players);
		} else {
			return Promise.reject('Lobby does not exist');
		}
	} catch (e) {
		return Promise.reject('Error getting document: ' + e);
	}
}

export async function trackLobbyPlayers(lobbyId, callback) {
	return onSnapshot(doc(db, 'rooms', lobbyId), async doc => {
		if (doc.exists()) {
			const { players } = await doc.data();
			callback(players);
		} else {
			console.log(`Lobby does not exist: ${lobbyId}`);
		}
	});

	// 	const unsub = onSnapshot(doc(db, 'rooms', lobbyId), async snapshot => {
	// 		if (snapshot.exists()) {
	// 			const players = await snapshot.data().players;
	// 			callback(players);
	// 		} else {
	// 			console.log('Lobby does not exist');
	// 		}

	// 		return unsub;
	// 	});
}
async function changeLobbyHost(lobbyId) {
	try {
		const ref = doc(db, 'rooms', lobbyId);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists()) return false;
		const player = await docSnap.data().players[0];

		await updateDoc(ref, {
			players: arrayRemove(player),
		});

		const newHost = {
			...player,
			isHost: true,
			isReadyToPlay: true,
		};

		await updateDoc(ref, {
			players: arrayUnion(newHost),
		});
	} catch (error) {
		throw Error('Error changing lobby host: ' + error);
	}
}
