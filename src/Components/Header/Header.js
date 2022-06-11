import './header.css';
import { useState, useEffect, useContext, useCallback } from 'react';
import { HomePageContext } from '../../Pages/Home/HomePage';

function Header() {
	const [langIcon, setLangIcon] = useState('🇬🇧');
	const [showMenu, setShowMenu] = useState(false);
	const { language, setLanguage } = useContext(HomePageContext);

	const hideLanguageMenu = useCallback(e => {
		if (e.target.getAttribute('lang-switcher') !== 'true') setShowMenu(false);
	}, []);

	useEffect(() => {
		function toggleListener(state) {
			switch (state) {
				case 'add':
					document.addEventListener('click', hideLanguageMenu);
					break;
				case 'remove':
					document.removeEventListener('click', hideLanguageMenu);
					break;
				default:
					console.error('Unknown state, choose either "add" or "remove"');
					break;
			}
		}

		if (showMenu) toggleListener('add');
		else {
			toggleListener('remove');
		}
		return () => toggleListener('remove');
	}, [showMenu, hideLanguageMenu]);

	useEffect(() => {
		switch (language) {
			case 'en':
				setLangIcon('🇬🇧');
				break;
			case 'ua':
				setLangIcon('🇺🇦');
				break;
			default:
				setLangIcon('🇬🇧');
				break;
		}
	}, [language]);

	return (
		<header>
			<div>
				<button lang-switcher='true' onClick={() => setShowMenu(true)} className='header_language'>
					{langIcon}
				</button>
				{showMenu && (
					<form className='language_menu'>
						<div>
							<input
								lang-switcher='true'
								onInput={e => {
									setLanguage('en');
								}}
								type='radio'
								id='eng'
								value='Eng'
								name='language'
								defaultChecked
							/>
							<label lang-switcher='true' className='language_option' htmlFor='eng'>
								Eng
							</label>
						</div>
						<div>
							<input
								lang-switcher='true'
								onInput={e => {
									setLanguage('ua');
								}}
								type='radio'
								id='ukr'
								value='CSS'
								name='language'
							/>
							<label lang-switcher='true' className='language_option' htmlFor='ukr'>
								Ukr
							</label>
						</div>
					</form>
				)}
			</div>
		</header>
	);
}

export default Header;
