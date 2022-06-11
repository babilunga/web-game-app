import './dropdown.scss';
import { useState, useRef, useEffect } from 'react';

function Dropdown(props) {
	const { children, classes, title, columns } = props;

	const menuRef = useRef(null);
	const dropdownRef = useRef(null);
	const [isOpened, setIsOpened] = useState(false);

	useEffect(() => {
		dropdownRef.current.style.setProperty('--dropdown-columns', String(columns || 4));
	}, [columns]);

	function triggerDropdown(event) {
		setIsOpened(prev => {
			if (prev) {
				if (event.type === 'click' && event.target.localName !== 'button') return prev;
				menuRef.current.addEventListener(
					'animationend',
					() => (menuRef.current.style.display = 'none'),
					{ once: true }
				);
			} else {
				if (event.type === 'blur') return prev;
				menuRef.current.style.display = 'grid';
			}
			return !prev;
		});
	}

	return (
		<button
			className={`material-symbols-rounded dropdown ${classes}`}
			ref={dropdownRef}
			onClick={triggerDropdown}
			onBlur={triggerDropdown}>
			{title}
			<div ref={menuRef} className='dropdown-menu' data-opened={isOpened}>
				{children}
			</div>
		</button>
	);
}

export default Dropdown;
