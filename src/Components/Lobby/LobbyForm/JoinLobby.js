import InputCustom from '../../UI/InputCustom/InputCustom';
import ButtonCustom from '../../UI/ButtonCustom/ButtonCustom';
import React, { useState, useId, useContext } from 'react';
import { HomePageContext } from '../../../Pages/Home/HomePage';

function JoinLobby({ focus, setFocus, btnHandler }) {
	const [nickname, setNickname] = useState('');
	const [lobbyId, setLobbyId] = useState('');

	const { language } = useContext(HomePageContext);
	const lang = language === 'en';
	const input1Id = useId();
	const input2Id = useId();

	function joinLobbyHandle() {
		btnHandler(lobbyId, nickname);
	}

	return (
		<div>
			<div className='lobby_form'>
				<InputCustom
					paste
					title={lang ? 'Nickname' : 'Прзвисько'}
					id={input1Id}
					value={nickname}
					setCharacter={setNickname}
					focus={focus}
					setFocus={setFocus}
				/>
				<InputCustom
					title={lang ? 'Invite code' : 'Код запрошення'}
					id={input2Id}
					value={lobbyId}
					setCharacter={setLobbyId}
					focus={focus}
					setFocus={setFocus}
					paste
				/>
				<ButtonCustom onClickFn={joinLobbyHandle} size={24} style={{ margin: '0 auto' }}>
					{`${lang ? 'Join lobby' : 'Зайти в лобівку'} 🍫`}
				</ButtonCustom>
			</div>
		</div>
	);
}

export default JoinLobby;
