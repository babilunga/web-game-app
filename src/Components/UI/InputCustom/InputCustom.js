/* eslint-disable react-hooks/exhaustive-deps */
import './input-custom.css';
import { useRef, useEffect, useContext } from 'react';
import { HomePageContext } from '../../../Pages/Home/HomePage';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import PropTypes from 'prop-types';

function CustomInput({ title, value, id, setCharacter, focus, setFocus, paste }) {
	const fieldRef = useRef(null);
	const CHAR_LIMIT = 18;
	const { language } = useContext(HomePageContext);

	async function pasteHandle(e) {
		e.preventDefault();
		setFocus(id);
		const text = await window.navigator.clipboard.readText();
		setCharacter(prev => {
			if (prev.length >= CHAR_LIMIT) {
				window.alert('Char limit is:' + CHAR_LIMIT);
				return prev;
			}
			if (prev.length + text.length > CHAR_LIMIT) {
				return prev + text.slice(0, CHAR_LIMIT - prev.length);
			}
			return prev.concat(text.slice(0, 20));
		});
	}

	function handleInput({ key }) {
		const removeKey = 'Backspace';

		if (key.length > 1 && key !== removeKey) return;
		setCharacter(prev => {
			if (key === removeKey) return prev.slice(0, prev.length - 1);
			if (prev.length >= CHAR_LIMIT) {
				window.alert('Char limit is:' + CHAR_LIMIT);
				return prev;
			}
			return prev.concat(key);
		});
	}

	useEffect(() => {
		const fieldElement = document.getElementById(id);

		fieldElement.addEventListener('keydown', handleInput);
		return () => fieldElement.removeEventListener('keydown', handleInput);
	}, []);

	useEffect(() => {
		const fieldElement = document.getElementById(id);
		fieldElement.textContent = value;
	}, [value]);

	return (
		<div className='custom_input' id={focus === id ? 'custom_input_focus' : ''}>
			<p onClick={() => setFocus(id)}>{title}</p>
			<button
				ref={fieldRef}
				className='custom_input_field'
				id={id}
				onClick={() => setFocus(id)}
				onFocus={() => setFocus(id)}></button>
			{paste === true ? (
				<div id='custom_input_paste_btn'>
					<ButtonCustom onClickFn={pasteHandle} size={10}>
						{language === 'en' ? `paste` : `Впхнути`}
					</ButtonCustom>
				</div>
			) : (
				false
			)}
			<InputCarret />
		</div>
	);

	function InputCarret() {
		const offsetY = `calc(-50% + 11px)`;
		const offsetX = `calc(${value.length * 13.2}px + 10px)`;
		const CARET_STYLE = {
			transform: `translateY(${offsetY}) translateX(${offsetX})`,
		};

		return <div style={CARET_STYLE} id={focus === id ? 'custom_input_caret' : ''}></div>;
	}
}

CustomInput.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	setCharacter: PropTypes.func.isRequired,
	focus: PropTypes.string.isRequired,
	setFocus: PropTypes.func.isRequired,
	paste: PropTypes.bool,
};

CustomInput.defaultProps = {
	title: '',
	setCharacter: () => {
		window.alert('setChar fn is not defined');
	},
	setFocus: () => {
		window.alert('setFocus fn is not defined');
	},
	paste: false,
};

export default CustomInput;
