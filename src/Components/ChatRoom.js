import {
	collection,
	addDoc,
	getFirestore,
	query,
	orderBy,
	limit,
} from 'firebase/firestore';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ auth, firebaseApp }) {
	const [messageValue, setMessageValue] = useState('');
	const app = firebaseApp;
	const db = getFirestore(app);
	const COLLECTION_NAME = 'super-messages';

	const queryMsg = query(
		collection(db, COLLECTION_NAME),
		orderBy('createdAt'),
		limit(10)
	);
	const [messages] = useCollectionData(queryMsg, { idField: 'id' });

	async function sendMessage(e) {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		await addDoc(collection(db, COLLECTION_NAME), {
			text: messageValue,
			createdAt: new Date(),
			uid,
			photoURL,
		});

		setMessageValue('');
	}

	return (
		<>
			<div className='chat_room'>
				{messages ? (
					messages.map((msg, i) => <ChatMessage key={i} message={msg} />)
				) : (
					<p>No messages yet...</p>
				)}
			</div>

			<form onSubmit={sendMessage}>
				<input
					type='text'
					placeholder='Type your message here...'
					value={messageValue}
					onChange={(e) => setMessageValue(e.target.value)}
				/>
				<button type='submit'>Send</button>
			</form>
		</>
	);
}

function ChatMessage(props) {
	const { text, createdAt, photoURL, uid } = props.message;
	const messageClass = uid === '1' ? 'message_sent' : 'message_received';

	return (
		<div className={`chat_message ${messageClass}`}>
			<img src={photoURL} alt='user' />
			<span className='chat_message_text'>{text}</span>
			<span className='chat_message_time'>
				{new Date(createdAt.seconds * 1000).toLocaleString()}
			</span>
		</div>
	);
}

export default ChatRoom;
