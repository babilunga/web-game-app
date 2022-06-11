import { useEffect, useRef, useState } from 'react';
import { useDrawLogic } from '../../hooks/useDrawLogic';
import Dropdown from '../UI/Dropdown/Dropdown';

function DrawZone() {
	const colors = [
		'#8B572A',
		'#FF6900',
		'#FFB74D',
		'#F8E71C',
		'#C0A421',
		'#E9CDA9',
		'#79D27D',
		'#00A707',
		'#8ED1FC',
		'#1350E9',
		'#9900EF',
		'#BF406B',
		'#E91F1F',
		'#F78DA7',
		'#000000',
		'#4A4A4A',
		'#9B9B9B',
		'#FFFFFF',
	];
	const thicknessLevels = [5, 10, 15, 20, 30];

	const canvas = useRef(null);
	const context = useRef(null);

	// Brush settings
	const [color, setColor] = useState('#000000');
	const [thickness, setThickness] = useState(5);
	const [drawStart, drawStop, draw, undo, redo, clear, setUpEraser] = useDrawLogic(
		canvas,
		context,
		color,
		setColor,
		thickness,
		setThickness
	);

	// Brush utils
	function changeBrushColor(color) {
		setColor(color);
	}
	function changeBrushThickness(level) {
		setThickness(level);
	}

	// Canvas
	function setupCanvas() {
		canvas.current.width = document.querySelector('.canvas-wrap').offsetWidth;
		canvas.current.height = document.querySelector('.canvas-wrap').offsetHeight;
		canvas.current.style.width = document.querySelector('.canvas-wrap').offsetWidth;
		canvas.current.style.height = document.querySelector('.canvas-wrap').offsetHeight;

		const ctx = canvas.current.getContext('2d');
		ctx.scale(1, 1);
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = '5';
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
		context.current = ctx;
	}

	useEffect(() => {
		setupCanvas();
	}, []);
	return (
		<div className='draw-zone'>
			<div className='panel'>
				<div className='controls'>
					<button className='material-symbols-rounded' onClick={undo}>
						undo
					</button>
					<button className='material-symbols-rounded' onClick={redo}>
						redo
					</button>
					<button className='material-symbols-rounded' onClick={clear}>
						restart_alt
					</button>
					<button className='material-symbols-rounded' onClick={setUpEraser}>
						cleaning_services
					</button>
					<Dropdown title={'draw'} columns={1}>
						<form className='thickness-panel'>
							{thicknessLevels.map((level, index) => (
								<div key={index} onClick={() => changeBrushThickness(level)}>
									<label htmlFor={`thickness_${level}`}></label>
									<input id={`thickness_${level}`} type='radio' name='thickness' />
								</div>
							))}
						</form>
					</Dropdown>
					<Dropdown title={'palette'} columns={6}>
						{colors.map((curentColor, index) => (
							<div
								key={index}
								className='palette-color'
								onClick={() => changeBrushColor(curentColor)}
								style={{
									backgroundColor: curentColor,
									boxShadow: `0 0 0 3px ${curentColor}, 0 0 0 6px black`,
								}}></div>
						))}
					</Dropdown>
					<span style={{ backgroundColor: color }}></span>
				</div>
			</div>
			<div className='canvas-wrap'>
				<canvas
					ref={canvas}
					onMouseDown={drawStart}
					onMouseLeave={drawStop}
					onMouseUp={drawStop}
					onMouseMove={draw}
				/>
			</div>
		</div>
	);
}

export default DrawZone;
