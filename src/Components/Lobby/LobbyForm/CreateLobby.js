import InputCustom from '../../UI/InputCustom/InputCustom';
import ButtonCustom from '../../UI/ButtonCustom/ButtonCustom';
import React, { useState, useId, useContext } from 'react';
import { HomePageContext } from '../../../Pages/Home/HomePage';

function CreateLobbyForm({ focus, setFocus, btnHandler }) {
	const [nickname, setNickname] = useState('');
	const [lobbyTitle, setLobbyTitle] = useState('');

	const { language } = useContext(HomePageContext);
	const lang = language === 'en';
	const input1Id = useId();
	const input2Id = useId();

	function createLobbyHandle() {
		btnHandler(lobbyTitle, nickname);
	}

	return (
		<div>
			<div className='lobby_form'>
				<InputCustom
					paste
					title={lang ? 'Nickname' : 'Прiзвисько'}
					id={input1Id}
					value={nickname}
					setCharacter={setNickname}
					focus={focus}
					setFocus={setFocus}
				/>
				<InputCustom
					paste
					title={lang ? 'Lobby title' : 'Назва лобівки'}
					id={input2Id}
					value={lobbyTitle}
					setCharacter={setLobbyTitle}
					focus={focus}
					setFocus={setFocus}
				/>
				<ButtonCustom onClickFn={createLobbyHandle} size={24} style={{ margin: '0 auto' }}>
					{`${lang ? 'Create lobby' : 'Створити лобівку'} 🎂`}
				</ButtonCustom>
			</div>
		</div>
	);
}

export default CreateLobbyForm;
