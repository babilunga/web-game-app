/* eslint-disable react-hooks/exhaustive-deps */
import './button-custom.css';
import PropTypes from 'prop-types';
import React, { useRef, useLayoutEffect } from 'react';

function CustomButton({ onClickFn, children, size, style }) {
	const btnWrapRef = useRef(null);
	const hoveroffset = `${size / 3 + size / 16}px`;
	const offset = `${size / 3}px`;

	function setOffset(offset) {
		btnWrapRef.current.style.setProperty('--y-offset', `-${offset}`);
		btnWrapRef.current.style.setProperty('--x-offset', offset);
	}

	useLayoutEffect(() => {
		setOffset(offset);
	}, [offset]);

	const BTN_WRAP_STYLE = {
		fontSize: size + 'px',
		...style,
	};

	const BTN_STYLE = {
		padding: '0.3em 1.5em',
		...BTN_WRAP_STYLE,
	};
	const BTN_BACK_STYLE = BTN_STYLE;

	return (
		<div ref={btnWrapRef} className='button_custom' style={BTN_WRAP_STYLE}>
			<button
				style={BTN_STYLE}
				onClick={onClickFn}
				onFocus={() => setOffset(hoveroffset)}
				onBlur={() => setOffset(offset)}
				onMouseEnter={() => setOffset(hoveroffset)}
				onMouseLeave={() => setOffset(offset)}>
				{children}
			</button>
			<div className='button_custom_back' style={BTN_BACK_STYLE}>
				{children}
			</div>
		</div>
	);
}

CustomButton.propTypes = {
	onClickFn: PropTypes.func.isRequired,
	size: PropTypes.number,
	style: PropTypes.object,
};

CustomButton.defaultProps = {
	size: 14,
	title: '',
	style: {},
};

export default React.memo(CustomButton);
