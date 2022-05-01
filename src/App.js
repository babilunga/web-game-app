import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import './styles/main.css';

import { useAuthState } from 'react-firebase-hooks/auth';

import Signin from './Components/Signin/Signin';
import ChatRoom from './Components/ChatRoom';
import Signout from './Components/Signout/Signout';
import React from 'react';
import Welcome from './Components/Welcome/Welcome';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyAdOD3eutFmJI9e_2Td7D0a6cVm9Njk_G8',
	authDomain: 'super-chat-2d30e.firebaseapp.com',
	projectId: 'super-chat-2d30e',
	storageBucket: 'super-chat-2d30e.appspot.com',
	messagingSenderId: '859848076796',
	appId: '1:859848076796:web:fddf4fefc8c30dbace5679',
});

const auth = getAuth(firebaseApp);

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='app'>
			<header>
				<Signout auth={auth} />
			</header>
			<Welcome />

			{
				<section>
					{user ? (
						<ChatRoom auth={auth} firebaseApp={firebaseApp} />
					) : (
						<Signin auth={auth} />
					)}
				</section>
			}
		</div>
	);
}

export default App;
